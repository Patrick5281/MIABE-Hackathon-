import { useAuth } from "@/Context/AuthUserContext";
import { GUEST, REGISTERED } from "@/lib/session-status";
import { SessionStatusTypes } from "@/types/session-status-types";
import { ScreenSpinner } from "@/ui/design-system/spinner/screen-spinner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusTypes;
}

export const Session = ({ children, sessionStatus }: Props) => {
  const router = useRouter();
  const { authUserIsLoading, authUser } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("État de la session:", {
      authUserIsLoading,
      authUser: !!authUser,
      pathname: router.pathname,
      isRedirecting,
      isReady
    });
  }, [authUserIsLoading, authUser, router.pathname, isRedirecting, isReady]);

  useEffect(() => {
    if (authUserIsLoading) {
      setIsReady(false);
      return;
    }

    const handleNavigation = async () => {
      try {
        // Si l'utilisateur n'est pas connecté et que la page nécessite une authentification
        if (!authUser && sessionStatus === REGISTERED) {
          setIsRedirecting(true);
          await router.push("/connexion");
          return;
        }

        // Si l'utilisateur est connecté et que la page est pour les invités
        if (authUser && sessionStatus === GUEST) {
          setIsRedirecting(true);
          await router.push("/mon-espace");
          return;
        }

        // Gestion de l'onboarding
        if (authUser?.userDocument) {
          const hasCompletedOnboarding = !!authUser.userDocument.onboardingIsCompleted;
          
          if (!hasCompletedOnboarding && router.pathname !== "/onboarding") {
            setIsRedirecting(true);
            await router.push("/onboarding");
            return;
          }
          
          if (hasCompletedOnboarding && router.pathname === "/onboarding") {
            setIsRedirecting(true);
            await router.push("/mon-espace");
            return;
          }
        }

        // Si on arrive ici, c'est que tout est OK
        setIsRedirecting(false);
        setIsReady(true);
      } catch (error) {
        console.error("Erreur de navigation:", error);
        setIsRedirecting(false);
        setIsReady(true);
      }
    };

    handleNavigation();
  }, [authUserIsLoading, authUser, sessionStatus, router.pathname]);

  // Afficher le spinner pendant le chargement
  if (authUserIsLoading || isRedirecting || !isReady) {
    console.log("Affichage du spinner:", { authUserIsLoading, isRedirecting, isReady });
    return <ScreenSpinner />;
  }

  return <>{children}</>;
};