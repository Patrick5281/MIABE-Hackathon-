import { IconProps } from "@/types/iconProps";
import clsx from "clsx";
import { Spinner } from "../spinner/spinner";
import { LinkTypes } from "@/lib/link-type";
import Link from "next/link";

interface Props {
  size?: "small" | "medium" | "large";
  variant?: "accent" | "secondary" | "outLine" | "disabled" | "ico" | "sucess" | "danger";
  icon?: IconProps;
  iconTheme?: "accent" | "secondary" | "gray";
  iconPosition?: "left" | "right";
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode; // Rendu optionnel pour le cas `ico`
  baseUrl?: string;
  linkTypes?: string;
  action?: () => void;
  type?: "button" | "submit";
  fullwith? : boolean ;
}

export const Button = ({
  size = "medium",
  variant = "accent",
  icon,
  iconTheme = "accent",
  iconPosition = "right",
  disabled = false,
  isLoading = false,
  children,
  baseUrl,
  linkTypes = "internal",
  type = "button",
  fullwith = false ,
  action = () => {},
}: Props) => {
  let variantStyles = "";
  let sizeStyles = "";
  let icoSize = 0;

  // Gestion des variantes
  switch (variant) {
    case "accent":
      variantStyles = "bg-primary hover:bg-primary-400 text-white rounded";
      break;
    case "secondary":
      variantStyles = "bg-primary-200 hover:bg-primary-300/50 text-primary rounded";
      break;
    case "outLine":
      variantStyles = "bg-white hover:bg-gray-400/50 border border-gray-500 text-gray-900 rounded";
      break;
    case "disabled":
      variantStyles = "bg-gray-400 border border-gray-500 text-gray-600 rounded cursor-not-allowed";
      break; 
    case "sucess":
      variantStyles = "bg-secondary horder: bg-secondary-400 text-white rounded";
       break;
       case "danger":
      variantStyles = "bg-alert-danger horder: bg-alert-danger/700 text-white rounded";
       break;
    case "ico":
      variantStyles = clsx(
        iconTheme === "accent" && "bg-primary hover:bg-primary-400 text-white rounded-full",
        iconTheme === "secondary" && "bg-primary-200 hover:bg-primary-300/50 text-primary rounded-full",
        iconTheme === "gray" && "bg-gray-800 hover:bg-gray-600 text-white rounded-full"
      );
  }

  // Gestion des tailles
  switch (size) {
    case "small":
      sizeStyles = `text-caption3 font-medium ${
        variant === "ico" ? "flex items-center justify-center w-[40px] h-[40px]" : "px-[14px] py-[12px]"
      }`;
      icoSize = 18;
      break;
    case "medium":
      sizeStyles = `text-caption2 font-medium ${
        variant === "ico" ? "flex items-center justify-center w-[50px] h-[50px]" : "px-[18px] py-[15px]"
      }`;
      icoSize = 20;
      break;
    case "large":
      sizeStyles = `text-caption1 font-medium ${
        variant === "ico" ? "flex items-center justify-center w-[60px] h-[60px]" : "px-[22px] py-[18px]"
      }`;
      icoSize = 24;
      break;
  }

  const buttonContent = (
    <>
      {/* Affichage du Spinner si en cours de chargement */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          {variant === "accent" || variant === "ico" ? (
            <Spinner size="small" variant="white" />
          ) : (
            <Spinner size="small" />
          )}
        </div>
      )}

      {/* Contenu principal */}
      <div className={clsx(isLoading && "invisible")}>
        {icon && variant === "ico" ? (
          <icon.icon size={icoSize} />
        ) : (
          <div className={clsx(icon && "flex items-center gap-1")}>
            {icon && iconPosition === "left" && <icon.icon size={icoSize} />}
            {children}
            {icon && iconPosition === "right" && <icon.icon size={icoSize} />}
          </div>
        )}
      </div>
    </>
  );

  const handleClick = () => {
    if (action) {
      action();
    }
  };

  const buttonElement = (
    <button
      type={type}     
       className={clsx(variantStyles, sizeStyles, isLoading && "cursor-not-allowed", "relative animate", fullwith && "w-full")}
      onClick={handleClick}
      disabled={disabled || isLoading ? true : false}
    >
      {buttonContent}
    </button>
  );

  if (baseUrl) {
    if (linkTypes === LinkTypes.EXTERNAL) {
      return (
        <a href={baseUrl} target="_blank" rel="noopener noreferrer">
          {buttonElement}
        </a>
      );
    } else {
      return (
        <Link href={baseUrl}>
          {buttonElement}
        </Link>
      );
    }
  }

  return buttonElement;
};
