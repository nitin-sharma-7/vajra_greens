import type { Metadata } from "next";
import { EditorialPage } from "@/components/pages/EditorialPage";

export const metadata: Metadata = { title: "Charging Infrastructure", description: "Fast EV charging infrastructure developed around site demand, accessible locations, and dependable operations." };

export default function ChargingPage() {
  return <EditorialPage
    eyebrow="01 / CHARGING INFRASTRUCTURE"
    title={<>The charge<br /><em>behind the journey.</em></>}
    introduction="Vajra Greens develops, installs, and operates EV charging infrastructure for public, commercial, and residential use. Every installation begins with site demand and the vehicles it needs to serve."
    image="/media/vajra-station.jpeg"
    imageAlt="A vehicle charging at a Vajra Greens station"
    detailTitle="Practical from the first connection."
    paragraphs={["Fast DC charging is the initial operating focus, with AC and DC charger supply and installation available for commercial and residential applications. Charger configuration is matched to expected vehicle mix, charging demand, grid feasibility, safety, and site requirements.", "The end-to-end scope can cover location identification, feasibility, charger selection, installation, software integration, station operations, customer charging, monitoring, maintenance, and business optimisation."]}
    points={["Charging hardware from established suppliers including Delta Electronics and Exicom", "Configurations selected for speed, compatibility, safety, reliability, and demand", "A per-unit charging model designed for practical, commercially viable use"]}
    nextTitle="A station is only as useful as the network around it."
    nextHref="/network"
    nextLabel="Explore the network"
  />;
}
