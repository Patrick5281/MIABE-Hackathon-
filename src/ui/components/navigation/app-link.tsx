import { AppLinks } from "@/types/app-links";
import { RiLinkedinFill, RiSlackFill, RiYoutubeFill } from "react-icons/ri";

const footerApplicationLinks: AppLinks[] = [
    {
        label: "Accueil",
        baseUrl: "/",
        type:"internal",
    },
    {
        label: "Projets",
        baseUrl: "/#",
        type:"internal",
    },
    {
        label: "Coders Monkeys",
        baseUrl: "/#",
        type:"internal",
    },
    {
        label: "Formation",
        baseUrl: "/#",
        type:"internal",
    },
];
const footerUsersLinks: AppLinks[] = [
    {
        label: "Mon Espace",
        baseUrl: "/@",
        type:"internal",
    },
    {
        label: "Connexion",
        baseUrl: "/connexion",
        type:"internal",
    },
    {
        label: "Inscription",
        baseUrl: "/connexion/inscription",
        type:"internal",
    },
    {
        label: "Mots de passe oublié",
        baseUrl: "/connexion/mots-de-passe",
        type:"internal",
    },
];
const footerInformationsLinks: AppLinks[] = [
    {
        label: "CGU",
        baseUrl: "/@",
        type:"internal",
    },
    {
        label: "Confidentialité",
        baseUrl: "/@",
        type:"internal",
    },
    {
        label: "A propos",
        baseUrl: "/@",
        type:"internal",
    },
    {
        label: "Contact",
        baseUrl: "/@",
        type:"internal",
    },
];
export const footerSocialNetworksLinks: AppLinks[] = [
    {
        label: "Youtube",
        baseUrl: "/@",
        type:"external",
        icon: RiYoutubeFill,
    },
    {
        label: "Linkedin",
        baseUrl: "/@",
        type:"external",
        icon: RiLinkedinFill,
    },
    {
        label: "Slack",
        baseUrl: "/@",
        type:"external",
        icon: RiSlackFill,
    },
   
];

export const footerLinks = [
    {
        label: "App",
        links: footerApplicationLinks,
    },
    {
        label: "Users",
        links: footerUsersLinks,
    },
    {
        label: "Informations",
        links: footerInformationsLinks,
    },
    {
        label: "SocialNetwork",
        links: footerSocialNetworksLinks,
    },
];
