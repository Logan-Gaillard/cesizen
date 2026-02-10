"use client";

import Flex from "../components/utils/Flex";

const Exercices = () => {
	return (
		<Flex direction="column" gap justifyContent="center" alignItems="center">
			<h1 className="text-4xl font-bold">Exercices</h1>
			<p className="text-lg text-gray-600">
				Découvrez nos exercices pour améliorer votre santé mentale.
			</p>
		</Flex>
	);
};

export default Exercices;
