import { useState } from "react";
import { Box } from "@/ui/design-system/box/box";
import { UserAccountNavigation } from "@/ui/components/navigation/user-account-navigation";
import { Typography } from "@/ui/design-system/typography/typography";
import { useRouter } from "next/router";
import TriDechets from "./tri-dechets";

export default function MonEspace() {
  const router = useRouter();
  const { section } = router.query;

  const renderContent = () => {
    switch (section) {
      case "tri-dechets":
        return <TriDechets />;
      case "mon-impact":
        return <MonImpact />;
      case "recompenses":
        return <Recompenses />;
      case "statistiques":
        return <Statistiques />;
      case "collecte-dechets":
        return <CollecteDechets />;
      case "historique":
        return <Historique />;
      default:
        return <TableauDeBord />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Typography variant="h1" className="mb-8">
          Mon Espace
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <UserAccountNavigation />
          </div>
          <div className="md:col-span-3">
            <Box>{renderContent()}</Box>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composants temporaires pour les différentes sections
const TableauDeBord = () => (
  <div>
    <Typography variant="h2">Tableau de bord</Typography>
    <p>Bienvenue sur votre tableau de bord</p>
  </div>
);

const MonImpact = () => (
  <div>
    <Typography variant="h2">Mon Impact</Typography>
    <p>Visualisez votre impact environnemental</p>
  </div>
);

const Recompenses = () => (
  <div>
    <Typography variant="h2">Récompenses</Typography>
    <p>Découvrez vos récompenses</p>
  </div>
);

const Statistiques = () => (
  <div>
    <Typography variant="h2">Statistiques</Typography>
    <p>Consultez vos statistiques</p>
  </div>
);

const CollecteDechets = () => (
  <div>
    <Typography variant="h2">Collecte des Déchets</Typography>
    <p>Gérez vos collectes de déchets</p>
  </div>
);

const Historique = () => (
  <div>
    <Typography variant="h2">Historique</Typography>
    <p>Consultez votre historique</p>
  </div>
);
