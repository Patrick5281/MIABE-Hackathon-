import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from 'clsx';

export const UserAccountNavigation = () => {
  const router = useRouter();
  const { section } = router.query;

  const menuItems = [
    { label: "Tableau de bord", href: "/mon-espace" },
    { label: "Tri des déchets", href: "/mon-espace?section=tri-dechets" },
    { label: "Déclarer des déchets", href: "/mon-espace?section=declarer-dechets" },
    { label: "Mon impact", href: "/mon-espace?section=mon-impact" },
    { label: "Statistiques", href: "/mon-espace?section=statistiques" },
    { label: "Paramètres", href: "/mon-espace?section=parametres" },
  ];

  return (
    <nav className="space-y-1">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={item.href}
            className={clsx(
              "block px-4 py-3 rounded-lg transition-all duration-200",
              item.href.includes(section as string) || (!section && item.href === "/mon-espace")
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            )}
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};