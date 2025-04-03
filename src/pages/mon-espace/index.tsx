import { Seo } from "@/ui/components/seo/seo";
import { Layout } from "@/ui/components/layout/layout";
import { UserAcountContainer } from "@/ui/modules/user-profile/user-account/user-account.container";
import { REGISTERED } from "@/lib/session-status";

export default function Connexion() {
    return (
        <> 
            <Seo title="Mon espace" description="description de la page..." />
            <Layout withSidebar sessionStatus={REGISTERED}>
                <UserAcountContainer />
            </Layout>
        </>
    );
}
