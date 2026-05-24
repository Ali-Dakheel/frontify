import { AssistantSection } from "@/components/AssistantSection";
import { DesignSection } from "@/components/DesignSection";
import { EngineSection } from "@/components/EngineSection";
import { GuidelinesSection } from "@/components/GuidelinesSection";
import { HeroToUpload } from "@/components/HeroToUpload";
import { PublishSection } from "@/components/PublishSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { StoriesSection } from "@/components/StoriesSection";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main className="relative w-full">
        {/* Combined hero + partner strip + upload section — single morphing scroll scene */}
        <HeroToUpload />
        <EngineSection />
        <GuidelinesSection />
        <AssistantSection />
        <DesignSection />
        <PublishSection />
        <StoriesSection />
      </main>
      <SiteFooter />
    </>
  );
}
