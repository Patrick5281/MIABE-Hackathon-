import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/design-system/typography/typography";
import { RiArrowRightLine, RiCheckboxCircleLine } from "react-icons/ri";
import Image from "next/image";
import React from "react";
import { Button } from "@/ui/design-system/button/button";

export const HighlightListview = () => {
    return (
        <Container className="py-24 space-y-10">
            <div className="flex justify-center gap-24">
                <div className="w-[520px] h-[350px] relative mt-10">
                    <Image fill src="/assets/images/49577.jpg" alt="illustration" />
                </div>
                <div className="max-w-md space-y-7">
                    <Typography variant="h3" component="h2">
                        De novice à développeur en un clin d'œil
                    </Typography>
                    <div className="space-y-3">
                        <ListPoint>Progresse rapidement</ListPoint>
                        <ListPoint>Inspire-toi</ListPoint>
                        <ListPoint>Gagne de l'assurance</ListPoint>
                    </div>
                    <div className="relative inline-block">
                        <Button baseUrl="/#"icon={{icon: RiArrowRightLine}} iconPosition="right">
                        Let's go !
                        </Button>
                        <Image width={25} height={27} src="/assets/svg/cursor.svg" alt="une image..." className="absolute right-7 bottom-5"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse justify-center gap-24">
                <div className="w-[520px] h-[350px] relative mt-10 gap-24" >
                    <Image fill src="/assets/images/recompense.jpg" alt="illustration" />
                </div>
                <div className="max-w-md space-y-7">
                    <Typography variant="h3" component="h2">
                        De novice à développeur en un clin d'œil
                    </Typography>
                    <div className="space-y-3">
                        <ListPoint>Progresse rapidement</ListPoint>
                        <ListPoint>Inspire-toi</ListPoint>
                        <ListPoint>Gagne de l'assurance</ListPoint>
                    </div>
                    <div className="relative inline-block">
                        <Button baseUrl="/#"icon={{icon: RiArrowRightLine}} iconPosition="right">
                        Let's go !
                        </Button>
                        <Image width={25} height={27} src="/assets/svg/cursor.svg" alt="..." className="absolute right-7 bottom-5"/>
                    </div>
                </div>
            </div>
        </Container>
    );
};

interface Props {
    children: React.ReactNode;
}

const ListPoint = ({ children }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <RiCheckboxCircleLine size={24} className="mt-1 text-secondary" />
            <Typography variant="body-lg" component="span">
                {children}
            </Typography>
        </div>
    );
};
