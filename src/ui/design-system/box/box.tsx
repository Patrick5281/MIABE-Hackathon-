
import { motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Box = ({ children, className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={clsx("bg-white rounded-lg p-8 shadow-lg", className)}
    >
      {children}
    </motion.div>
  );
};
