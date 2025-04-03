import { BaseComponentProps } from "@/types/onboarding-steps-List";
import { Container } from "@/ui/components/container/container";
import { OnboardingTabs } from "../../tabs/onboarding-tabs";
import { Typography } from "@/ui/design-system/typography/typography";
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { useAuth } from "@/Context/AuthUserContext";
import { useToggle } from "@/hooks/use-toggle";
import { UploadAvatar } from "@/ui/modules/upload-avatar/upload-avatar";
import { useState } from "react";

export const AvatarStep = ({
  prev,
  next,
  isFinalStep,
  stepsList,
  getCurrentStep,
}: BaseComponentProps) => {
    const {authUser} = useAuth();
    const {value: isLoading, setvalue: setLoading} = useToggle();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedImage(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          let imgDataUrl: string | ArrayBuffer | null = null;
          if (e.target) {
            imgDataUrl = e.target.result;
          }
          setImagePreview(imgDataUrl);
        };
        reader.readAsDataURL(file);
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
                    Derniere Etape !             
                </Typography>
                <Typography
                  variant="body-base"
                  component="p"
                  theme="gray"
                >
                    C'est sûr t'as une tête à être sur Coders Monkeys !
                    Mais on a besoin de ta plus belle photo de profil 
                    pour que tout le monde puisse voir à quel point tu 
                    es incroyable. Mettre une photo sympa, c'est la 
                    garantie de te faire remarquer et de faire craquer
                    les développeurs en quête de nouveaux contacts. 
                    Alors montre-nous ta belle gueule et rejoins la 
                    communauté !
                </Typography>
              </div>
            </div>
            <div className="flex items-center h-full col-span-6">
              <div className="flex justify-center w-full">
                 <UploadAvatar handleImageSelect={handleImageSelect} imagePreview={imagePreview}/>

              </div>
              </div>
            </Container>
          </div>
          <OnboardingFooter
            prev={prev}
            next={next}
            isFinalStep={isFinalStep}
            isLoading={isLoading}
          />
        </div>
    );
};

