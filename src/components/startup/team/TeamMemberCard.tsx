"use client";

import Image from "next/image";
import { Crown, Pencil, Trash2, User } from "lucide-react";
import { LinkedinIcon } from "@animateicons/react/lucide";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/common/DashboardCard";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import TeamMemberDialog from "./TeamMemberDialog";

import { StartupTeam } from "@/types/interface/startup.interface";
import { useDeleteTeamMember } from "@/hooks/startup/startupTeam/useStartupTeam";

interface Props {
  member: StartupTeam;
}

const TeamMemberCard = ({ member }: Props) => {
  const {
    mutateAsync: deleteTeamMember,
    isPending,
  } = useDeleteTeamMember();

  const handleDelete = async () => {
    try {
      await deleteTeamMember(member.id);

      toast.success("Team member deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete team member.");
    }
  };

  return (
    <DashboardCard contentClassName="space-y-5">
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

      {/* Info */}
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-semibold">
            {member.member_name}
          </h3>

          {member.is_founder && (
            <Crown className="h-5 w-5 text-yellow-500" />
          )}
        </div>

        <p className="text-sm font-medium text-primary">
          {member.role}
        </p>

        {member.bio && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {member.bio}
          </p>
        )}
      </div>

      {/* LinkedIn */}
      {member.linkedin_url && (
        <a
          href={member.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <TeamMemberDialog
          mode="edit"
          member={member}
        >
          <Button
            variant="outline"
            className="flex-1 rounded-xl"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </TeamMemberDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="flex-1 rounded-xl"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete Team Member?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. The team member and avatar
                will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardCard>
  );
};

export default TeamMemberCard;