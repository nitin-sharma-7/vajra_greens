import type { Metadata } from "next";
import { EditorialPage } from "@/components/pages/EditorialPage";

export const metadata: Metadata = { title: "Partnerships", description: "Explore EV charging partnerships for fleets, commercial locations, and infrastructure opportunities with Vajra Greens." };

export default function PartnershipsPage() {
  return <EditorialPage
    eyebrow="03 / PARTNERSHIPS"
    title={<>The next network<br /><em>is built together.</em></>}
    introduction="Vajra Greens works with fleet operators, businesses, property owners, and public-sector opportunities to create charging solutions that fit real operating patterns and location economics."
    image="/media/vajra-station.jpeg"
    imageAlt="Real Vajra Greens EV charging station and vehicle in New Delhi"
    detailTitle="A shared reason to move."
    paragraphs={["The network is designed for cab and taxi fleets, logistics and delivery fleets, corporate mobility, commercial passenger vehicles, business-owned EVs, private owners, daily commuters, and intercity travellers.", "Commercial arrangements can include charger supply and installation, recurring operations and maintenance, per-unit customer charging, dedicated fleet solutions, and customised terms for high-frequency users. Every proposal remains subject to location feasibility and partner requirements."]}
    points={["Fleet, logistics, ride-hailing, and corporate mobility operators", "Commercial, residential, hospitality, and high-demand location partners", "Infrastructure rollout and public-sector opportunities"]}
    nextTitle="Have a location, a fleet, or a project in mind?"
    nextHref="/contact"
    nextLabel="Start a conversation"
  />;
}
