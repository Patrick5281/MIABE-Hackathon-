import clsx from "clsx";
import Image from "next/image";
interface Props {
	size?: "small" | "medium" | "large" | "extra-large";
	src: string;
	alt: string;
}

export const Avatar = ({ size = "medium", src, alt }: Props) => {
	let sizeStyles: string ;

	switch (size) {
		case "small":
			sizeStyles = "w-16 h-16"; // Petite taille (valide)
			break;
		case "medium":
			sizeStyles = "w-20 h-20"; // Taille moyenne (valide)
			break;
		case "large":
			sizeStyles = "w-24 h-24"; // Grande taille (valide)
			break;
		case "extra-large":
			sizeStyles = "w-130 h-130"; // Tres Grande taille (valide)
			break;
	}


	return (
	<div  className={clsx(sizeStyles,"bg-gray-600 rounded-full relative")}>
		<Image
		fill
	src= {src ? src:"/assets/svg/barrel.svg"}
	alt= {alt}
	className="object-cover object-center rounded-full"
	/>
	</div>
		

	);
};
