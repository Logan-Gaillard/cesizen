"use client";

import { Button } from "@heroui/react";
import InfoCard from "./components/Infos/InfoCard";
import Flex from "./components/utils/Flex";
import Title from "./components/utils/Title";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

export default function Home() {
	const infos = [
		{
			id: 1,
			title: "Gérer son stress en période d'examens",
			description:
				"Découvrez nos techniques de respiration et d'organisation pour aborder vos partiels avec sérénité et efficacité.",
			createdAt: "2024-06-15T10:00:00Z",
			imageUrl: "https://picsum.photos/1920/1080?random=1",
		},
		{
			id: 2,
			title: "L'importance du sommeil",
			description:
				"Un bon cycle de sommeil est la clé de la réussite académique. Apprenez à réguler votre horloge biologique.",
			createdAt: "2024-06-10T08:30:00Z",
			imageUrl: "https://picsum.photos/1920/1080?random=2",
		},
		{
			id: 3,
			title: "Alimentation et concentration",
			description:
				"Quels aliments privilégier	pour booster votre mémoire ? Notre nutritionniste vous répond dans cet article détaillé.",
			createdAt: "2024-06-01T12:00:00Z",
			imageUrl: "https://picsum.photos/1920/1080?random=3",
		},
	];

	return (
		<Flex direction="column" gap justifyContent="center" alignItems="baseline">
			<Title size="lg">Accueil</Title>
			<p className="text-lg text-gray-600">
				Bienvenue sur Cesizen, votre compagnon pour une meilleure santé mentale.
			</p>

			<Flex direction="column" gap="24px" fullWidth className="mt-8">
				<Flex alignContent="center" justifyContent="space-between" gap="8px">
					<Title size="md" underline>
						Actualités & Conseils
					</Title>
					<Button
						variant="light"
						color="primary"
						className="font-semibold hover:bg-primary-50 transition-colors"
						onPress={() => {}}
					>
						Voir plus
						<ArrowRight />
					</Button>
				</Flex>

				<Flex flexWrap="wrap" gap="24px" justifyContent="center" fullWidth>
					{infos.map((info) => (
						<InfoCard key={info.id} {...info} />
					))}
				</Flex>
			</Flex>
		</Flex>
	);
}
