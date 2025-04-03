import { Container } from "@/ui/components/container/container";
import { Button } from "@/ui/design-system/button/button";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";

export const HeroTopView = () => {
    return (
        <Container className="relative pt-40 overflow-hidden pb-52">
            <div className="w-full max-w-2xl space-y-5">
                <Typography variant="h1" component="h1" className="max-w-lg">
                    Rejoint les singes codeurs
                </Typography>
                <Typography variant="body-lg" theme="gray" component="p" className="max-w-lg">
                    Ici, on se prend pas la tete mais on code comme des betes !
                    Rejoint notre tribut de singes codeurs, partage tes projets
                    les plus fous et fait-toi de nouveau amis developpeurs.
                </Typography>
                <div className="space-x-5 pt-2.5">
                    <Button baseUrl="/">Commencer</Button>  
                    <Button baseUrl="/" variant="secondary">En savoir plus</Button>
                </div>
            </div> 
            <Image 
                src = "assets/svg/rocket.svg"
                alt = "fusée illustrant les performance d'un développeur"
                width={811}
                height={596}
                className="absolute top-0 right-0 z-0"
            />
        </Container>
    );
};
