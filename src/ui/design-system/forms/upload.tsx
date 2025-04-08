import { cn } from "@/lib/utils";

interface Props {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrl?: string | null;
    className?: string;
}

export const Upload = ({ label, onChange, previewUrl, className }: Props) => {
    return (
        <div className={cn("space-y-2", className)}>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    onChange={onChange}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-white
                        hover:file:bg-primary/90"
                />
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg"
                    />
                )}
            </div>
        </div>
    );
}; 