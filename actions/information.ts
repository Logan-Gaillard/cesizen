"use server";

import { IActu } from "@/context/useInformations";
import prisma from "@/libs/db";
import { getSessionUser } from "@/libs/user.service";

function calculateReadTime(content: string): string {
	const wordsPerMinute = 200; // Vitesse de lecture moyenne
	const words = content.trim().split(/\s+/).length; // Nombre de mots
	const minutes = Math.ceil(words / wordsPerMinute); // Temps de lecture en minutes
	return `${minutes} min`;
}

export async function createActu({
	title,
	description,
	content,
	category,
	imageURL,
}: IActu) {
	const user = await getSessionUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const authorId = user.id;
	const readTime = calculateReadTime(content || "");

	const newActu = await prisma.information.create({
		data: {
			title,
			description,
			content,
			category,
			imageURL,
			readTime,
			user: {
				connect: {
					id: authorId,
				},
			},
		},
	});

	console.log("Nouvelle actu créée :", newActu);
}

export async function getAllActus(): Promise<IActu[]> {
	const actus = await prisma.information.findMany({
		orderBy: { createdAt: "desc" },
	});

	return actus.map((actu) => ({
		id: actu.id,
		title: actu.title,
		category: actu.category,
		readTime: actu.readTime,
		description: actu.description,
		content: actu.content,
		imageURL: actu.imageURL,
		authorId: actu.userId,
		createdAt: actu.createdAt.toISOString(),
		updatedAt: actu.updatedAt.toISOString(),
	}));
}

export async function getActuById(id: string) {
	return await prisma.information.findUnique({
		where: { id },
	});
}

export async function deleteActu(id: string) {
	await prisma.information.delete({ where: { id } });
}
