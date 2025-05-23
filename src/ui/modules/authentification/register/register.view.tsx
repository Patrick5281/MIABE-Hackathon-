import { Container } from "@/ui/components/container/container";
import { Box } from "@/ui/design-system/box/box";
import { Typography } from "@/ui/design-system/typography/typography";
import Image from "next/image";
import Link from "next/link";
import { Registerform } from "./register.form";
import { FormsType } from "@/types/forms";


interface Props {
    form: FormsType;
}

export const RegisterView = ({ form }: Props) => {
    return (
        <Container className="grid grid-cols-2 gap-2 mb-24">
            <div>
                <div className="relative w-full h-[531px]">
                    <Image
                        fill
                        src="/assets/images/character-1.png"
                        alt="Description de l'illustration"
                        className="object-scale-down"
                    />
                </div>
            </div>

            <div className="flex items-center">
                <Box padding_y = "py-5">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" component="h1">
                            Inscription
                        </Typography>

                        <div className="flex items-center gap-2">
                        <Typography variant="caption4" component="span" theme="gray">
                            Tu as déjà un compte ?
                        </Typography>
                        <Typography variant="caption4" component="span" theme="primary">
                            <Link href="/connexion">Connexion</Link>
                        </Typography>
                    </div>

                    </div>

                  <Registerform form={form}/> 
                <Typography
                    variant="caption4"
                    theme="gray"
                    className="max-w-md mx-auto space-y-1 text-center"
                    >
                    <div>En t'inscrivant, tu acceptes les</div>
                    <div>
                        <Link href="/" className="text-gray">
                        Conditions d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/" className="text-gray">
                        Politique de confidentialité
                        </Link>
                    </div>
                </Typography>

                </Box>
            </div>
        </Container>
    );
};
