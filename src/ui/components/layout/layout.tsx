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
            <Navigation /> 
            {isDisplayBreadcrumbs && <Breadcrumbs />}
            {view}
            <Footer />
        </Session>
    );
};
