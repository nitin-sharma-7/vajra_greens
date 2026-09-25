import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-identity">
          <img src="/media/vajra-logo.png" alt="Vajra Greens Power and Energy LLP — Energy Meets Mobility" width="384" height="192" />
          <p>Building access to energy<br />for a world in motion.</p>
        </div>
        <div className="footer-links">
          <div><span className="eyebrow">Explore</span><Link href="/about">About</Link><Link href="/charging">Charging</Link><Link href="/network">Network</Link><Link href="/partnerships">Partnerships</Link><Link href="/vision">Vision</Link></div>
          <div><span className="eyebrow">Connect</span><Link href="/contact">Contact</Link><a href="mailto:vajraagp@gmail.com">vajraagp@gmail.com</a><span>New Delhi, India</span></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Vajra Greens Power &amp; Energy LLP</span><span>Energy meets mobility.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
