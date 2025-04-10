import { firebaseLogOutUser } from "@/api/authentication";
import { toast } from "react-toastify";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { ActiveLink } from "./active-link";
import { Box } from "@/ui/design-system/box/box";

export const UserAccountNavigation = () => {
  const handleLogoutUser = async () => {
    const { error } = await firebaseLogOutUser();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("A bientôt sur Coders Monkeys");
  };

  return (
    <Box className="flex flex-col gap-7">
      <div className="flex flex-col gap-6">
        {/* Section Compte */}
        <div className="flex flex-col gap-3">
          <Typography variant="caption1" weight="medium" className="text-gray-600">
            Mon Compte
          </Typography>
          <div className="flex flex-col gap-3 pl-2">
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace">Tableau de bord</ActiveLink>
            </Typography>
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=tri-dechets">Trier mes déchets</ActiveLink>
            </Typography>
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=declarer-dechets">Déclarer un déchet</ActiveLink>
            </Typography>
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=mon-impact">Mon impact</ActiveLink>
            </Typography>
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=parametres">Paramètres</ActiveLink>
            </Typography>
          </div>
        </div>

        {/* Section Activités */}
        <div className="flex flex-col gap-3">
          <Typography variant="caption1" weight="medium" className="text-gray-600">
            Activités
          </Typography>
          <div className="flex flex-col gap-3 pl-2">
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=mes-projets">Mes projets</ActiveLink>
            </Typography>
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=statistiques">Statistiques</ActiveLink>
            </Typography>
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=historique">Historique</ActiveLink>
            </Typography>
          </div>
        </div>

        {/* Section Récompenses */}
        <div className="flex flex-col gap-3">
          <Typography variant="caption1" weight="medium" className="text-gray-600">
            Récompenses
          </Typography>
          <div className="flex flex-col gap-3 pl-2">
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=points">Mes points</ActiveLink>
            </Typography>
            <Typography variant="caption2" weight="medium">
              <ActiveLink href="/mon-espace?section=badges">Mes badges</ActiveLink>
            </Typography>
          </div>
        </div>
      </div>

      <Button action={handleLogoutUser} variant="danger">
        Déconnexion
      </Button>
    </Box>
  );
};