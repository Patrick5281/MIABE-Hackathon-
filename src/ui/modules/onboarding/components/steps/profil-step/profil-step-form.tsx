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
                label="Nom d'utilisateur"
                isLoading={isLoading}
                placeholder="john doe"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner un pseudo"
                id="displayName"
                required={true}
            />

            <Input 
                label="Expertise"
                isLoading={isLoading}
                placeholder="Développeur front-end React freelance"
                type="text"
                register={register}
                errors={errors}
                errorMsg="Tu dois renseigner ton Expertise"
                id="expertise"
                required={true}
            />

            <Textarea 
                label="Biographie"
                isLoading={isLoading}
                placeholder="Indique une breve description de toi"
                rows={5}
                register={register}
                errors={errors}
                id="biography"
                required={false}
            />
        </form>
    );
};