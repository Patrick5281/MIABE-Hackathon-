import { useEffect } from "react";
import { LoginView } from "./login.view"
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormFielsType } from "@/types/forms";
import { useToggle } from "@/hooks/use-toggle";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabaseSignInUser } from "@/api/authentication";

export const LoginContainer = () => {
    const router = useRouter()
    const {value:isLoading, setvalue:setIsLoading} = useToggle();
    
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<LoginFormFielsType>();
    
    const handleSignInUser = async ({ email, password }: LoginFormFielsType) => {
        console.log("Tentative de connexion avec :", email);
       
        const { error, data } = await supabaseSignInUser(email, password);
   
        if (error) {
            console.log("Erreur Supabase :", error);
            setIsLoading(false);
            
            // Adaptez les codes d'erreur Firebase aux codes Supabase
            if (error.code === "auth/invalid-email" || error.code === "auth/invalid-login-credentials") {
                setError("email", {
                    type: "manual",
                    message: "Email ou mot de passe invalide",
                });
            } else {
                toast.error(error.message);
            }
            return;
        }
   
        console.log("Utilisateur connecté :", data);
        toast.success("Bienvenue sur Coders Monkeys");
        setIsLoading(false);
        reset();
        router.push("/mon-espace");
    };
   
    const onSubmit: SubmitHandler<LoginFormFielsType> = async (formData) => {
        setIsLoading(true)
        const {password} = formData;
        
        if (password.length <= 5) {
            setError("password", {
                type: "manual",
                message: "Ton mot de passe doit comporter au minimum 6 caractères",
            });
            setIsLoading(false);
            return;
        }
        
        handleSignInUser(formData);
    };
    
    return (
        <LoginView
        form={{
            errors,
            register,
            handleSubmit,
            onSubmit,
            isLoading,
        }}
        />
    );
}