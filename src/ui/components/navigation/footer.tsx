import { Typography } from "@/ui/design-system/typography/typography";
import { Container } from "../container/container";
import Image from "next/image";
import { footerLinks } from "./app-link"; // Importez footerApplicationLinks
import { v4 as uuidv4 } from "uuid";
import { ActiveLink } from "./active-link";
import { FooterLinks } from "@/types/app-links";
import { LinkTypes } from "@/lib/link-type";
import { SocialNetworksButtons } from "./social-networks-buttons";


export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerNavigationList = footerLinks.map((colonnLinks) => (

        <FooterLink key={uuidv4()} data={colonnLinks}/>

    ));

    return (
        <div className="py-8 bg-green">
            <Container className="flex justify-between pt-16">
                <div className="flex flex-col items-center gap-1">
                <a href="https://youtube.com/@remontemonkey" target="_blank">
                        <Image
                            src="assets/images/Logo.png"
                            width={229}
                            height={216}
                            alt="Remote Monkets | Youtube"
                        />
                    </a>
                   
                </div>
                <div className="flex gap-7">
                    {footerNavigationList}
                </div>
            </Container>
            <Container className="pt-9 pb-9 space-y-11">
                <hr className="text-gray-800" />
                <div className="flex items-center justify-between">
                        <Typography variant="caption4" theme="gray">
                            {`copywrite @ ${currentYear} | Propulsed by `}
                            <a href="" target="_blank" className="underline">
                                Patrick HOUNTON
                            </a>
                            {" - Remonte monket SASU"}
                        </Typography>
                    <div className="">
                        <SocialNetworksButtons theme="gray"/>
                    </div>
                </div>
            </Container>
        </div>
    );
};

interface footerLinkProps {
  data: FooterLinks;
}


export const FooterLink = ({data}: footerLinkProps) => {
    const LinksList = data.links.map((link) => (
        <div key={uuidv4()} className="footer-link">
            {link.type === LinkTypes.INTERNAL && (
                <ActiveLink href={link.baseUrl}>
                   {link.label}
                </ActiveLink>
            )}
            {link.type === LinkTypes.EXTERNAL && (
                <a
                    href={link.baseUrl}
                    target="_blank"
                >
                    {link.label}
                </a>
            )}
        </div>
    ));

    return (
        <div className="min-w-[190px]">
            <Typography theme="white" variant="caption2" weight="medium" className="pb-5">
                {data.label}
            </Typography>

            <Typography theme="gray" variant="caption3" className="space-y-5">
                {LinksList}
            </Typography>
        </div>
    );
};
