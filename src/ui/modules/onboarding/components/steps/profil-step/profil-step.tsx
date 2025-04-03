import { BaseComponentProps } from "@/types/onboarding-steps-List";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { SubmitHandler, useForm } from "react-hook-form";
import { OnboardingProfilStepFormFieldsType } from "@/types/forms";
import { useToggle } from "@/hooks/use-toggle";
import { ProfileStepForm } from "./profil-step-form";
import { useAuth } from "@/Context/AuthUserContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { supabaseUpdateDocument } from "@/api/database";

export const ProfilStep = ({
  prev,
  next,
  isFirstStep,
  isFinalStep,
  stepsList,
  getCurrentStep,
}: BaseComponentProps) => {
    const { authUser } = useAuth();
    const { value: isLoading, setvalue: setLoading } = useToggle();
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty },
        register,
        reset,
        setValue,
        watch
    } = useForm<OnboardingProfilStepFormFieldsType>();

    // Surveiller les changements dans authUser.userDocument
    useEffect(() => {
        if (!authUser?.userDocument) return;

        console.log("Mise à jour des données utilisateur reçue:", authUser.userDocument);
        
        // Mettre à jour les champs du formulaire avec les nouvelles données
        const fields: (keyof OnboardingProfilStepFormFieldsType)[] = ['displayName', 'expertise', 'biography'];
        fields.forEach(field => {
            const value = authUser.userDocument[field];
            if (value !== undefined && value !== watch(field)) {
                setValue(field, value);
            }
        });
    }, [authUser?.userDocument, setValue, watch]);

    if (!authUser?.userDocument) {
        return null;
    }

    const onSubmit: SubmitHandler<OnboardingProfilStepFormFieldsType> = async (formData) => {
        try {
            setLoading(true);

            // Vérifier si le formulaire a été modifié
            if (isDirty) {
                console.log("Formulaire modifié, envoi des données...");
                const { error } = await supabaseUpdateDocument(
                    "users",
                    authUser.uid,
                    formData
                );
            
                if (error) {
                    console.error("Erreur lors de la mise à jour:", error);
                    toast.error(error.message);
                    return;
                }

                // Réinitialiser le formulaire après une mise à jour réussie
                reset(formData);
                console.log("Données envoyées avec succès");
            } else {
                console.log("Aucune modification détectée, passage à l'étape suivante...");
            }
        
            next();
        } catch (error) {
            console.error("Erreur inattendue:", error);
            toast.error("Une erreur est survenue lors de la mise à jour");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen pb-[91px]">
            <div className="h-full overflow-auto">
                <Container className="grid h-full grid-cols-12">
                    <div className="relative z-10 flex items-center h-full col-span-6 py-10">
                        <div className="w-full space-y-5 pb-4.5">
                            <OnboardingTabs 
                                tabs={stepsList}
                                getCurrentStep={getCurrentStep}
                            />
                            <Typography variant="h1" component="h1">
                                Présente toi !             
                            </Typography>
                            <Typography
                                variant="body-base"
                                component="p"
                                theme="gray"
                            >
                                Viens trainer avec des développeurs aussi fous
                                que toi, montre tes projets persos et reçois des
                                feedbacks constructifs (ou fais-toi carrément
                                descendre). Prêt à créer des trucs incroyables ?
                            </Typography>
                        </div>
                    </div>
                    <div className="flex items-center h-full col-span-6">
                        <div className="flex justify-end w-full">
                            <ProfileStepForm
                                form={{
                                    errors,
                                    control,
                                    register,
                                    handleSubmit,
                                    onSubmit,
                                    isLoading,
                                }}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <OnboardingFooter
                prev={prev}
                next={handleSubmit(onSubmit)}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
                isLoading={isLoading}
            />
        </div>
    );
};