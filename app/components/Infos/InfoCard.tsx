"use client";

import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { CalendarToday, Route } from "@mui/icons-material";
import Flex from "../utils/Flex";
import useIsMobile from "@/context/useIsMobile";
import Router from "next/router";

interface InfoCardProps {
	title: string;
	description: string;
	createdAt: string;
	imageUrl: string;
	isRead?: boolean;
	onPress?: () => void;
}

const InfoCard = ({
	title,
	description,
	createdAt,
	imageUrl,
	onPress,
}: InfoCardProps) => {
	const isMobile = useIsMobile();
	return (
		<Card
			isPressable
			isHoverable
			shadow="md"
			className={`w-fit p-4 cursor-pointer ${isMobile ? "w-full" : "max-w-lg"}`}
			onPress={onPress}
		>
			<CardHeader className="w-full justify-center items-center">
				<Image
					alt={title}
					className="w-full aspect-video object-cover"
					radius="lg"
					src={imageUrl}
					width="100%"
				/>
			</CardHeader>
			<CardBody className="flex gap-2">
				<Flex
					gap="8px"
					alignItems="center"
					className="text-sm uppercase font-bold tracking-wider"
				>
					<CalendarToday style={{ fontSize: 14 }} />
					{new Date(createdAt).toLocaleDateString("fr-FR", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</Flex>
				<h3
					className="text-2xl font-bold text-primary-800 line-clamp-1"
					title={title}
				>
					{title}
				</h3>
				<p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
					{description}
				</p>
			</CardBody>
		</Card>
	);
};

export default InfoCard;
