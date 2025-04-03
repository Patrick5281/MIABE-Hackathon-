import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegister<any>;
  id: string;
}

export const Checkbox = ({ label, register, id }: Props) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        {...register(id)}
      />
      <label htmlFor={id} className="ml-2 block">
        {label}
      </label>
    </div>
  );
}; 