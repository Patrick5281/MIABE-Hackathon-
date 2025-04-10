import { useState } from "react";
import { Box } from "@/ui/design-system/box/box";
import { UserAccountNavigation } from "@/ui/components/navigation/user-account-navigation";
import { Typography } from "@/ui/design-system/typography/typography";
import { useRouter } from "next/router";
import TriDechets from "./tri-dechets";
import { DashboardContainer } from "@/ui/modules/particulier/dashboard/dashboard.container";
import { WasteDeclaration } from "@/ui/modules/waste-declaration/waste-declaration";

export default function MonEspace() {
  const router = useRouter();
  const { section } = router.query;

  const renderContent = () => {
    switch (section) {
      case "tri-dechets":
        return <TriDechets />;
      case "declarer-dechets":
        return <WasteDeclaration />;
      case "mon-impact":
        return <MonImpact />;
      case "statistiques":
        return <Statistiques />;
      case "parametres":
        return <Parametres />;
      case "historique":
        return <Historique />;
      default:
        return <DashboardContainer />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Typography variant="h1" className="mb-8">
          Mon Espace
        </Typography>
        <div className="flex">
          <div className="w-64 fixed h-[calc(100vh-96px)] overflow-y-auto bg-white shadow-lg">
            <UserAccountNavigation />
          </div>
          <div className="flex-1 ml-64 p-6">
            <Box>{renderContent()}</Box>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composants temporaires pour les différentes sections
const MonImpact = () => (
  <div>
    <Typography variant="h2">Mon Impact</Typography>
    <p>Visualisez votre impact environnemental</p>
  </div>
);

const Statistiques = () => (
  <div>
    <Typography variant="h2">Statistiques</Typography>
    <p>Consultez vos statistiques</p>
  </div>
);

const Parametres = () => (
  <div>
    <Typography variant="h2">Paramètres</Typography>
    <p>Gérez vos paramètres</p>
  </div>
);

const Historique = () => (
  <div>
    <Typography variant="h2">Historique</Typography>
    <p>Consultez votre historique</p>
  </div>
);