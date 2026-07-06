"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import TeamMemberDialog from "./TeamMemberDialog";
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


import { useDeleteTeamMember } from "@/hooks/startup/startupTeam/useStartupTeam";
import { StartupTeam } from "@/types/interface/startup.interface";

interface Props {
  member: StartupTeam;
}

const TeamMemberItem = ({ member }: Props) => {
  const { mutateAsync: deleteTeamMember, isPending: isLoading } =useDeleteTeamMember();
  
  
const handleDelete = async () => {
  try {
    await deleteTeamMember(member.id);
  } catch {
    // Toast is already handled inside the hook.
  }
};
  return (
    <div className="flex items-center gap-4 rounded-xl border p-4 transition hover:bg-muted/40">
      <Avatar className="h-14 w-14 rounded-full">
        {member.avatar_url ? (
          <Image
            src={member.avatar_url}
            alt={member.member_name}
            fill
            className="object-cover"
          />
        ) : (
          <AvatarFallback>
            {member.member_name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex-1">
        <h3 className="font-semibold">{member.member_name}</h3>

        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>

      {member.is_founder && <Badge>Founder</Badge>}

      <div className="flex gap-2">
        <TeamMemberDialog mode="edit" member={member}>
          <Button size="icon" variant="outline">
            <Pencil className="h-4 w-4" />
          </Button>
        </TeamMemberDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Team Member?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. The team member and avatar will be
                permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default TeamMemberItem;
