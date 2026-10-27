
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Mail,
  MapPin,
} from "lucide-react";

import FooterCTA from "./footer-cta";
import FooterSocials from "./footer-socials";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/#home" },
      { label: "Our Mission", href: "/#mission" },
      { label: "How It Works", href: "/#workflow" },
      { label: "Trust & Accountability", href: "/#trust" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Find Support", href: "/resources" },
      {
        label: "Share Resources",
        href: "/register?role=organization",
      },
      {
        label: "Become a Partner",
        href: "/register?role=organization",
      },
      { label: "Create an Account", href: "/register" },
    ],
  },
];

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <FooterCTA />

      <footer id="contact" className="site-footer">
        <div className="site-footer-inner">
          {/* Brand */}
          <div className="footer-brand-column">
            <Link href="/#home" className="footer-brand">
              <span className="footer-brand-mark">
                <HeartHandshake size={23} strokeWidth={1.7} />
              </span>

              <span className="footer-brand-name">
                Hands <span>of Hope</span>
              </span>
            </Link>

            <p className="footer-brand-description">
              Connecting people who need support with the resources
              and organizations that can make a difference.
            </p>

            <Link href="/#mission" className="footer-mission-link">
              Discover our mission
              <ArrowRight size={15} />
            </Link>

            <div className="footer-brand-socials">
              <FooterSocials />
            </div>
          </div>

          {/* Navigation */}
          {footerGroups.map((group) => (
            <div key={group.title} className="footer-link-column">
              <h3>{group.title}</h3>

              <ul>
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="footer-contact-column">
            <h3>Let&apos;s Connect</h3>

            <p className="footer-contact-intro">
              Have a question or want to work with us? We&apos;d love to
              hear from you.
            </p>

            <a
              href="mailto:contact@handsofhope.example"
              className="footer-contact-link"
            >
              <span className="footer-contact-icon">
                <Mail size={17} />
              </span>

              <span>
                <small>Email our team</small>
                <strong>Contact us</strong>
              </span>

              <ArrowRight
                size={15}
                className="footer-contact-arrow"
              />
            </a>

            <div className="footer-location-note">
              <MapPin size={16} />
              <p>
                Built for communities.
                <br />
                Connected by compassion.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear ?? "2026"} Hands of Hope.
            <span> Built on compassion. Connected by hope.</span>
          </p>

          <nav
            aria-label="Legal navigation"
            className="footer-legal-links"
          >
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/#trust">Accountability</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
