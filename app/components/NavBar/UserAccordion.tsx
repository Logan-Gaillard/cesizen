"use client";

import { logoutUser } from "@/actions/user";
import { useAuth } from "@/context/AuthContext";
import { Logout, Person } from "@mui/icons-material";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import useIsAdmin from "@/context/useIsAdmin";

const StyledAccordion = styled(Accordion)`
	width: 100%;
`;

const ItemContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 4px 0;
`;

const ActionButton = styled.button`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px 12px;
	background: transparent;
	border: 0;
	color: var(--color-primary-700);
	font-weight: 600;
	cursor: pointer;
	text-align: left;

	&:hover {
		background: var(--color-primary-50);
	}
`;

const MobileButton = styled(Button)`
    width: fit-content;
    justify-content: flex-start !important;
    background-color: transparent !important;
    font-weight: 600;
`;

const UserAccordion = () => {
	const isAdmin = useIsAdmin();
	const user = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await logoutUser();
		await user.refreshAuth();
		router.push("/");
	};

	return (
		<StyledAccordion isCompact>
			<AccordionItem
				classNames={{
					title: "text-primary-700 font-semibold ml-2 text-sm",
				}}
				aria-label={user.data?.nickname || "User"}
				title={user.data?.nickname || "User"}
			>
				<ItemContent>
					<MobileButton
						variant="light"
						className={"text-primary-700"}
						type="button"
					>
						<Person fontSize="small" />
						Profile
					</MobileButton>
					{isAdmin && (
						<MobileButton
							variant="light"
							className={"text-primary-700"}
							type="button"
						>
							<Person fontSize="small" />
							Espace administrateur
						</MobileButton>
					)}
					<MobileButton
						variant="light"
						color="danger"
						type="button"
						onClick={handleLogout}
					>
						<Logout fontSize="small" />
						Se deconnecter
					</MobileButton>
				</ItemContent>
			</AccordionItem>
		</StyledAccordion>
	);
};

export default UserAccordion;
