import { Breadcrumbs } from "../breadcrumbs/breadcrumbs";
import { Footer } from "../navigation/footer";
import { Navigation } from "../navigation/Navigation";
import { Container } from "../container/container";
import { UserAccountNavigation } from "../navigation/user-account-navigation";
import { Session } from "../session/session";
import { SessionStatusTypes } from "@/types/session-status-types"; 
import { useMemo } from "react";

interface Props {
    children: React.ReactNode;
    isDisplayBreadcrumbs?: boolean;
    withSidebar?: boolean;
    sessionStatus?: SessionStatusTypes;
}

export const Layout = ({ children, isDisplayBreadcrumbs, withSidebar, sessionStatus }: Props) => {
    
    const view = useMemo(() => {
        if (withSidebar) {
            return (
                <Container className="mb-14">
                    <div className="grid grid-cols-12 gap-7">
                        <div className="col-span-3">
                            <UserAccountNavigation />
                        </div>
                        <div className="col-span-9">{children}</div>
                    </div>
                </Container>
            );
        }
        return <>{children}</>;
    }, [withSidebar, children]);

    return (
        <Session sessionStatus={sessionStatus}>
            <div className="min-h-screen flex flex-col">
                <Navigation className="glass-effect sticky top-0 z-50" />
                <main className="flex-grow">
                    {isDisplayBreadcrumbs && (
                        <div className="bg-white/50 border-b">
                            <Breadcrumbs className="py-2 px-4" />
                        </div>
                    )}
                    <div className="animate-fade">{view}</div>
                </main>
                <Footer className="mt-auto" />
            </div>
        </Session>
    );
};
