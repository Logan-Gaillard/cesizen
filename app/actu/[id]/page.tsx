"use client";

import Flex from "@/app/components/utils/Flex";
import Title from "@/app/components/utils/Title";
import { Avatar, Chip, Divider, Image } from "@heroui/react";
import * as React from "react";

interface IAuthor {
	id: string;
	name: string;
	role: string;
}

interface IActu {
	id: string;
	title: string;
	category: string;
	readTime: string;
	description: string;
	content: string;
	createdAt: string;
	imageUrl: string;
	authorId: string;
}

const ActuId = ({ params }: { params: Promise<{ id: string }> }) => {
	const users: Record<string, IAuthor> = {
		"1": {
			id: "1",
			name: "Alice Dupont",
			role: "admin",
		},
		"2": {
			id: "2",
			name: "Dr. Marc Levy",
			role: "user",
		},
	};

	const infos: Record<string, IActu> = {
		"1": {
			id: "1",
			title: "Gérer son stress en période d'examens",
			category: "Bien-être",
			readTime: "5 min",
			description:
				"Découvrez nos techniques de respiration et d'organisation pour aborder vos partiels avec sérénité et efficacité.",
			content:
				"La période des examens est souvent synonyme de stress intense pour les étudiants. Entre la pression des résultats, la charge de travail et la peur de l'échec, il est facile de se sentir submergé.\n\nCependant, le stress n'est pas une fatalité. Il existe des méthodes éprouvées pour le canaliser et le transformer en énergie positive. Tout d'abord, la respiration. Des exercices simples de cohérence cardiaque peuvent faire baisser votre taux de cortisol en quelques minutes.\n\nEnsuite, l'organisation. Un planning de révision réaliste, incluant des pauses régulières, permet de garder le contrôle et d'éviter la procrastination. N'oubliez pas que votre cerveau a besoin de repos pour assimiler les informations.",
			createdAt: "2024-06-15T10:00:00Z",
			imageUrl: "https://picsum.photos/800/600?random=1",
			authorId: "1",
		},
		"2": {
			id: "2",
			title: "L'importance du sommeil",
			category: "Santé",
			readTime: "4 min",
			description:
				"Un bon cycle de sommeil est la clé de la réussite académique. Apprenez à réguler votre horloge biologique.",
			content:
				"Le sommeil n'est pas une perte de temps, c'est un investissement pour votre cerveau. Durant la nuit, votre mémoire se consolide et votre corps se régénère.\n\nPour optimiser votre sommeil, essayez de vous coucher et de vous lever à des heures régulières, même le week-end. Évitez les écrans au moins une heure avant de dormir, car la lumière bleue perturbe la production de mélatonine.",
			createdAt: "2024-06-10T08:30:00Z",
			imageUrl: "https://picsum.photos/800/600?random=2",
			authorId: "2",
		},
		"3": {
			id: "3",
			title: "Alimentation et concentration",
			category: "Nutrition",
			readTime: "6 min",
			description:
				"Quels aliments privilégier	pour booster votre mémoire ? Notre nutritionniste vous répond dans cet article détaillé.",
			content:
				"Votre cerveau est un grand consommateur d'énergie. Pour fonctionner à plein régime, il a besoin de nutriments spécifiques. Les oméga-3, présents dans les poissons gras et les noix, sont essentiels pour la mémoire.\n\nLes sucres lents (pâtes complètes, riz, légumineuses) fournissent une énergie durable et évitent les coups de fatigue. N'oubliez pas de bien vous hydrater : une légère déshydratation peut entraîner une baisse significative de la concentration.",
			createdAt: "2024-06-01T12:00:00Z",
			imageUrl: "https://picsum.photos/800/600?random=3",
			authorId: "2",
		},
	};

	const { id }: { id: string } = React.use(params);
	const currentActu = infos[id];

	if (!currentActu) {
		return <div>Article non trouvé</div>;
	}

	const author = users[currentActu.authorId];

	return (
		<Flex direction="column" gap="1rem" className="max-w-5xl mx-auto w-full">
			{/* Header Section */}
			<Flex direction="column" className="gap-4 mb-4">
				<Flex alignItems="center" gap="0.5rem">
					<Chip
						color="primary"
						variant="flat"
						size="sm"
						className="uppercase font-bold tracking-wider"
					>
						{currentActu.category}
					</Chip>
					<span className="text-gray-400 text-sm">•</span>
					<span className="text-gray-500 text-sm font-medium">
						{currentActu.readTime} de lecture
					</span>
				</Flex>
			</Flex>

			{/* Author & Meta */}
			<Flex
				alignItems="center"
				justifyContent="space-between"
				className="border-b border-gray-200 pb-6 mb-8"
			>
				<Title
					size="lg"
					className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight"
				>
					{currentActu.title}
				</Title>
				<div className="text-right hidden sm:block">
					<p className="text-xs text-gray-500 uppercase tracking-wide">
						Publié le
					</p>
					<p className="text-sm font-medium text-gray-900">
						{new Date(currentActu.createdAt).toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</p>
				</div>
			</Flex>

			{/* Main Content Layout */}
			<div className="flex flex-col lg:flex-row gap-12">
				{/* Article Body */}
				<div className="flex-1 space-y-8">
					<p className="text-xl text-gray-600 font-serif leading-relaxed border-l-4 border-primary pl-4 italic">
						{currentActu.description}
					</p>

					<div className="prose prose-lg max-w-none text-gray-800">
						{currentActu.content.split("\n\n").map((paragraph, idx) => (
							<p
								key={`${currentActu.id}-paragraph-${idx}`}
								className="mb-6 leading-relaxed"
							>
								{paragraph}
							</p>
						))}
					</div>
				</div>

				{/* Sidebar / Visuals */}
				<Flex direction="column" className="w-full lg:w-1/3 gap-6">
					<div className="sticky top-24 space-y-4">
						<Image
							alt={currentActu.title}
							className="w-full aspect-4/3 object-cover"
							radius="lg"
							shadow="sm"
							src={currentActu.imageUrl}
							width="100%"
						/>
						<p className="text-xs text-center text-gray-400 italic">
							Illustration : {currentActu.title}
						</p>

						<Divider className="my-4" />

						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-sm font-semibold text-gray-700 mb-2">
								À propos
							</p>
							<p className="text-xs text-gray-600">
								Cet article a été rédigé par {author?.name}
								{author?.role === "admin" && " (Administrateur)"}
							</p>
							<p className="text-xs text-gray-600">
								Publié le
								{new Date(currentActu.createdAt).toLocaleDateString("fr-FR", {
									day: "numeric",
									month: "long",
									year: "numeric",
								})}
							</p>
						</div>
					</div>
				</Flex>
			</div>
		</Flex>
	);
};

export default ActuId;
