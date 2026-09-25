"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const links = [
  { href: "/about", label: "About" },
  { href: "/charging", label: "Charging" },
  { href: "/network", label: "Network" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/vision", label: "Vision" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(menu);
    if (reduce) {
      gsap.set(menu, { autoAlpha: open ? 1 : 0, yPercent: 0 });
    } else {
      gsap.to(menu, {
        autoAlpha: open ? 1 : 0,
        yPercent: open ? 0 : -3,
        duration: open ? 0.45 : 0.28,
        ease: "power3.out",
      });
      if (open) {
        gsap.fromTo(
          menu.querySelectorAll(".menu-link"),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.065, duration: 0.65, ease: "power3.out" },
        );
      }
    }
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, { dependencies: [open], scope: rootRef });

  return (
    <header className="site-header" ref={rootRef}>
      <Link className="brand" href="/" aria-label="Vajra Greens home" onClick={() => setOpen(false)}>
        <img src="/media/vajra-mark-round.png" alt="" width="39" height="39" />
        <span>VAJRA <strong>GREENS</strong></span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <Link className={pathname === link.href ? "current" : ""} href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="header-contact" href="/contact">Let&apos;s talk <span aria-hidden="true">↗</span></Link>
        <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((value) => !value)}>
          <span>{open ? "Close" : "Menu"}</span><i aria-hidden="true"><b /><b /></i>
        </button>
      </div>
      <div className="menu-panel" id="site-menu" ref={menuRef} aria-hidden={!open}>
        <div className="menu-panel-inner">
          <span className="eyebrow">Explore Vajra Greens</span>
          <nav aria-label="Mobile navigation">
            {[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Contact" }].map((link, index) => (
              <Link className="menu-link" href={link.href} key={link.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                <span className="menu-index">0{index + 1}</span>{link.label}<span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
          <div className="menu-panel-bottom">ENERGY MEETS MOBILITY <span>NEW DELHI · INDIA</span></div>
        </div>
      </div>
    </header>
  );
}
