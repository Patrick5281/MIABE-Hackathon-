import { Container } from "@/ui/components/container/container";
import { SocialNetworksButtons } from "@/ui/components/navigation/social-networks-buttons";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

interface FeaturesListInterface {
    imagePath: string;
    imageAlt: string;
    title: string;
    description: string;
}

const featureData: FeaturesListInterface[] = [
    {
        imagePath: "assets/svg/diskette.svg",
        imageAlt: "Illustration",
        title: "Ressources",
        description: "Consulte et partage les ressources pour les devs",
    },
    {
        imagePath: "assets/svg/joystick.svg",
        imageAlt: "Illustration",
        title: "Entrainement",
        description: "Entraîne-toi à devenir meilleur et trouve de l'inspiration",
    },
    {
        imagePath: "assets/svg/loudspeaker.svg",
        imageAlt: "Illustration",
        title: "Visibilité",
        description: "Expose tes projets et crée-toi des opportunités",
    },
    {
        imagePath: "assets/svg/compass.svg",
        imageAlt: "Illustration",
        title: "Relation",
        description: "Connecte-toi avec des devs web et booste ta carrière !",
    },
];

export const FeaturedView = () => {
    const featuredList = featureData.map((feature) => (
        <div
            key={uuidv4()}
            className="flex flex-col items-center justify-center bg-white rounded p-7"
        >
            <div className="relative w-[130px] h-[130px] rounded-full mb-6 p-10 bg-gray-400 overflow-hidden">
            <Image
             fill src={feature.imagePath}
             alt={feature.imageAlt}
              className="object-scale-down blur-2xl"
             />
              <Image
             fill src={feature.imagePath}
             alt={feature.imageAlt}
              className="object-scale-down"
             />
            </div>
            <Typography variant="lead" component="h3" weight="medium">
                {feature.title}
            </Typography>
            <p className="text-center text-gray-600 mt-2">{feature.description}</p>
        </div>
    ));

    return (
        <div className="bg-gray-300 py-24">
            <Container className="grid grid-cols-12 gap-24">
                <div className="grid grid-cols-2 col-span-7 gap-7">{featuredList}</div>
                <div className="flex flex-col justify-between col-span-5 gap-10">
                    <div>
                        <Typography variant="h2" component="h2" className="mb-5">
                            L'endroit le plus cool pour devenir développeur ! 
                        </Typography>
                        <Typography variant="body-lg" theme="gray" component="p" className="mb-8">
                            L'endroit le plus cool pour devenir développeur ! 
                        </Typography>
                        <Button variant="secondary" baseUrl="/@" icon={{icon: RiArrowRightLine}} iconPosition="right">
                            Commencer
                        </Button>
                    </div>
                    <div>
                    <Typography variant="caption3" component="div" className="mb-4">
                            Nos réseaux sociaux
                        </Typography> 
                        <SocialNetworksButtons />
                    </div>
                </div>
            </Container>
        </div>
    );
};
