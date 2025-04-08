import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { Button } from "@/ui/design-system/button/button";

export const HeroTopView = () => {
  return (
    <Container className="flex justify-between items-center py-8 px-6 sm:px-12 md:px-20">
      <div className="flex flex-col max-w-xl space-y-8">
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


      {/* Image Section */}
      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
        <Image
          src="/assets/images/img1.png" // Replace with your image path or URL
          alt="Waste Pickup illustration"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </Container>
  );
};

