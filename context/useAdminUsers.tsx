"use client";

import { getAllUsers } from "@/actions/user";
import { useEffect, useState } from "react";

export interface IUser {
	id: string;
	nickname: string;
	email?: string;
	role?: string;
}

const useAdminUsers = (): Record<string, IUser> => {
	const [users, setUsers] = useState<Record<string, IUser>>({});

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const fetchUsers = async (): Promise<void> => {
			try {
				const data = await getAllUsers();
				const usersMap: Record<string, IUser> = {};
				data.forEach((user) => {
					usersMap[user.id] = user;
				});
				setUsers(usersMap);
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des informations :",
					error,
				);
			}
		};

		fetchUsers();
	}, []);

	return users;
};

export default useAdminUsers;
