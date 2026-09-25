import type { Metadata } from "next";
import { EditorialPage } from "@/components/pages/EditorialPage";

export const metadata: Metadata = { title: "Network & Operations", description: "A connected approach to EV charger locations, software integration, monitoring, and operations." };

export default function NetworkPage() {
  return <EditorialPage
    eyebrow="02 / NETWORK & OPERATIONS"
    title={<>An energy network<br /><em>takes intention.</em></>}
    introduction="The best charging location is more than a dot on a map. It is a place where vehicle demand, access, parking, grid feasibility, and a workable commercial model meet."
    image="/media/vajra-station.jpeg"
    imageAlt="Vajra Greens charging station at an active site in New Delhi"
    detailTitle="From site to system."
    paragraphs={["Potential locations include highways, commercial complexes, malls, hotels, restaurants, fuel stations, business parks, corporate campuses, residential and commercial developments, transport hubs, and fleet parking areas. Each opportunity is assessed for demand, access, traffic, parking, grid feasibility, and commercial potential.", "StatiQ is identified as Vajra Greens’ software partner. The technology ecosystem supports charger monitoring, charging sessions, customer access, transaction management, station visibility, operational monitoring, and usage and performance data."]}
    points={["Location identification, demand analysis, and feasibility", "Hardware connected to the StatiQ software ecosystem", "Real-time monitoring, maintenance, and operating visibility"]}
    nextTitle="The strongest networks grow through the right relationships."
    nextHref="/partnerships"
    nextLabel="Explore partnerships"
  />;
}
