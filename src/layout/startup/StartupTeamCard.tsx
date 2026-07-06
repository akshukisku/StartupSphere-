"use client";

import { Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import TeamMemberDialog from "@/components/startup/team/TeamMemberDialog";
import TeamEmptyState from "@/components/startup/team/TeamEmptyState";
import TeamMemberItem from "@/components/startup/team/TeamMemberItem";
import { useTeamMembers } from "@/hooks/startup/startupTeam/useStartupTeam";
import { useStartup } from "@/hooks/startup/useStartup";

const StartupTeamCard = () => {
  const { data: startup } = useStartup();

const {
  data: teamMembers = [],
  isPending: teamLoading,
} = useTeamMembers();

if (teamLoading) {
  return null;
}

  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Team</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your startup members.
            </p>
          </div>

          <TeamMemberDialog mode="create">
            <Button
              size="icon"
              variant="outline"
              className="rounded-xl"
              disabled={!startup}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </TeamMemberDialog>
        </div>
      </div>

      <div className="p-6">
        {!startup ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold">
              Create your startup first
            </h3>

            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              You need to create your startup profile before adding team
              members.
            </p>
          </div>
        ) : teamMembers.length === 0 ? (
          <TeamEmptyState />
        ) : (
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <TeamMemberItem
                key={member.id}
                member={member}
              />
            ))}

            <TeamMemberDialog mode="create">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </TeamMemberDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupTeamCard;