"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import UserDropdown from "./NavBar/UserDropdown";

const NavContainer = styled.nav`
    width: 100%;
    height: 80px;
    background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: sticky;
    top: 0;
    z-index: 50;
`;

const Logo = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: white;
    letter-spacing: 2px;
    cursor: pointer;
    transition: transform 0.3s ease, text-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
`;

const NavLinks = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

const NavButton = styled(Button)`
    background-color: transparent !important;
    color: white;
    font-weight: 600;
    position: relative;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;

    &:hover {
        background-color: var(--color-primary-700) !important;
        border-bottom: 2px solid var(--color-primary-600) ;
    }
`;

const LoginButton = styled(Button)`
    background-color: white !important;
    color: var(--color-primary-500);
    font-weight: bold;
    padding: 0 24px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--color-primary-100) !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
    }
`;

const NavBar = () => {
	const router = useRouter();
	const user = useAuth();

	return (
		<NavContainer>
			<Logo>CESIZEN</Logo>

			<NavLinks>
				<NavButton variant="light" onPress={() => router.push("/")}>
					Accueil
				</NavButton>
				<NavButton variant="light" onPress={() => router.push("/exercices")}>
					Exercices
				</NavButton>

				{user.data && (
					<>
						<NavButton
							variant="light"
							onPress={() => router.push("/dashboard")}
						>
							Dashboard
						</NavButton>
						<UserDropdown />
					</>
				)}

				{!user.data && (
					<LoginButton variant="flat" onPress={() => router.push("/login")}>
						Se connecter
					</LoginButton>
				)}
			</NavLinks>
		</NavContainer>
	);
};

export default NavBar;
