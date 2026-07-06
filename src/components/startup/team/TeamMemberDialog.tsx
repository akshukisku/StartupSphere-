"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormImageUpload from "@/components/common/form/FormImageUpload";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextArea";
import FormSwitch from "@/components/common/form/FormSwitch";

import { teamValidation, TeamForm } from "@/service/validation/team.validation";

import { StartupTeam } from "@/types/interface/startup.interface";


interface Props {
  mode: "create" | "edit";
  member?: StartupTeam;
  children: React.ReactNode;
}
import { StartupTeamPayload } from "@/types/interface/startup.interface";
import { toast } from "sonner";
import {
  useCreateTeamMember,
  useUpdateTeamMember,
} from "@/hooks/startup/startupTeam/useStartupTeam";

const TeamMemberDialog = ({ mode, member, children }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: addTeamMember, isPending: creatingMember } =
    useCreateTeamMember();

  const { mutateAsync: updateTeamMember, isPending: updatingMember } =
    useUpdateTeamMember();

  const isLoading = creatingMember || updatingMember;

  const methods = useForm<TeamForm>({
    resolver: yupResolver(teamValidation),
    defaultValues: {
      member_name: "",
      role: "",
      bio: "",
      linkedin_url: "",
      avatar: null,
      is_founder: false,

      remove_avatar: false,
    },
  });
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && member) {
      methods.reset({
        member_name: member.member_name,
        role: member.role,
        bio: member.bio ?? "",
        linkedin_url: member.linkedin_url ?? "",
        avatar: null,
        is_founder: member.is_founder,
      });
    }

    if (mode === "create") {
      methods.reset({
        member_name: "",
        role: "",
        bio: "",
        linkedin_url: "",
        avatar: null,
        is_founder: false,
      });
    }
  }, [open, mode, member, methods]);
  const onSubmit = async (data: TeamForm) => {
    const payload: StartupTeamPayload = {
      id: member?.id,

      member_name: data.member_name.trim(),
      role: data.role.trim(),

      bio: data.bio.trim() || undefined,

      linkedin_url: data.linkedin_url.trim() || undefined,

      avatar: data.avatar,

      is_founder: data.is_founder,
      remove_avatar: data.remove_avatar,
    };

    if (mode === "create") {
      await addTeamMember(payload);
    } else {
      await updateTeamMember(payload);
    }


    toast.success(
      mode === "create"
        ? "Team member added successfully!"
        : "Team member updated successfully!",
    );

    methods.reset({
      member_name: "",
      role: "",
      bio: "",
      linkedin_url: "",
      avatar: null,
      is_founder: false,
    });
    methods.clearErrors();
    setOpen(false);
  };
  const avatar = methods.watch("avatar");
  const removeAvatar = methods.watch("remove_avatar");
  const avatarPreview = avatar
    ? URL.createObjectURL(avatar)
    : removeAvatar
      ? null
      : mode === "edit"
        ? (member?.avatar_url ?? null)
        : null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto rounded-3xl sm:max-w-2xl">
        <DialogHeader className="space-y-2 border-b pb-5">
          <DialogTitle className="text-2xl font-bold">
            {mode === "create" ? "Add Team Member" : "Edit Team Member"}
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Add details about your startup team member.
          </p>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormImageUpload
              title="Member Avatar"
              description="PNG, JPG, WEBP • Max 2MB"
              preview={avatarPreview}
              onUpload={(file) => {
                methods.setValue("avatar", file);
                methods.setValue("remove_avatar", false);
              }}
              onRemove={() => {
                methods.setValue("avatar", null);
                methods.setValue("remove_avatar", true);
              }}
            />

            <FormInput
              name="member_name"
              label="Member Name"
              placeholder="John Doe"
            />

            <FormInput name="role" label="Role" placeholder="CEO" />

            <FormTextarea
              name="bio"
              label="Bio"
              placeholder="Tell us about this member..."
              rows={4}
            />

            <FormInput
              name="linkedin_url"
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/username"
            />

            <FormSwitch
              name="is_founder"
              label="Founder"
              description="Mark this member as the startup founder."
            />

            <DialogFooter className="border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isLoading}>
                {mode === "create" ? "Add Member" : "Update Member"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberDialog;
