import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { ScrollSystem } from "@/components/motion/ScrollSystem";

const manrope = localFont({ src: "../assets/fonts/manrope-latin-variable.woff2", variable: "--font-manrope", weight: "200 800", display: "swap" });
const instrument = localFont({ src: [
  { path: "../assets/fonts/instrument-serif-normal.woff2", style: "normal", weight: "400" },
  { path: "../assets/fonts/instrument-serif-italic.woff2", style: "italic", weight: "400" },
], variable: "--font-instrument", display: "swap" });
const mono = localFont({ src: "../assets/fonts/ibm-plex-mono.woff2", variable: "--font-mono", weight: "400", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: {
    default: "Vajra Greens — Energy Meets Mobility",
    template: "%s — Vajra Greens",
  },
  description:
    "Vajra Greens develops and operates EV charging infrastructure built around reliable access, thoughtful locations, and the future of clean mobility.",
  ...(siteUrl ? {
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "Vajra Greens — Energy Meets Mobility",
      description: "Building the infrastructure for what moves next.",
      type: "website" as const,
    },
  } : {}),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ScrollSystem />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
