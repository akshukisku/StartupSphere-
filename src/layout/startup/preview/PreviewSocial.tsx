"use client";

import {
  Globe,

  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { StartupPreviewProps } from "@/types/interface/preview.interface";
import PreviewSection from "../PreviewSection";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@animateicons/react/lucide";

const PreviewSocial = ({ startup }: StartupPreviewProps) => {
  const links = [
    {
      label: "Website",
      href: startup.website,
      icon: Globe,
    },
    {
      label: "LinkedIn",
      href: startup.linkedin,
      icon: LinkedinIcon,
    },
    {
      label: "GitHub",
      href: startup.github,
      icon: GithubIcon,
    },
    {
      label: "Twitter",
      href: startup.twitter,
      icon: TwitterIcon,
    },
  ].filter((item) => item.href);

  return (
    <PreviewSection
      title="Online Presence"
      description="Connect with the startup through its official channels."
    >
      {links.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed">
          <p className="text-muted-foreground">
            No social links available.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-16 w-full justify-between rounded-2xl px-5"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </div>

                  <ExternalLink className="h-4 w-4 opacity-60" />
                </Button>
              </a>
            );
          })}
        </div>
      )}
    </PreviewSection>
  );
};

export default PreviewSocial;