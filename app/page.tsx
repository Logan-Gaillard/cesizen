"use client";

import { Button } from "@heroui/react";
import InfoCard from "./components/Infos/InfoCard";
import Flex from "./components/utils/Flex";
import Title from "./components/utils/Title";
import { ArrowRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import useInformations from "@/context/useInformations";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export default function Home() {
	const router = useRouter();
	const { informations } = useInformations();

	return (
		<Flex
			direction="column"
			gap
			justifyContent="center"
			alignItems="baseline"
			className="max-w-6xl mx-auto w-full"
		>
			<Title size="lg">Accueil</Title>
			<p className="text-lg text-gray-600">
				Bienvenue sur Cesizen, votre compagnon pour une meilleure santé mentale.
			</p>

			<Flex direction="column" gap="24px" fullWidth className="mt-8">
				<Flex alignContent="center" justifyContent="space-between" gap="8px">
					<Title size="md" underline>
						Actualités & Conseils
					</Title>
					<Button
						variant="light"
						color="primary"
						className="font-semibold hover:bg-primary-50 transition-colors"
						onPress={() => {
							router.push(`/actus`);
						}}
					>
						Voir plus
						<ArrowRight />
					</Button>
				</Flex>

				<Flex
					flexWrap="wrap"
					gap="24px"
					justifyContent="center"
					alignItems="stretch"
					fullWidth
				>
					<Swiper
						slidesPerView={3}
						centeredSlides={true}
						spaceBetween={0}
						pagination={{
							clickable: true,
						}}
						freeMode={true}
						navigation={true}
						modules={[Pagination, Navigation, FreeMode]}
						className="mySwiper w-full"
					>
						{Object.values(informations).map((info) => (
							<SwiperSlide key={info.id} className="m-10">
								<InfoCard
									title={info.title}
									description={info.description}
									createdAt={info.createdAt || ""}
									imageUrl={info.imageURL}
									onPress={() => router.push(`/actu/${info.id}`)}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</Flex>
			</Flex>
		</Flex>
	);
}
