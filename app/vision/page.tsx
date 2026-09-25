import type { Metadata } from "next";
import { EditorialPage } from "@/components/pages/EditorialPage";

export const metadata: Metadata = { title: "Vision", description: "Vajra Greens' vision for accessible EV charging and a wider clean-energy infrastructure network." };

export default function VisionPage() {
  return <EditorialPage
    eyebrow="04 / OUR DIRECTION"
    title={<>Energy meets<br /><em>what comes next.</em></>}
    introduction="Our vision is to build a reliable and accessible clean-energy infrastructure network that accelerates the adoption of electric mobility."
    image="/media/vajra-station.jpeg"
    imageAlt="Vajra Greens charging station representing the company’s clean-mobility vision"
    detailTitle="Start with charging. Scale with purpose."
    paragraphs={["Vajra Greens began with a focused approach to fast EV charging: make dependable charging available where customers need it and reduce the charging anxiety that slows EV adoption.", "Beyond charging, the company’s stated long-term areas of interest include renewable energy, solar energy, energy infrastructure, clean mobility, energy management, and sustainable transportation solutions. These remain forward-looking areas of development."]}
    points={["2028 goal · 50+ stations and 10+ B2B operators", "2030 goal · 200+ stations and an app platform live", "2032 ambition · 500+ stations and a leading regional CPO position"]}
    nextTitle="Let's build infrastructure for what moves next."
    nextHref="/contact"
    nextLabel="Get in touch"
  />;
}
