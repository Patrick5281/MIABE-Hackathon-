import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterView } from "./register.view";
import { RegisterFormFielsType } from "@/types/forms";
import { toast } from "react-toastify";
import { useToggle } from "@/hooks/use-toggle";
import { Button } from "@/ui/design-system/button/button";
import { supabaseCreateUser, sendEmailVerificationProcedure } from "@/api/authentication";
import { supabaseCreateDocument } from "@/api/database";

export const RegisterContainer = () => {
    const { value: isLoading, setvalue: setIsLoading, toggle } = useToggle({ initial: true });
    
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        reset,
    } = useForm<RegisterFormFielsType>();

    const handleCreateUserDocument = async (
      collectionName: string,
      documentID: string,
      document: object
    ) => {
      try {
        // Ajout d'un bloc try/catch pour mieux gérer les erreurs
        const { error } = await supabaseCreateDocument(
          collectionName,
          documentID,
          document
        );
       
        if (error) {
          console.error("Erreur création document:", error);
          toast.error(error.message);
          setIsLoading(false);
          return;
        }
       
        toast.success("Bienvenue sur l'app des singes codeurs");
        setIsLoading(false);
        reset();
        sendEmailVerificationProcedure();
      } catch (err) {
        // Capture toute erreur inattendue
        console.error("Erreur inattendue:", err);
        toast.error("Une erreur inattendue s'est produite");
        setIsLoading(false);
      }
    };

    const handleCreateUserAuthentication = async ({
        email,
        password,
        how_did_hear,
    }: RegisterFormFielsType) => {
        const { error, data } = await supabaseCreateUser(email, password);
        
        if (error) {
            setIsLoading(false);
            toast.error(error.message);
            return;
        }
        
        if (!data) {
            setIsLoading(false);
            toast.error("Erreur lors de la création du compte");
            return;
        }

        const userDocumentData = {
          email: email,
          how_did_hear: how_did_hear,
          uid: data.id,
          creation_date: new Date().toISOString(),
        };
       
        await handleCreateUserDocument("users", data.id, userDocumentData);
    };

    const onSubmit: SubmitHandler<RegisterFormFielsType> = async (formData) => {
        setIsLoading(true);
        const { password } = formData;
     
        if (password.length <= 5) {
          setError("password", {
            type: "manual",
            message: "Ton mot de passe doit comporter au minimum 6 caractères",
          });
          setIsLoading(false);
          return;
        }
        
        await handleCreateUserAuthentication(formData);
    };

    return (
        <>
          <Button action={toggle}>Click me</Button>
          <RegisterView
            form={{
                errors,
                register,
                handleSubmit,
                onSubmit,
                isLoading,
            }}
          />
        </>
    );
};