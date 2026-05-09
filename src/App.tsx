import "./index.css";
import { Navbar }             from "./components/landing/Navbar";
import HeroScene              from "./components/HeroScene";
import { TrustLogosSection }  from "./components/landing/TrustLogosSection";
import { IncidentSection }    from "./components/landing/IncidentSection";
import { StackSection }       from "./components/landing/StackSection";
import { ComparisonSection }  from "./components/landing/ComparisonSection";
import { PillarsSection }     from "./components/landing/PillarsSection";
import { DemoSection }        from "./components/landing/DemoSection";
import { RoadmapSection }     from "./components/landing/RoadmapSection";
import { TeamSection }        from "./components/landing/TeamSection";
import { WaitlistSection }    from "./components/landing/WaitlistSection";
import { Footer }             from "./components/landing/Footer";
import { DocsPage }           from "./components/docs/DocsPage";
import content                from "./content.json";

export function App() {
  const docsRoute  = content.routes.docs;
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const isDocsPage  = currentPath === docsRoute;

  if (isDocsPage) return <DocsPage />;

  return (
    <div className="min-h-screen bg-[#080810] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroScene />
        <IncidentSection />
        <TrustLogosSection />
        <StackSection />
        <ComparisonSection />
        <PillarsSection />
        <DemoSection />
        <RoadmapSection />
        <TeamSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
