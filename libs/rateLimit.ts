import prisma from "@/libs/db";

export type RateLimitConfig = {
	maxAttempts: number;
	windowMs: number; // en millisecondes
};

const DEFAULT_CONFIGS: Record<string, RateLimitConfig> = {
	login: {
		maxAttempts: 5,
		windowMs: 15 * 60 * 1000, // 15 minutes
	},
	register: {
		maxAttempts: 3,
		windowMs: 60 * 60 * 1000, // 1 heure
	},
};

export class RateLimitError extends Error {
	constructor(
		public retryAfterSeconds: number,
		public attemptNumber: number,
	) {
		super(
			`Rate limit exceeded. Too many attempts. Please try again in ${retryAfterSeconds} seconds.`,
		);
		this.name = "RateLimitError";
	}
}

/**
 * Vérifie et enregistre une tentative pour le rate limiting
 * @param identifier - Identifiant unique (email, IP, etc.)
 * @param action - Action (login, register, etc.)
 * @param config - Configuration optionnelle du rate limit
 * @returns Object avec les info de tentatives
 * @throws RateLimitError si limite dépassée
 */
export async function checkRateLimit(
	identifier: string,
	action: string,
	config?: RateLimitConfig,
): Promise<{ attempt: number; remainingAttempts: number }> {
	const finalConfig = config || DEFAULT_CONFIGS[action] || DEFAULT_CONFIGS.login;

	const now = new Date();
	const windowStart = new Date(now.getTime() - finalConfig.windowMs);

	// Récupérer ou créer l'enregistrement de rate limit
	let rateLimit = await prisma.rateLimitAttempt.findUnique({
		where: {
			identifier_action: {
				identifier,
				action,
			},
		},
	});

	// Si aucun enregistrement ou en dehors de la fenêtre, réinitialiser
	if (!rateLimit || rateLimit.lastAttemptAt < windowStart) {
		rateLimit = await prisma.rateLimitAttempt.upsert({
			where: {
				identifier_action: {
					identifier,
					action,
				},
			},
			update: {
				attempts: 1,
				lastAttemptAt: now,
			},
			create: {
				identifier,
				action,
				attempts: 1,
				lastAttemptAt: now,
			},
		});

		return {
			attempt: 1,
			remainingAttempts: finalConfig.maxAttempts - 1,
		};
	}

	// Vérifier si le limite est dépassée
	if (rateLimit.attempts >= finalConfig.maxAttempts) {
		const timeSinceLastAttempt = now.getTime() - rateLimit.lastAttemptAt.getTime();
		const timeUntilReset = Math.ceil(
			(finalConfig.windowMs - timeSinceLastAttempt) / 1000,
		);

		throw new RateLimitError(timeUntilReset, rateLimit.attempts + 1);
	}

	// Incrémenter le compteur
	rateLimit = await prisma.rateLimitAttempt.update({
		where: {
			identifier_action: {
				identifier,
				action,
			},
		},
		data: {
			attempts: rateLimit.attempts + 1,
			lastAttemptAt: now,
		},
	});

	return {
		attempt: rateLimit.attempts,
		remainingAttempts: finalConfig.maxAttempts - rateLimit.attempts,
	};
}

/**
 * Réinitialise le rate limit pour un identifiant (appelé après authentification réussie)
 */
export async function resetRateLimit(
	identifier: string,
	action: string,
): Promise<void> {
	await prisma.rateLimitAttempt.deleteMany({
		where: {
			identifier,
			action,
		},
	});
}

/**
 * Nettoie les anciennes tentatives de rate limit (à appeler périodiquement)
 */
export async function cleanupExpiredRateLimits(
	ageMs: number = 24 * 60 * 60 * 1000,
): Promise<void> {
	const cutoffDate = new Date(Date.now() - ageMs);

	await prisma.rateLimitAttempt.deleteMany({
		where: {
			lastAttemptAt: {
				lt: cutoffDate,
			},
		},
	});
}
