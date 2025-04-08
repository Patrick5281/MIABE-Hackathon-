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
    const { register, formState: { errors } } = useForm();
    const [formData, setFormData] = useState<EntrepriseFormData>({
        nomEntreprise: "",
        siret: "",
        adresse: "",
        codePostal: "",
        ville: "",
        secteurActivite: "",
        tailleEntreprise: "",
        responsableNom: "",
        responsablePrenom: "",
        responsableEmail: "",
        responsableTelephone: "",
    });

    const [logo, setLogo] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogo(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext({
            ...formData,
            logo: logo || undefined
        });
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

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Nom de l'entreprise"
                                        name="nomEntreprise"
                                        value={formData.nomEntreprise}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                    <Input
                                        label="Numéro SIRET"
                                        name="siret"
                                        value={formData.siret}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                </div>

                                <Input
                                    label="Adresse"
                                    name="adresse"
                                    value={formData.adresse}
                                    onChange={handleChange}
                                    required
                                    register={register}
                                    errors={errors}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Code postal"
                                        name="codePostal"
                                        value={formData.codePostal}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                    <Input
                                        label="Ville"
                                        name="ville"
                                        value={formData.ville}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                </div>

                                <Select
                                    label="Secteur d'activité"
                                    name="secteurActivite"
                                    value={formData.secteurActivite}
                                    onChange={handleChange}
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
                                    label="Taille de l'entreprise"
                                    name="tailleEntreprise"
                                    value={formData.tailleEntreprise}
                                    onChange={handleChange}
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
                                        label="Nom"
                                        name="responsableNom"
                                        value={formData.responsableNom}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                    <Input
                                        label="Prénom"
                                        name="responsablePrenom"
                                        value={formData.responsablePrenom}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Email"
                                        name="responsableEmail"
                                        type="email"
                                        value={formData.responsableEmail}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                    <Input
                                        label="Téléphone"
                                        name="responsableTelephone"
                                        value={formData.responsableTelephone}
                                        onChange={handleChange}
                                        required
                                        register={register}
                                        errors={errors}
                                    />
                                </div>

                                <Upload
                                    label="Logo de l'entreprise"
                                    onChange={handleLogoChange}
                                    previewUrl={previewUrl}
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
                next={() => {
                    const form = document.querySelector('form');
                    if (form) {
                        const event = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
                        handleSubmit(event);
                    }
                }}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
            />
        </div>
    );
}; 