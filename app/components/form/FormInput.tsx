"use client";

import { Input } from "@heroui/react";
import { Control, Controller, useFormContext } from "react-hook-form";

interface IInputProps {
	rules: "email" | "password";
	name: string;
	defaultValue?: string;
	disabled?: boolean;
	placeholder?: string;
	label?: string;
}

const mailRules = {
	required: "L'email est requis",
	pattern: {
		value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		message: "L'email doit être valide",
	},
};

const passwordRules = {
	required: "Le mot de passe est requis",
	minLength: {
		value: 8,
		message: "Le mot de passe doit contenir au moins 8 caractères",
	},
	pattern: {
		value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
		message:
			"Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
	},
};

const FormInput = ({
	rules,
	name,
	defaultValue,
	disabled,
	placeholder,
	label,
}: IInputProps) => {
	const { control } = useFormContext();
	return (
		<Controller
			control={control}
			rules={rules === "email" ? mailRules : passwordRules}
			render={({ field: { onChange, onBlur, value } }) => (
				<Input
					label={label}
					placeholder={placeholder}
					onBlur={onBlur}
					onValueChange={onChange}
					value={value}
					variant="bordered"
				/>
			)}
			name={name}
			defaultValue={defaultValue}
			disabled={disabled}
		></Controller>
	);
};

export default FormInput;
