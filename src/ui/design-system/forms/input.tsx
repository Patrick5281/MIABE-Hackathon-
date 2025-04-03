import clsx from "clsx";
import { Typography } from "../typography/typography";

interface Props {
    isLoading?: boolean;
    placeholder?: string;  // Correction ici
    type?: "text" | "email" | "password";
    register: any; 
    errors: any;
    errorMsg?: string;
    id?: string;
    required?: boolean;
    isAutocompleted?: boolean;
    label?: string
}

export const Input = ({
    isLoading,
    placeholder, // Correction ici
    type = "text",
    register,
    errors,
    errorMsg = "Tu dois renseigner ce champ",
    id = "", // Ajout d'une valeur par défaut pour éviter undefined
    required,
    isAutocompleted = false,
    label,
}: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <Typography variant="caption4" component="div" theme={errors[id] ? "danger" : "gray-600"} >
          {label}
        </Typography>
      )}
      <input
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
            message: errorMsg,
          },
        })}
        autoComplete={isAutocompleted ? "on" : "off"}
      />
      {errors[id] && (
        <Typography variant="caption4" component="div" theme="danger">
          {errors[id]?.message}
        </Typography>
      )}
    </div>
  );
};
