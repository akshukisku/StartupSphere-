"use client";

import { TwitterIcon } from "@animateicons/react/huge";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@animateicons/react/lucide";
import Link from "next/link";

const SOCIAL_LINKS = [
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { icon: GithubIcon, label: "GitHub", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];
const FOOTER_LINKS = {
  platform: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Startups", href: "#" },
    { label: "Investors", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Brand */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex w-fit items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <div className="h-4 w-4 rounded bg-primary-foreground" />
              </div>

              <span className="text-lg font-semibold tracking-tight text-foreground">
                StartupSphere
                <span className="text-primary">+</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              India's premier platform connecting founders, investors and
              innovators building the future together.
            </p>

            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-border
                    bg-muted/40
                    text-muted-foreground
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-primary
                    hover:bg-muted
                    hover:text-primary
                  "
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Platform
            </h4>

            <ul className="space-y-3">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      text-sm
                      text-muted-foreground
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-foreground
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Resources
            </h4>

            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      text-sm
                      text-muted-foreground
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-foreground
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Company
            </h4>

            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="
                      text-sm
                      text-muted-foreground
                      transition-all
                      duration-300
                      hover:translate-x-1
                      hover:text-foreground
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © 2026 StartupSphere+. All rights reserved.
          </p>

          <p className="text-center text-xs text-muted-foreground sm:text-right">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
