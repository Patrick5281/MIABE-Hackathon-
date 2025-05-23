import { useAuth } from "@/Context/AuthUserContext"; 
import { useToggle } from "@/hooks/use-toggle";
import { BaseComponentProps } from "@/types/onboarding-steps-List"; 
import { OnboardingFooter } from "../../footer/onboarding-footer";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { Logo } from "@/ui/design-system/logo/logo";
import { useCallback, useEffect } from "react";
import confetti from 'canvas-confetti';
import { toast } from "react-toastify";
import { supabaseUpdateDocument } from "@/api/database";

export const FinalStep = ({ isFinalStep }: BaseComponentProps) => {
  const { authUser } = useAuth();
  const { value: isLoading, toggle } = useToggle();
 
  const fire = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });

    fire(0.2, {
      spread: 60
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fire()
    }, 50)
  }, [fire]);

  const handleCloseOnboarding = async () => {
    toggle();
    const data = {
      onboardingIsCompleted: true,
    };
    const { error } = await supabaseUpdateDocument(
      "users",
      authUser.uid,
      data
    );
    if (error) {
      toggle();
      toast.error(error.message);
      return;
    }
    toggle();
    // Forcer un rechargement complet pour mettre à jour la session
    window.location.replace('/mon-espace');
  };

  return (
    <div className="relative h-screen pb-[91px]">
      <div className="h-full overflow-auto">
        <Container className="h-full">
          <div className="relative z-10 flex items-center h-full py-10">
            <div className="w-full max-w-xl mx-auto space-y-5 pb-4">
              <div className="flex justify-center">
                <Logo size="large" />
              </div>
              <Typography variant="h1" component="h1" className="text-center">
                Félicitation!            
              </Typography>
              <Typography
                variant="body-base"
                component="p"
                theme="gray"
                className="text-center"
              >
                Viens trainer avec des développeurs aussi fous
                que toi, montre tes projets persos et reçois des
                feedbacks constructifs (ou fais-toi carrément
                descendre). Prêt à créer des trucs incroyables ?
              </Typography>
            </div>
          </div>
        </Container>
      </div>
      <OnboardingFooter
        next={handleCloseOnboarding}
        isFinalStep={isFinalStep}
        isLoading={isLoading}
      />
    </div>
  );
};