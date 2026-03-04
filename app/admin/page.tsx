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
	Tabs,
	useDisclosure,
} from "@heroui/react";
import { Add, Delete, Edit, Search, Visibility } from "@mui/icons-material";
import React, { useCallback, useState } from "react";
import { IExercise } from "../exercices/page";
import useInformations from "@/context/useInformations";
import useAdminUsers from "@/context/useAdminUsers";
import TableAdmin from "./TableAdmin";
import { UserModalAdd, UserModalDelete, UserModalEdit } from "./userModal";

const exercises: Record<string, IExercise> = {
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

const Admin = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [currentTab, setCurrentTab] = useState<string>("actus");
	const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(
		null,
	);
	const [selectedItem, setSelectedItem] = useState<any>(null);

	const users = useAdminUsers();
	const { users, refreshUsers } = useAdminUsers();
	const infos = useInformations();

	console.log("infos:", infos);
	const handleOpenModal = (
		type: "add" | "edit" | "delete",
		item: any = null,
	) => {
		setModalType(type);
		setSelectedItem(item);
		onOpen();
	};

	const renderModalContent = (onClose: () => void) => {
		if (currentTab === "members") {
			if (modalType === "add")
				return <UserModalAdd onClose={onClose} refresh={refreshUsers} />;
			if (modalType === "edit")
				return (
					<UserModalEdit
						onClose={onClose}
						refresh={refreshUsers}
						user={selectedItem}
					/>
				);
			if (modalType === "delete")
				return (
					<UserModalDelete
						onClose={onClose}
						refresh={refreshUsers}
						user={selectedItem}
					/>
				);
		}
		return (
			<>
				<ModalBody>
					<p>Fonctionnalité à venir pour {currentTab}</p>
				</ModalBody>
				<ModalFooter>
					<Button onPress={onClose}>Fermer</Button>
				</ModalFooter>
			</>
		);
	};

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
				{/* --- Onglet Membres --- */}
				<Tab
					key="members"
					title={
						<div className="flex items-center space-x-2">
							<span>Membres</span>
							<Chip size="sm" variant="faded">
								{Object.keys(users).length}
							</Chip>
						</div>
					}
				>
					<Flex direction="column" gap="1rem" className="mt-4" fullWidth>
						<Flex justifyContent="flex-end" alignItems="center">
							<Button
								color="primary"
								endContent={<Add />}
								//onPress={() => handleOpenModal("add")}
								onPress={() => handleOpenModal("add")}
							>
								Ajouter un membre
							</Button>
						</Flex>
						<TableAdmin data={users} type="users" />
						<TableAdmin
							data={users}
							type="users"
							onEdit={(item) => handleOpenModal("edit", item)}
							onDelete={(item) => handleOpenModal("delete", item)}
						/>
					</Flex>
				</Tab>

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
					<Flex fullWidth direction="column" gap="1rem" className="mt-4">
						<Flex justifyContent="flex-end" alignItems="center">
							<Button
								color="primary"
								endContent={<Add />}
								//onPress={() => handleOpenModal("add")}
							>
								Ajouter une actualité
							</Button>
						</Flex>
						<TableAdmin data={infos} type="infos" />
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
						<TableAdmin data={exercises} type="exos" />
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
							{renderModalContent(onClose)}
						</>
					)}
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export default Admin;
