"use client";

import Flex from "./components/utils/Flex";

export default function Home() {
	return (
		<Flex direction="column" gap justifyContent="center" alignItems="center">
			<h1 className="text-4xl font-bold">Accueil</h1>
			<p className="text-lg text-gray-600">
				Bienvenue sur Cesizen, votre compagnon pour une meilleure santé mentale.
			</p>
		</Flex>
	);
}
