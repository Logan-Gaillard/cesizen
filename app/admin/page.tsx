"use client";

import Flex from "@/app/components/utils/Flex";
import Title from "@/app/components/utils/Title";
import {
	Button,
	Chip,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tabs,
	useDisclosure,
} from "@heroui/react";
import { Add, Delete, Edit, Search, Visibility } from "@mui/icons-material";
import React, { useCallback, useState } from "react";
import { Exercise } from "../exercices/page";
import { IActu } from "../actu/[id]/page";

// --- Mock Data ---
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

const exercises: Record<string, Exercise> = {
	"1": {
		id: 1,
		title: "Cohérence Cardiaque",
		description:
			"Idéal pour réduire le stress. Inspirez sur 5 secondes, expirez sur 5 secondes.",
		phases: [
			{ name: "Inspiration", duration: 5, mode: "inspiration" },
			{ name: "Expiration", duration: 5, mode: "expiration" },
		],
	},
	"2": {
		id: 2,
		title: "Respiration 4-7-8",
		description:
			"Favorise l'endormissement. Inspirez (4s), retenez (7s), expirez (8s).",
		phases: [
			{ name: "Inspiration", duration: 4, mode: "inspiration" },
			{ name: "Rétention", duration: 7, mode: "tenir" },
			{ name: "Expiration", duration: 8, mode: "expiration" },
		],
	},
	"3": {
		id: 3,
		title: "Respiration Carrée",
		description:
			"Booste la concentration. 4 temps égaux pour chaque phase du cycle.",
		phases: [
			{ name: "Inspiration", duration: 4, mode: "inspiration" },
			{ name: "Rétention (plein)", duration: 4, mode: "tenir" },
			{ name: "Expiration", duration: 4, mode: "expiration" },
			{ name: "Rétention (vide)", duration: 4, mode: "tenir" },
		],
	},
};

const initialMembers: Record<string, any> = {
	"1": {
		id: 1,
		nickname: "Alice Dupont",
		role: "admin",
		email: "alice.dupont@cesi.fr",
	},
	"2": {
		id: 2,
		nickname: "Jean Martin",
		role: "user",
		email: "jean.martin@viacesi.fr",
	},
	"3": {
		id: 3,
		nickname: "Sophie Bernard",
		role: "user",
		email: "sophie.bernard@external.fr",
	},
};

const Admin = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [currentTab, setCurrentTab] = useState<string>("actus");
	const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
		null,
	);

	return (
		<Flex direction="column" gap className="max-w-6xl mx-auto w-full">
			<Flex justifyContent="space-between" alignItems="center">
				<Title size="lg">Administration</Title>
			</Flex>

			<Tabs
				aria-label="Options"
				color="primary"
				variant="underlined"
				classNames={{
					tabList:
						"gap-6 w-full relative rounded-none p-0 border-b border-divider",
					cursor: "w-full bg-primary",
					tab: "max-w-fit px-0 h-12",
					tabContent: "group-data-[selected=true]:text-primary font-semibold",
				}}
				selectedKey={currentTab}
				onSelectionChange={(key) => setCurrentTab(key as string)}
			>
				{/* --- Onglet Actualités --- */}
				<Tab
					key="actus"
					title={
						<div className="flex items-center space-x-2">
							<span>Actualités</span>
							<Chip size="sm" variant="faded">
								{Object.keys(infos).length}
							</Chip>
						</div>
					}
				>
					<Flex direction="column" gap="1rem" className="mt-4">
						<Flex justifyContent="flex-end" alignItems="center">
							<Button
								color="primary"
								endContent={<Add />}
								//onPress={() => handleOpenModal("add")}
							>
								Ajouter une actualité
							</Button>
						</Flex>
						<Table aria-label="Tableau des actualités">
							<TableHeader>
								<TableColumn key="title">TITRE</TableColumn>
								<TableColumn key="category">CATÉGORIE</TableColumn>
								<TableColumn key="author">AUTEUR</TableColumn>
							</TableHeader>
							<TableBody items={Object.values(infos)}>
								{(item) => (
									<TableRow key={item.id}>
										<TableCell>{item.title}</TableCell>
										<TableCell>{item.category}</TableCell>
										<TableCell>{"Inconnu"}</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</Flex>
				</Tab>

				{/* --- Onglet Exercices --- */}
				<Tab
					key="exos"
					title={
						<div className="flex items-center space-x-2">
							<span>Exercices</span>
							<Chip size="sm" variant="faded">
								{Object.keys(exercises).length}
							</Chip>
						</div>
					}
				>
					<Flex direction="column" gap="1rem" className="mt-4">
						<Flex justifyContent="flex-end" alignItems="center">
							<Button
								color="primary"
								endContent={<Add />}
								//onPress={() => handleOpenModal("add")}
							>
								Ajouter un exercice
							</Button>
						</Flex>
					</Flex>
				</Tab>

				{/* --- Onglet Membres --- */}
				<Tab
					key="members"
					title={
						<div className="flex items-center space-x-2">
							<span>Membres</span>
							<Chip size="sm" variant="faded">
								{Object.keys(initialMembers).length}
							</Chip>
						</div>
					}
				>
					<Flex direction="column" gap="1rem" className="mt-4">
						<Flex justifyContent="flex-end" alignItems="center">
							<Button
								color="primary"
								endContent={<Add />}
								//onPress={() => handleOpenModal("add")}
							>
								Ajouter un membre
							</Button>
						</Flex>
					</Flex>
				</Tab>
			</Tabs>

			{/* --- Modal Global --- */}
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								{modalType === "add"
									? "Ajouter"
									: modalType === "edit"
										? "Modifier"
										: "Supprimer"}{" "}
								{currentTab === "actus"
									? "une actualité"
									: currentTab === "exos"
										? "un exercice"
										: "un membre"}
							</ModalHeader>
							<ModalBody>{/* {renderModalContent()} */}</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="flat" onPress={onClose}>
									Annuler
								</Button>
								<Button
									color={modalType === "delete" ? "danger" : "primary"}
									onPress={onClose}
								>
									{modalType === "delete" ? "Confirmer" : "Enregistrer"}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default Admin;
