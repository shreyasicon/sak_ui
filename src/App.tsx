import "./index.css";
import { Navbar }          from "./components/landing/Navbar";
import { HeroSection }     from "./components/landing/HeroSection";
import { TrustedBySection }from "./components/landing/TrustedBySection";
import { SecuritySection } from "./components/landing/SecuritySection";
import { PillarsSection }  from "./components/landing/PillarsSection";
import { RoadmapSection }  from "./components/landing/RoadmapSection";
import { TeamSection }     from "./components/landing/TeamSection";
import { CTASection }      from "./components/landing/CTASection";
import { Footer }          from "./components/landing/Footer";

export function App() {
  return (
    <div className="min-h-screen bg-[#070c07] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <SecuritySection />
        <PillarsSection />
        <RoadmapSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
