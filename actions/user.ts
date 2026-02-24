"use server";

import argon2 from "argon2";

import prisma from "@/libs/db";
import { cookies } from "next/headers";
import { getSessionUser } from "@/libs/user.service";

type CreateUserData = {
	nickname: string;
	email: string;
	password: string;
};

export async function registerUser(data: CreateUserData) {
	const hash = await argon2.hash(data.password, {
		type: argon2.argon2id,
	});

	const user = await prisma.user.create({
		data: {
			nickname: data.nickname,
			email: data.email,
			pwdHash: hash,
			role: "user",
		},
	});

	if (!user) {
		return {
			success: false,
			message: "Erreur lors de la création de l'utilisateur",
		};
	}
	return { success: true, user };
}

export async function loginUser(
	email: string,
	password: string,
	rememberMe: boolean,
) {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user)
		return { success: false, message: "Email ou mot de passe invalide" };

	const isValid = await argon2.verify(user.pwdHash, password);
	if (!isValid)
		return { success: false, message: "Email ou mot de passe invalide" };

	const session = await prisma.session.create({
		data: {
			token: crypto.randomUUID().toString(),
			userId: user.id,
		},
	});

	const maxAge = rememberMe ? 60 * 60 * 24 * 30 : undefined;

	const cookieStore = await cookies();

	cookieStore.set({
		name: "cesi-session",
		value: session.token,
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		sameSite: "lax",
		maxAge,
	});

	return { success: true };
}

export async function logoutUser() {
	const cookieStore = await cookies();
	const token = cookieStore.get("cesi-session")?.value;
	if (token) {
		await prisma.session.deleteMany({ where: { token } });
		cookieStore.delete("cesi-session");
	}
}

export async function fetchCurrentUser() {
	try {
		const user = await getSessionUser();
		if (!user) return null;

		// On ne renvoie que ce qui est nécessaire (pas le mot de passe !)
		return { nickname: user.nickname };
	} catch (e) {
		return null;
	}
}
