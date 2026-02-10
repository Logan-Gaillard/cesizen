"use client";

import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../components/form/FormInput";
import FormCard from "../components/form/FormCard";
import styled from "styled-components";
import { Button } from "@heroui/react";
import { registerUser } from "../../actions/user";

type FormData = {
	nickname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const methods = useForm<FormData>({
		defaultValues: {
			nickname: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { handleSubmit } = methods;

	const onSubmit = handleSubmit(async (data) => {
		console.log(data);
		const result = await registerUser(data);
		console.log(result);
	});

	return (
		<div className="flex w-full h-full items-center justify-center p-4">
			<FormCard
				isLogin={false}
				titleCard="Inscription"
				descriptionCard="Créez un compte pour accéder à toutes les fonctionnalités de votre espace personnel."
			>
				<FormProvider {...methods}>
					<div className="mb-6 flex flex-col items-center gap-4">
						<FormInput
							type="text"
							name="nickname"
							label="Nom d'utilisateur"
							placeholder="Votre nom d'utilisateur"
						/>

						<FormInput
							type="email"
							name="email"
							label="E-mail"
							placeholder="prenom.nom@cesi.fr"
						/>

						<FormInput
							type="password"
							name="password"
							label="Mot de passe"
							placeholder="••••••••"
						/>
						<FormInput
							type="password"
							name="confirmPassword"
							label="Confirmez le mot de passe"
							placeholder="••••••••"
						/>
					</div>

					<Button
						type="submit"
						onPress={() => onSubmit()}
						className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--color-primary-600)] shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:text-[color:var(--color-secondary-700)]"
					>
						{"S'inscrire"}
					</Button>
				</FormProvider>
			</FormCard>
		</div>
	);
};

export default Register;
