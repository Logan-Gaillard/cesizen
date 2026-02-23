"use client";
import useIsMobile from "@/context/useIsMobile";
import Flex from "../components/utils/Flex";
import Title from "../components/utils/Title";
import InfoCard from "../components/Infos/InfoCard";
import { useRouter } from "next/navigation";

const Actu = () => {
	const router = useRouter();
	const isMobile = useIsMobile();
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
		<Flex
			direction="column"
			gap
			justifyContent="center"
			alignItems="baseline"
			className="max-w-6xl mx-auto w-full"
		>
			<Title size="lg">Actualités & Conseils</Title>
			<p className="text-lg text-gray-600">
				Voici les dernières actualités et conseils pour vous aider à mieux gérer
				votre santé mentale pendant vos études.
			</p>

			<Flex
				flexWrap="wrap"
				gap="24px"
				justifyContent="center"
				alignItems="stretch"
				fullWidth
			>
				{infos.map((info) => (
					<InfoCard
						key={info.id}
						{...info}
						onPress={() => router.push(`/actu/${info.id}`)}
					/>
				))}
			</Flex>
		</Flex>
	);
};

export default Actu;
