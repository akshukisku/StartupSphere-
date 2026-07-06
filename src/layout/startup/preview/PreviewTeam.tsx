"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Crown,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { StartupPreviewProps } from "@/types/interface/preview.interface";
import PreviewSection from "../PreviewSection";
import { LinkedinIcon } from "@animateicons/react/lucide";

const PreviewTeam = ({ startup }: StartupPreviewProps) => {
  const members = startup.startup_team ?? [];

  return (
    <PreviewSection
      title="Meet the Team"
      description="The people building this startup."
    >
      {members.length === 0 ? (
        <div className="flex h-56 flex-col items-center justify-center rounded-2xl border border-dashed">
          <User className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="font-semibold">
            No team members yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Team members will appear here once they are added.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border bg-muted">
                  {member.avatar_url ? (
                    <Image
                      src={member.avatar_url}
                      alt={member.member_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="mt-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-lg font-semibold">
                    {member.member_name}
                  </h3>

                  {member.is_founder && (
                    <Crown className="h-5 w-5 text-yellow-500" />
                  )}
                </div>

                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>

                {member.bio && (
                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* LinkedIn */}
              {member.linkedin_url && (
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link
                      href={member.linkedin_url}
                      target="_blank"
                    >
                      <LinkedinIcon className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PreviewSection>
  );
};

export default PreviewTeam;