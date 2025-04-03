import { CallToActionView } from "@/ui/design-system/call-to-action.view/call-to-action.view";
import { CodersMonkeysSlackView } from "./coders-monkeys-slack.view/coders-monkeys-slack.view";
import { CurrentCourseCtaView } from "./current-course-cta.view/current-course-cta.view";
import { FeaturedView } from "./featured/featured.view";
import { HeroTopView } from "./hero-top/hero-top.view";
import { HighlightListview } from "./highlight-list/highlight-list.view";

 export const LandingPageView = () => {
    return <> 
   <HeroTopView />
   <FeaturedView />
    <CodersMonkeysSlackView />
    <CurrentCourseCtaView />
    <HighlightListview />
    <CallToActionView />
    </>;
 }