import { BaseComponentProps } from "@/types/onboarding-steps-List";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { OnboardingHeader } from "../../header/onboarding-header";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Input } from "@/ui/design-system/forms/input";
import { Select } from "@/ui/design-system/forms/select";
import { useState } from "react";
import { Upload } from "@/ui/design-system/forms/upload";
import { useForm } from "react-hook-form";

interface ProfilStepFormEntrepriseProps extends BaseComponentProps {
    onNext: (data: EntrepriseFormData) => void;
}

interface EntrepriseFormData {
    nomEntreprise: string;
    siret: string;
    adresse: string;
    codePostal: string;
    ville: string;
    secteurActivite: string;
    tailleEntreprise: string;
    responsableNom: string;
    responsablePrenom: string;
    responsableEmail: string;
    responsableTelephone: string;
    logo?: File;
}

const SECTEURS_ACTIVITE = [
    "Industrie",
    "Commerce",
    "Services",
    "Construction",
    "Agriculture",
    "Autre"
];

const TAILLES_ENTREPRISE = [
    "TPE (1-9 salariés)",
    "PME (10-49 salariés)",
    "ETI (50-249 salariés)",
    "Grande entreprise (250+ salariés)"
];

export const ProfilStepFormEntreprise = ({
    next,
    isFirstStep,
    isFinalStep,
    stepsList,
    getCurrentStep,
    onNext
}: ProfilStepFormEntrepriseProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<EntrepriseFormData>();

    const onSubmit = (data: EntrepriseFormData) => {
        onNext(data);
    };

    return (
        <div className="relative h-screen pb-[91px]">
            <OnboardingHeader className="absolute top-0 left-0 w-full z-20" />
            
            <div className="h-full overflow-auto pt-16">
                <Container className="grid h-full grid-cols-12">
                    <div className="relative z-10 flex items-center h-full col-span-6 py-10">
                        <div className="w-full space-y-5 pb-4.5">
                            <OnboardingTabs
                                tabs={stepsList}
                                getCurrentStep={getCurrentStep}
                            />
                            <Typography variant="h1" component="h1">
                                Informations de l'entreprise
                            </Typography>
                            <Typography
                                variant="body-base"
                                component="p"
                                theme="gray"
                            >
                                Veuillez renseigner les informations de votre entreprise pour finaliser votre inscription.
                            </Typography>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="nomEntreprise"
                                        label="Nom de l'entreprise"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                    <Input
                                        id="siret"
                                        label="Numéro SIRET"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                </div>

                                <Input
                                    id="adresse"
                                    label="Adresse"
                                    register={register}
                                    errors={errors}
                                    required
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="codePostal"
                                        label="Code postal"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                    <Input
                                        id="ville"
                                        label="Ville"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                </div>

                                <Select
                                    id="secteurActivite"
                                    label="Secteur d'activité"
                                    register={register}
                                    errors={errors}
                                    required
                                >
                                    <option value="">Sélectionnez un secteur</option>
                                    {SECTEURS_ACTIVITE.map(secteur => (
                                        <option key={secteur} value={secteur}>
                                            {secteur}
                                        </option>
                                    ))}
                                </Select>

                                <Select
                                    id="tailleEntreprise"
                                    label="Taille de l'entreprise"
                                    register={register}
                                    errors={errors}
                                    required
                                >
                                    <option value="">Sélectionnez une taille</option>
                                    {TAILLES_ENTREPRISE.map(taille => (
                                        <option key={taille} value={taille}>
                                            {taille}
                                        </option>
                                    ))}
                                </Select>

                                <Typography variant="h3" component="h2" className="mt-6">
                                    Responsable de l'entreprise
                                </Typography>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="responsableNom"
                                        label="Nom"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                    <Input
                                        id="responsablePrenom"
                                        label="Prénom"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        id="responsableEmail"
                                        label="Email"
                                        type="email"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                    <Input
                                        id="responsableTelephone"
                                        label="Téléphone"
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                </div>

                                <Upload
                                    id="logo"
                                    label="Logo de l'entreprise"
                                    register={register}
                                    errors={errors}
                                />
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center h-full col-span-6">
                        <div className="w-full">
                            <img
                                src="/assets/svg/entreprise-onboarding.svg"
                                alt="Illustration entreprise"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </Container>
            </div>

            <OnboardingFooter
                next={handleSubmit(onSubmit)}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
            />
        </div>
    );
}; 