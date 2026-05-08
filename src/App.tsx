import "./index.css";
import { Navbar }          from "./components/landing/Navbar";
import { HeroSection }     from "./components/landing/HeroSection";
import { TrustedBySection }from "./components/landing/TrustedBySection";
import { SecuritySection } from "./components/landing/SecuritySection";
import { PillarsSection }  from "./components/landing/PillarsSection";
import { HowItWorksSection } from "./components/landing/HowItWorksSection";
import { DemoPreviewSection } from "./components/landing/DemoPreviewSection";
import { RoadmapSection }  from "./components/landing/RoadmapSection";
import { TeamSection }     from "./components/landing/TeamSection";
import { CTASection }      from "./components/landing/CTASection";
import { Footer }          from "./components/landing/Footer";
import { DocsPage }        from "./components/docs/DocsPage";
import content             from "./content.json";

export function App() {
  const docsRoute = content.routes.docs;
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const isDocsPage = currentPath === docsRoute;

  if (isDocsPage) {
    return <DocsPage />;
  }

  return (
    <div className="min-h-screen bg-[#080810] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <div id="platform"><HeroSection /></div>
        <TrustedBySection />
        <div id="security"><SecuritySection /></div>
        <PillarsSection />
        <HowItWorksSection />
        <DemoPreviewSection />
        <RoadmapSection />
        <TeamSection />
        <div id="waitlist-form"><CTASection /></div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
