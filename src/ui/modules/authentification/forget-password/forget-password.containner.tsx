import { SubmitHandler, useForm } from "react-hook-form";
import { ForgetPasswordView } from "./forget-password.view";
import { useState } from "react";
import { ForgetPasswordFormFielsType } from "@/types/forms";
import { useRouter } from "next/router";
import { sendEmailToResetPassword } from "@/api/authentication";
import { toast } from "react-toastify";

export const ForgetPasswordContainner = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm<ForgetPasswordFormFielsType>();

    const handleResetPassword = async ({ email }: ForgetPasswordFormFielsType) => {
        setIsLoading(true);
        
        const { error } = await sendEmailToResetPassword(email);
        if (error) {
            setIsLoading(false);
            toast.error(error.message);
            return;
        }

        toast.success(`Un email a été expédié à votre adresse ${email}`);
        setIsLoading(false);
        reset();
        router.push("/connexion");
    };

    const onSubmit: SubmitHandler<ForgetPasswordFormFielsType> = async (formData) => {
        console.log("formData", formData);
        await handleResetPassword(formData);
    };

    return (
        <ForgetPasswordView
            form={{
                errors,
                register,
                handleSubmit,
                onSubmit,
                isLoading,
            }}
        />
    );
};
