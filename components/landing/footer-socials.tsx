
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    label: "IG",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    label: "FB",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    label: "in",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/",
    label: "TK",
  },
];

export default function FooterSocials() {
  return (
    <div className="footer-socials">
      <p className="footer-socials-heading">
        Follow the movement.
        <br />
        <span>Share the hope.</span>
      </p>

      <div className="footer-socials-list">
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${social.name}`}
            className="footer-social-link"
          >
            <span aria-hidden="true">{social.label}</span>

            <ArrowUpRight
              size={12}
              className="footer-social-arrow"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}