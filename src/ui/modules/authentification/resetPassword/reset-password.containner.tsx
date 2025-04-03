import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordView } from "./reset-password.view";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { resetPassword } from "@/api/authentication";
import { toast } from "react-toastify";
import { auth } from "@/config/supabase-config";

interface ResetPasswordFormFieldsType {
    password: string;
    confirmPassword: string;
}

export const ResetPasswordContainner = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        // Récupérer le hash de l'URL qui contient le token
        const hash = window.location.hash;
        if (!hash) return;

        // Extraire le token et le type
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const type = params.get('type');

        if (type === 'recovery' && accessToken) {
            // Mettre à jour la session avec le token de récupération
            auth.setSession({
                access_token: accessToken,
                refresh_token: params.get('refresh_token') || '',
            });
        }
    }, []);

    const {
        handleSubmit,
        register,
        reset,
        formState,
    } = useForm<ResetPasswordFormFieldsType>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const { errors } = formState;

    const onSubmit: SubmitHandler<ResetPasswordFormFieldsType> = async ({ password }) => {
        try {
            setIsLoading(true);
            
            const { error } = await resetPassword(password);
            
            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Votre mot de passe a été réinitialisé avec succès");
            reset();
            router.push("/connexion");
        } catch (error) {
            toast.error("Une erreur est survenue lors de la réinitialisation du mot de passe");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ResetPasswordView
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