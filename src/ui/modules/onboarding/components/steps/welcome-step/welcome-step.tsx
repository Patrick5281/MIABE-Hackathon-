import { BaseComponentProps } from "@/types/onboarding-steps-List";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { OnboardingHeader } from "../../header/onboarding-header";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { useState } from "react";
import { Card } from "@/ui/design-system/card/card";
import { CardContent } from "@/ui/design-system/card/card-content";
import { useOnboardingContext } from "../../../context/onboarding-context"; 

export const WelcomeStep = ({
    next,
    isFirstStep,
    isFinalStep,
    stepsList,
    getCurrentStep,
}: BaseComponentProps) => {
    const { setUserType } = useOnboardingContext();
    const [selectedType, setSelectedType] = useState<"particulier" | "entreprise" | null>(null);

    const handleTypeSelect = (type: "particulier" | "entreprise") => {
        setSelectedType(type);
        setUserType(type);
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
                                Bienvenue sur RecycleHub !
                            </Typography>
                            <Typography
                                variant="body-base"
                                component="p"
                                theme="gray"
                            >
                                Rejoignez notre communauté engagée pour un monde plus propre.
                                Commençons par identifier qui vous êtes pour vous offrir
                                la meilleure expérience possible.
                            </Typography>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <Card 
                                    className={`cursor-pointer transition-all duration-200 ${
                                        selectedType === "particulier" 
                                            ? "border-primary shadow-lg" 
                                            : "hover:border-gray-300"
                                    }`}
                                    onClick={() => handleTypeSelect("particulier")}
                                >
                                    <CardContent className="flex flex-col items-center p-6">
                                        <img
                                            src="/assets/svg/particulier-icon.svg"
                                            alt="Particulier"
                                            className="w-16 h-16 mb-4"
                                        />
                                        <Typography variant="h5" component="h3" className="text-center">
                                            Je suis un Particulier
                                        </Typography>
                                        <Typography variant="caption3" component="p" theme="gray" className="text-center mt-2">
                                            Je souhaite recycler mes déchets et contribuer à un environnement plus propre
                                        </Typography>
                                    </CardContent>
                                </Card>

                                <Card 
                                    className={`cursor-pointer transition-all duration-200 ${
                                        selectedType === "entreprise" 
                                            ? "border-primary shadow-lg" 
                                            : "hover:border-gray-300"
                                    }`}
                                    onClick={() => handleTypeSelect("entreprise")}
                                >
                                    <CardContent className="flex flex-col items-center p-6">
                                        <img
                                            src="/assets/svg/entreprise-icon.svg"
                                            alt="Entreprise"
                                            className="w-16 h-16 mb-4"
                                        />
                                        <Typography variant="h5" component="h3" className="text-center">
                                            Je suis une Entreprise
                                        </Typography>
                                        <Typography variant="caption3" component="p" theme="gray" className="text-center mt-2">
                                            Je souhaite gérer mes déchets de manière responsable et efficace
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center h-full col-span-6">
                        <div className="w-full">
                            <img
                                src="/assets/svg/rocket.svg"
                                alt="Illustration rocket"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </Container>
            </div>

            <OnboardingFooter
                next={next}
                isFirstStep={isFirstStep}
                isFinalStep={isFinalStep}
                disabled={!selectedType}
            />
        </div>
    );
};