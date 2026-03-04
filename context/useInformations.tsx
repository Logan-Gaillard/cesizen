"use client";

import { getAllActus } from "@/actions/information";
import { useEffect, useState } from "react";
import useAdminUsers from "./useAdminUsers";

export interface IActu {
	id: string;
	title: string;
	category: string;
	readTime?: string;
	description: string;
	content: string;
	imageURL: string;
	authorId: string;
	author?: string;
	createdAt: string;
	updatedAt: string;
}

const useInformations = (): Record<string, IActu> => {
	const users = useAdminUsers();
	const [informations, setInformations] = useState<Record<string, IActu>>({});

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const fetchInformations = async (): Promise<void> => {
			try {
				const actus = await getAllActus();
				const informationsMap: Record<string, IActu> = {};
				actus.forEach((actu) => {
					actu.author = users[actu.authorId]?.nickname || "Inconnu";
					informationsMap[actu.id] = actu;
				});
				setInformations(informationsMap);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des informations :",
					error,
				);
			}
		};

		fetchInformations();
	}, [users]);

	return informations;
};

export default useInformations;
