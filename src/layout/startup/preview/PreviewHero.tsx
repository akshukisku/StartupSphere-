"use client";

import Image from "next/image";
import { Building2, BadgeDollarSign, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { StartupPreviewProps } from "@/types/interface/preview.interface";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@animateicons/react/lucide";

const PreviewHero = ({ startup }: StartupPreviewProps) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary/10 via-background to-primary/5 shadow-sm">
      {/* Decorative Blur */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col items-center px-8 py-20 text-center">
        {/* Logo */}
        <div className="relative mb-8 h-36 w-36 overflow-hidden rounded-3xl border bg-card shadow-2xl ring-4 ring-primary/10">
          {startup.logo_url ? (
            <Image
              src={startup.logo_url}
              alt={startup.startup_name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Building2 className="h-14 w-14 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Startup Name */}
        <h2 className="text-5xl font-extrabold tracking-tight lg:text-6xl">
          {startup.startup_name}
        </h2>

        {/* Tagline */}
        {startup.tagline && (
          <p className="mt-5 max-w-3xl text-xl leading-8 text-muted-foreground">
            {startup.tagline}
          </p>
        )}

        {/* Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {startup.industry && (
            <Badge className="rounded-full px-5 py-2 text-sm font-medium shadow-sm">
              <Building2 className="mr-2 h-4 w-4" />
              {startup.industry}
            </Badge>
          )}

          {startup.funding_stage && (
            <Badge
              variant="secondary"
              className="rounded-full px-5 py-2 text-sm font-medium shadow-sm"
            >
              <BadgeDollarSign className="mr-2 h-4 w-4" />
              {startup.funding_stage}
            </Badge>
          )}
        </div>

        {/* Social Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {startup.website && (
            <Button
              variant="default"
              onClick={() => window.open(startup.website, "_blank")}
            >
              <Globe className="mr-2 h-4 w-4" />
              Website
            </Button>
          )}

          {startup.linkedin && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(startup.linkedin ?? "",  "_blank")}
            >
              <LinkedinIcon className="h-4 w-4" />
            </Button>
          )}

          {startup.github && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(startup.github ?? "", "_blank")}
            >
              <GithubIcon className="h-4 w-4" />
            </Button>
          )}

          {startup.twitter && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(startup.twitter ?? "", "_blank")}
            >
              <TwitterIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreviewHero;
