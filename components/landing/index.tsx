import { Navbar } from "./navbar";
import { HeroSection } from "./hero-section";
import { ProblemSection } from "./problem-section";
import { WorkflowSection } from "./workflow-section";


export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <ProblemSection />

        <WorkflowSection />
      </main>

    </>
  );
}