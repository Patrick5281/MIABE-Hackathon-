import clsx from "clsx";
import { Typography } from "../typography/typography";

interface Props {
    id: string;
    label: string;
    type?: "text" | "email" | "password";
    register: any;
    errors: any;
    required?: boolean;
    placeholder?: string;
    isLoading?: boolean;
    isAutocompleted?: boolean;
}

export const Input = ({
    id,
    label,
    type = "text",
    register,
    errors,
    required = false,
    placeholder,
    isLoading = false,
    isAutocompleted = false,
}: Props) => {
    return (
        <div className="space-y-2">
            <Typography variant="caption4" component="div" theme={errors[id] ? "danger" : "gray-600"}>
                {label}
            </Typography>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className={clsx(
                    errors[id] ? "placeholder-alert-danger text-alert-danger" : "placeholder-gray-600",
                    "w-full p-4 font-light border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                )}
                disabled={isLoading}
                {...register(id, {
                    required: {
                        value: required,
                        message: "Ce champ est requis",
                    },
                })}
                autoComplete={isAutocompleted ? "on" : "off"}
            />
            {errors[id] && (
                <Typography variant="caption4" component="div" theme="danger">
                    {errors[id].message}
                </Typography>
            )}
        </div>
    );
};
