import { HomeHero } from "@/components/home/HomeHero";
import { ProblemNetwork } from "@/components/home/ProblemNetwork";
import { Infrastructure } from "@/components/home/Infrastructure";
import { OperatingModel } from "@/components/home/OperatingModel";
import { FutureRoadmap } from "@/components/home/FutureRoadmap";

export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
      <ProblemNetwork />
      <Infrastructure />
      <OperatingModel />
      <FutureRoadmap />
    </main>
  );
}
