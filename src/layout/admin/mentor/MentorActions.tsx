"use client";

import {
  CheckCircle2,
  Ban,
} from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import UserActionDialog from "@/app/admin/UserActionDialog";
import AdminActionMenu from "@/components/dashboard/AdminActionMenu";

import { Mentor } from "@/types/interface/admin.interface";

import { useUpdateMentorVerification } from "@/hooks/admin/useMentorManagement";

interface MentorActionsProps {
  mentor: Mentor;
}

const MentorActions = ({
  mentor,
}: MentorActionsProps) => {
  const { mutateAsync } =
    useUpdateMentorVerification();

  return (
    <AdminActionMenu>
      {mentor.is_verified ? (
        <UserActionDialog
          title="Disable Mentor"
          description="Are you sure you want to disable this mentor account?"
          onConfirm={() =>
            mutateAsync({
              mentorId: mentor.id,
              isVerified: false,
            })
          }
          trigger={
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <Ban className="mr-2 h-4 w-4" />
              Disable Account
            </DropdownMenuItem>
          }
        />
      ) : (
        <UserActionDialog
          title="Enable Mentor"
          description="Are you sure you want to enable this mentor account?"
          onConfirm={() =>
            mutateAsync({
              mentorId: mentor.id,
              isVerified: true,
            })
          }
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Enable Account
            </DropdownMenuItem>
          }
        />
      )}
    </AdminActionMenu>
  );
};

export default MentorActions;