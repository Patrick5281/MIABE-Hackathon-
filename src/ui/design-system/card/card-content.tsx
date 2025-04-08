import { cn } from "@/lib/utils";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}; 