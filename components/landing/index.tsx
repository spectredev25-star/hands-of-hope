import { HeroSection } from "./hero-section";
import { ProblemSection } from "./problem-section";
import { WorkflowSection } from "./workflow-section";
import  AudienceSection  from "./audience-section";
import  TrustSection  from "./trust-section";
import Footer from "./footer";

export default function LandingPage() {
  return (
    <>
      <main>
        <HeroSection />

        <ProblemSection />

        <WorkflowSection />

        <AudienceSection />

        <TrustSection />
      </main>
    <Footer />
    </>
  );
}