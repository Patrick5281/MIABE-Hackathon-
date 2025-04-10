import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/forms/input";
import { Textarea } from "@/ui/design-system/forms/textarea";

interface Props {
    form: FormsType;
}

export const ProfileStepForm = ({ form }: Props) => {
    const { register, errors, isLoading } = form;

    return (
        <form className="w-full max-w-md space-y-4">
            <Input
                id="displayName"
                label="Nom d'utilisateur"
                type="text"
                register={register}
                errors={errors}
                required={true}
                placeholder="john doe"
                isLoading={isLoading}
            />

            <Input 
                id="expertise"
                label="Expertise"
                type="text"
                register={register}
                errors={errors}
                required={true}
                placeholder="Développeur front-end React freelance"
                isLoading={isLoading}
            />

            <Textarea 
                id="biography"
                label="Biographie"
                register={register}
                errors={errors}
                required={false}
                placeholder="Indique une breve description de toi"
                rows={5}
                isLoading={isLoading}
            />
        </form>
    );
};