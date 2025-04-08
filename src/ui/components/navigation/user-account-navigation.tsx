import { useState } from "react";
import { firebaseLogOutUser } from "@/api/authentication";
import { toast } from "react-toastify";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import { ActiveLink } from "./active-link";
import { Box } from "@/ui/design-system/box/box";
import { FiLogOut } from "react-icons/fi"; // Icône LogOut
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // Icône menu hamburger
import Image from "next/image"; // Assurez-vous d'utiliser Next.js Image pour optimiser les images

// Composant Sidebar
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-green-800 text-white h-screen p-6 w-64 transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"}`}
      >
        <div className="flex flex-col space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white">
              {/* Logo */}
              <Image
                src="/path-to-your-logo.svg" // Remplacer par ton logo
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
            {isOpen && <h2 className="text-lg font-semibold">Waste Solutions</h2>}
          </div>

          {/* Menu Hamburger Icon */}
          <div
            className="text-white cursor-pointer md:hidden"
            onClick={toggleSidebar}
          >
            <HiOutlineMenuAlt3 size={28} />
          </div>

          {/* Sidebar Menu */}
          <div className="space-y-4">
            <ul>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <span>Dashboard</span>
              </li>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <span>Collection Points</span>
              </li>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <span>Donations</span>
              </li>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <span>Users</span>
              </li>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <span>Analytics</span>
              </li>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <span>Partnerships</span>
              </li>
            </ul>
          </div>

          {/* Settings and LogOut */}
          <div className="mt-auto space-y-6">
            <ul>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <span>Settings</span>
              </li>
              <li className="hover:bg-green-700 p-3 rounded-md cursor-pointer">
                <FiLogOut size={20} />
                {isOpen && <span className="ml-3">Log Out</span>}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <UserAccountNavigation />
      </div>
    </div>
  );
};

// Composant UserAccountNavigation
export const UserAccountNavigation = () => {
  const handleLogoutUser = async () => {
    const { error } = await firebaseLogOutUser();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("A bientôt sur Waste Solutions");
  };

  return (
    <Box className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Typography variant="caption2" weight="medium">
          <ActiveLink href="/mon-espace">Mon Compte</ActiveLink>
        </Typography>
        <Typography variant="caption2" weight="medium">
          <ActiveLink href="/mon-compte/mes-projets">Mes projets</ActiveLink>
        </Typography>
      </div>
      <Button action={handleLogoutUser} variant="danger">
        Déconnexion
      </Button>
    </Box>
  );
};

export default Sidebar;
