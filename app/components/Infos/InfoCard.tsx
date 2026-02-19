"use client";

import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { CalendarToday } from "@mui/icons-material";
import Flex from "../utils/Flex";
import useIsMobile from "@/context/useIsMobile";

interface InfoCardProps {
	title: string;
	description: string;
	createdAt: string;
	imageUrl: string;
	isRead?: boolean;
}

const InfoCard = ({
	title,
	description,
	createdAt,
	imageUrl,
}: InfoCardProps) => {
	const isMobile = useIsMobile();
	return (
		<Card
			isPressable
			isHoverable
			shadow="md"
			className={`w-fit p-4 cursor-pointer ${isMobile ? "w-full" : "max-w-lg"}`}
			onPress={() => console.log("item pressed")}
		>
			<CardHeader>
				<Image
					alt={title}
					className="aspect-video"
					radius="lg"
					src={imageUrl}
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
