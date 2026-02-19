"use client";

import { Card, Button, NumberInput } from "@heroui/react";
import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Flex from "../components/utils/Flex";
import Title from "../components/utils/Title";
import useIsMobile from "@/context/useIsMobile";

type Phase = {
	name: string;
	duration: number;
	mode: "inspiration" | "expiration" | "tenir";
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
			{ name: "Inspiration", duration: 5, mode: "inspiration" },
			{ name: "Expiration", duration: 5, mode: "expiration" },
		],
	},
	{
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
	{
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
];

const playBeep = (frequency = 600, duration = 150) => {
	const audioCtx = new (window.AudioContext || window.AudioContext)();
	const oscillator = audioCtx.createOscillator();

	oscillator.type = "sine";
	oscillator.frequency.value = frequency;
	oscillator.connect(audioCtx.destination);

	oscillator.start();
	setTimeout(() => oscillator.stop(), duration);
};

export default function RespirationPage() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [selectedExercise, setSelectedExercise] = useState<Exercise>();
	const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [maxCycleTime, setMaxCycleTime] = useState(3);
	const [cycleCount, setCycleCount] = useState(0);

	const isMobile = useIsMobile();

	const currentPhase = selectedExercise?.phases[currentPhaseIndex];

	const selectExercise = (exercise: Exercise) => {
		setSelectedExercise(exercise);
		setCurrentPhaseIndex(0);
		setTimeLeft(exercise.phases[0].duration);
		setCycleCount(0);
	};

	const stopExercise = () => {
		setIsPlaying(false);
		if (selectedExercise) {
			setCurrentPhaseIndex(0);
			setTimeLeft(selectedExercise.phases[0].duration);
		}
		setCycleCount(0);
	};

	useEffect(() => {
		if (!isPlaying || !selectedExercise) return;
		const timer = setTimeout(() => {
			if (timeLeft > 1) {
				setTimeLeft((prev) => prev - 1);
			} else {
				const nextIndex =
					(currentPhaseIndex + 1) % selectedExercise.phases.length;
				if (nextIndex === 0) {
					console.log("Cycle count:", cycleCount + 1);
					if (cycleCount + 1 === maxCycleTime) {
						setIsPlaying(false);
						setCycleCount(0);
					} else {
						setCycleCount((prev) => prev + 1);
						playBeep(600, 250);
					}
				} else {
					playBeep();
				}
				setCurrentPhaseIndex(nextIndex);
				playBeep();
				setTimeLeft(selectedExercise.phases[nextIndex].duration);
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [
		isPlaying,
		timeLeft,
		selectedExercise,
		currentPhaseIndex,
		cycleCount,
		maxCycleTime,
	]);

	const getCircleAnimSize = () => {
		if (!currentPhase) return "50%";
		if (currentPhase.mode === "inspiration") return "100%";
		if (currentPhase.mode === "expiration") return "0%";
		return "60%";
	};

	const getCircleAnimTimeTrans = () => {
		if (!currentPhase || !isPlaying) return "0ms";
		if (currentPhase.mode === "tenir")
			return `${(currentPhase.duration * 1000) / 3}ms`;
		return `${currentPhase.duration * 1000}ms`;
	};

	const getCircleAnimTimingFunc = () => {
		if (!currentPhase || !isPlaying) return "linear";
		if (currentPhase.mode === "tenir") return "ease-out";
		return "linear";
	};

	const getCircleAnimColor = () => {
		if (!currentPhase) return "var(--color-primary-50)";
		if (currentPhase.mode === "tenir") return "var(--color-secondary-500)";
		if (currentPhase.mode === "inspiration") return "var(--color-primary-300)";
		if (currentPhase.mode === "expiration") return "var(--color-primary-100)";
		return "var(--color-primary-200)";
	};

	return (
		<Flex direction="column" gap>
			<Title size="lg">Espace Respiration</Title>
			<p className="text-gray-600 mb-4">
				Sélectionnez un exercice et suivez le rythme pour vous détendre.
			</p>

			<Flex
				direction={isMobile ? "column" : "row"}
				gap="24px"
				fullWidth
				flexWrap="wrap"
			>
				{/* Liste des exercices */}
				<Card className="p-8 gap-4">
					<Title size="sm" underline>
						Exercices disponibles :
					</Title>
					<Flex direction="column" gap="16px">
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
					<Title size="sm" underline>
						Options :
					</Title>
					<Flex direction="column" gap="8px">
						<NumberInput
							label="Nombre de cycles"
							value={maxCycleTime}
							onChange={(value) => setMaxCycleTime(Number(value))}
							min={1}
							max={100}
						/>
					</Flex>
				</Card>

				{/* Zone visuelle et contrôles */}

				{!selectedExercise ? (
					<Flex
						justifyContent="center"
						alignItems="center"
						flex="1"
						className={`${!isMobile && "min-w-100"}`}
					>
						<p className="text-gray-400 text-lg">
							Sélectionnez un exercice pour commencer.
						</p>
					</Flex>
				) : (
					<Card
						className={`p-8 gap-4 flex-1 ${!isMobile ? "min-w-100" : ""}`}
						fullWidth
					>
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
									{currentPhase?.name || ""}
								</p>
							</Flex>

							<Flex
								padding="2rem"
								justifyContent="center"
								alignItems="center"
								className="relative rounded-full bg-primary-50 border-4 border-primary-200 overflow-hidden"
							>
								<div
									className={`absolute rounded-full opacity-40`}
									style={{
										backgroundColor: getCircleAnimColor(),
										width: getCircleAnimSize(),
										height: getCircleAnimSize(),
										transitionDuration: `${getCircleAnimTimeTrans()}`,
										transitionTimingFunction: `${getCircleAnimTimingFunc()}`,
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
									onPress={stopExercise}
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
