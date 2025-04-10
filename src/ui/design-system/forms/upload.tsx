import { cn } from "@/lib/utils";
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface Props {
    id: string;
    label: string;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    required?: boolean;
    className?: string;
}

export const Upload = ({ id, label, register, errors, required, className }: Props) => {
    return (
        <div className={cn("space-y-2", className)}>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-white
                        hover:file:bg-primary/90"
                    {...register(id, {
                        required: required ? "Ce champ est requis" : false
                    })}
                />
            </div>
            {errors[id] && (
                <p className="text-sm text-red-500">{errors[id].message}</p>
            )}
        </div>
    );
}; 