"use client";

import { Button, Card } from "@heroui/react";
import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Flex from "../components/utils/Flex";
import Title from "../components/utils/Title";

type Phase = {
	name: string;
	duration: number;
	mode: "in" | "out" | "hold";
};

type Exercise = {
	id: number;
	title: string;
	description: string;
	phases: Phase[];
};

const exercises: Exercise[] = [
	{
		id: 1,
		title: "Cohérence Cardiaque",
		description:
			"Idéal pour réduire le stress. Inspirez sur 5 secondes, expirez sur 5 secondes.",
		phases: [
			{ name: "Inspiration", duration: 5, mode: "in" },
			{ name: "Expiration", duration: 5, mode: "out" },
		],
	},
	{
		id: 2,
		title: "Respiration 4-7-8",
		description:
			"Favorise l'endormissement. Inspirez (4s), retenez (7s), expirez (8s).",
		phases: [
			{ name: "Inspiration", duration: 4, mode: "hold" },
			{ name: "Rétention", duration: 7, mode: "hold" },
			{ name: "Expiration", duration: 8, mode: "out" },
		],
	},
	{
		id: 3,
		title: "Respiration Carrée",
		description:
			"Booste la concentration. 4 temps égaux pour chaque phase du cycle.",
		phases: [
			{ name: "Inspiration", duration: 4, mode: "out" },
			{ name: "Rétention (plein)", duration: 4, mode: "hold" },
			{ name: "Expiration", duration: 4, mode: "out" },
			{ name: "Rétention (vide)", duration: 4, mode: "hold" },
		],
	},
];

export default function RespirationPage() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [selectedExercise, setSelectedExercise] = useState<Exercise>();
	const [currentPhase, setCurrentPhase] = useState<Phase>();
	const [timeLeft, setTimeLeft] = useState(0);
	const [currentCycle, setCurrentCycle] = useState(0);
	const [cycle, setCycle] = useState(3);

	const selectExercise = (exercise: Exercise) => {
		setSelectedExercise(exercise);
		setCurrentPhase(exercise.phases[0]);
		setTimeLeft(exercise.phases[0].duration);
		setIsPlaying(false);
	};

	const stopExercise = () => {
		setIsPlaying(false);
		setCurrentPhase(undefined);
		setTimeLeft(0);
		setCurrentCycle(0);
	};

	const startExercise = () => {
		setIsPlaying(true);
	};

	const nextPhase = () => {
		if (!selectedExercise) return;
	};

	return (
		<Flex direction="column" gap>
			<Title size="lg">Espace Respiration</Title>
			<p className="text-gray-600 mb-4">
				Sélectionnez un exercice et suivez le rythme pour vous détendre.
			</p>

			<Flex
				direction="row"
				gap="24px"
				fullWidth
				flexWrap="wrap"
				className="flex-1 items-stretch"
			>
				{/* Liste des exercices */}
				<Card className="p-8 gap-4">
					<Title size="sm" underline>
						Exercices disponibles :
					</Title>
					<Flex direction="column" gap="16px" className="w-1/3">
						{exercises.map((ex) => (
							<Button
								key={ex.id}
								className={`h-auto flex-col items-start p-4 whitespace-normal text-left border transition-all ${selectedExercise?.id === ex.id ? "border-primary bg-primary-50" : "border-transparent bg-white hover:bg-gray-50"}`}
								onPress={() => selectExercise(ex)}
								variant="light"
							>
								<span className="font-bold text-lg text-primary-700 mb-1">
									{ex.title}
								</span>
								<span className="text-sm text-gray-500">{ex.description}</span>
							</Button>
						))}
					</Flex>
				</Card>

				{/* Zone visuelle et contrôles */}

				{!selectedExercise ? (
					<Flex justifyContent="center" alignItems="center" flex="1">
						<p className="text-gray-400 text-lg">
							Sélectionnez un exercice pour commencer.
						</p>
					</Flex>
				) : (
					<Card className="p-8 gap-4 flex-1" fullWidth>
						<Title size="sm" underline>
							{selectedExercise.title}
						</Title>
						<Flex
							direction="column"
							justifyContent="center"
							alignItems="center"
							gap="2rem"
						>
							<Flex className="top-8 left-0 right-0" justifyContent="center">
								<p className="text-primary-600 text-2xl font-extrabold">
									{currentPhase?.name}
								</p>
							</Flex>

							<Flex
								padding="2rem"
								justifyContent="center"
								alignItems="center"
								className="relative rounded-full bg-primary-50 border-4 border-primary-200 overflow-hidden"
							>
								<div
									className={`absolute rounded-full bg-primary-300 opacity-40`}
									style={{
										width:
											currentPhase?.mode === "in"
												? "100%"
												: currentPhase?.mode === "out"
													? "20%"
													: "60%",
										height:
											currentPhase?.mode === "in"
												? "100%"
												: currentPhase?.mode === "out"
													? "0%"
													: "60%",
										transitionDuration: `${currentPhase ? currentPhase.duration * 1000 : 1000}ms`,
										transitionTimingFunction: "linear",
									}}
								/>
								<span className="text-4xl font-bold text-primary-800 z-10">
									{timeLeft}s
								</span>
							</Flex>

							<Flex gap="4rem">
								<Button
									isIconOnly
									className="w-16 h-16 rounded-full shadow-lg"
									color={isPlaying ? "warning" : "primary"}
									onPress={() => setIsPlaying(!isPlaying)}
								>
									{isPlaying ? <Pause /> : <PlayArrow />}
								</Button>
								<Button
									isIconOnly
									variant="flat"
									color="danger"
									className="w-16 h-16 rounded-full"
									// onPress={stopExercise}
								>
									<Stop />
								</Button>
							</Flex>
						</Flex>
					</Card>
				)}
			</Flex>
		</Flex>
	);
}
