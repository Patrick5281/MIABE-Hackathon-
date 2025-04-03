import clsx from "clsx";
import { Typography } from "../typography/typography";

interface Props {
    isLoading: boolean;
    placeholder: string;
    rows?: number;
    register: any;
    errors: any;
    errorMsg?: string;
    id: string;
    required?: boolean;
    isAutocompleted?: boolean;
    label: string;
}

export const Textarea = ({
    rows = 5,
    placeholder,
    isLoading,
    register,
    errors,
    errorMsg = "Tu dois renseigner ce champ",
    id,
    required = true,
    isAutocompleted = false,
    label,
}: Props) => {
    return (
        <div className="space-y-2">
            {label && (
                <Typography variant="caption4" component="div" theme={errors[id] ? "danger" : "gray-600"}>
                    {label}
                </Typography>
            )}
            <textarea
                rows={rows}
                placeholder={placeholder}
                className={clsx(
                    'bg-gray-300',
                    isLoading ? 'cursor-not-allowed bg-white' : '',
                    errors[id] ? ['placeholder-alert-danger', 'text-alert-danger'] : '',
                    'placeholder-gray-600',
                    'w-full p-4 font-light border rounded focus:outline-none focus:ring-1 focus:ring-primary border-gray-400'
                )}
                disabled={isLoading}
                {...register(id, {
                    required: {
                        value: required,
                        message: errorMsg,
                    }
                })}
                autoComplete="off"
            />
            {errors[id] && (
                <Typography variant="caption4" component="div" theme="danger">
                    {errors[id]?.message}
                </Typography>
            )}
        </div>
    );
}