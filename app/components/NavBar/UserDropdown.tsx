"use client";

import { logoutUser } from "@/actions/user";
import { useAuth } from "@/context/AuthContext";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	User,
} from "@heroui/react";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
	const user = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await logoutUser();
		await user.refreshAuth();
		router.push("/");
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<User
					as="button"
					className="cursor-pointer transition-all duration-200 text-white font-semibold px-3 py-2 rounded-lg hover:bg-primary-600 hover:scale-105 active:scale-95"
					name={user.data?.nickname || "User"}
					avatarProps={{
						className:
							"bg-gradient-to-br from-secondary-500 to-secondary-700 text-white",
						name: user.data?.nickname || "User",
					}}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="User Actions" variant="flat">
				<DropdownItem key="profile" color="primary">
					Profile
				</DropdownItem>
				<DropdownItem key="logout" color="danger" onPress={handleLogout}>
					Se déconnecter
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default UserDropdown;
