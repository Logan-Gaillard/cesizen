"use server";

import prisma from "@/libs/db";
import { getSessionUser } from "@/libs/user.service";

interface IActu {
	id: string;
	title: string;
	category: string;
	readTime: string;
	description: string;
	content: string;
	imageURL: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
}

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

export async function getAllActus() {
	return await prisma.information.findMany({
		orderBy: { createdAt: "desc" },
		select: {
			id: true,
			title: true,
			category: true,
			readTime: true,
			description: true,
			imageURL: true,
			createdAt: true,
		},
	});
}

export async function getActuById(id: string) {
	return await prisma.information.findUnique({
		where: { id },
	});
}

export async function deleteActu(id: string) {
	await prisma.information.delete({ where: { id } });
}
