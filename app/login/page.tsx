"use client";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../components/form/FormInput";

type FormData = {
	email: string;
	password: string;
};

const Login = () => {
	const methods = useForm<FormData>();

	const { handleSubmit, control } = methods;

	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<div className="flex w-full h-full items-center justify-center p-4">
			<div className="w-full max-w-md rounded-2xl border border-white/80 bg-white/95 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur">
				<div className="px-8 pt-10 pb-8">
					<div className="mb-8 text-center">
						<h1 className="mt-3 text-3xl font-bold text-[color:var(--color-primary-700)]">
							Connexion
						</h1>
						<p className="mt-2 text-sm text-slate-600">
							Accédez à votre tableau de bord CESIZEN.
						</p>
					</div>

					<FormProvider {...methods}>
						<FormInput
							rules="email"
							name="email"
							label="E-mail"
							placeholder="prenom.nom@cesi.fr"
						/>
						{/* <div className="space-y-2">
							<label
								className="text-sm font-semibold text-slate-700"
								htmlFor="email"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="prenom.nom@cesi.fr"
								className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[color:var(--color-primary-500)] focus:ring-2 focus:ring-[color:var(--color-primary-200)]"
								{...register("email")}
							/>
						</div> */}

						<div className="space-y-2">
							<label
								className="text-sm font-semibold text-slate-700"
								htmlFor="password"
							>
								Mot de passe
							</label>
							<input
								id="password"
								type="password"
								placeholder="••••••••"
								className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[color:var(--color-primary-500)] focus:ring-2 focus:ring-[color:var(--color-primary-200)]"
							/>
						</div>
						<div className="flex items-center justify-between text-sm">
							<label className="flex items-center gap-2 text-slate-600">
								<input
									type="checkbox"
									className="h-4 w-4 rounded border-slate-300 text-[color:var(--color-primary-600)]"
								/>
								Se souvenir de moi
							</label>
							<button
								type="button"
								className="font-semibold text-[color:var(--color-primary-600)] hover:text-[color:var(--color-primary-700)]"
							>
								Mot de passe oublié ?
							</button>
						</div>

						<button
							type="submit"
							className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--color-primary-600)] shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 hover:text-[color:var(--color-secondary-700)]"
						>
							Se connecter
						</button>
					</FormProvider>
				</div>

				<div className="rounded-b-2xl border-t border-slate-100 bg-slate-50/80 px-8 py-5 text-center text-xs text-slate-500">
					Besoin d’un accès ? Contactez votre référent CESIZEN.
				</div>
			</div>
		</div>
	);
};

export default Login;
