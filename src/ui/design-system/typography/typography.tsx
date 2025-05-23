import clsx from "clsx";

interface Props {
	variant?:
		| "display"
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "lead"
		| "body-lg"
		| "body-base"
		| "body-sm"
		| "caption1"
		| "caption2"
		| "caption3"
		| "caption4";
    component?: "h1"|"h2"|"h3"|"h4"|"h5"|"div"|"p"|"span";
	theme?:"black"| "gray"| "gray-600" | "white" |  "pink" | "primary" | "secondary" | "danger" | "sucess" | "warning"; 
	weight?: "regular" | "medium" ;
	className?: string;
    children:React.ReactNode;
}

export const Typography = ({
	variant = "h3", 
	component: Component = "div",
	theme = "black",
	weight = "regular",
	className,
	children
}: Props) => {

	let variantStyles: string = "";
	let ColorStyles: string   = "";


	switch (variant) {
		case "display":
			variantStyles = "text-8xl";
			break;
		case "h1":
			variantStyles = "text-7xl"
			break;	
		case "h2":
			variantStyles = "text-6xl"
			break;	
		case "h3": /*Valeur par défaut de la catégorie Style.*/
			variantStyles = "text-5xl"
			break;
		case "h4":
			variantStyles = "text-4xl"
		break;
		case "h5":
			variantStyles = "text-3xl"
		break;
		case "lead":
			variantStyles = "text-2xl"
		break;
		case "body-lg":
			variantStyles = "text-lg"
		break;
		case "body-base":
			variantStyles = "text-base"
		break;
		case "body-sm":
			variantStyles = "text-sm"
		break;			
		case "caption1":
			variantStyles = "text-caption1"
		break;			
		case "caption2":
			variantStyles = "text-caption2"
		break;			
		case "caption3":
			variantStyles = "text-caption3"
		break;			
		case "caption4":
			variantStyles = "text-caption4"
		break;			
				
	}

	switch (theme) {
		case "black": /*Valeur par défaut de la catégorie Couleur.*/
			ColorStyles = "text-gray";
			break;
		case "gray": 
			ColorStyles = "text-gray-700";
			break;
		case "gray": 
			ColorStyles = "text-gray-600";
			break;
		case "white": 
			ColorStyles = "text-white";
			break;
		case "pink": 
			ColorStyles = "text-pink";
			break;
		case "primary": 
			ColorStyles = "text-primary";
			break;
		case "secondary":
			ColorStyles = "text-secondary";
			break;
		case "danger":
			ColorStyles = "text-alert-danger";
			break;
		case "sucess":
			ColorStyles = "text-alert-sucess";
			break;	
		case "warning":
			ColorStyles = "text-alert-warning";
			break;		
			
	}

	return <Component className={clsx(variantStyles, ColorStyles, weight == "medium" && "font-medium", className,)}>


			{children}
		
		</Component>;

	 
};
