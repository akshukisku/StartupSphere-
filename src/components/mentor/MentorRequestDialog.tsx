"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateMentorRequest } from "@/hooks/mentor/useMentor";

interface MentorRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentor: {
    id: string;
    full_name: string;
    email: string;
    avatar_path: string | null;
  } | null;
}

const MentorRequestDialog = ({
  open,
  onOpenChange,
  mentor,
}: MentorRequestDialogProps) => {
  const { mutate, isPending } = useCreateMentorRequest();
  const [message, setMessage] = useState("");

  if (!mentor) return null;

  const handleClose = () => {
    setMessage("");
    onOpenChange(false);
  };

  const handleSendRequest = () => {
    mutate(
      {
        mentorId: mentor.id,
        message,
      },
      {
        onSuccess: (response) => {
          if (!response.success) return;

          setMessage("");
          onOpenChange(false);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Request Mentor</DialogTitle>

          <DialogDescription>
            Send a mentorship request by briefly introducing your startup and
            explaining the guidance you're looking for.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mentor Info */}

          <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-muted/30 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={mentor.avatar_path ?? ""}
                alt={mentor.full_name}
              />

              <AvatarFallback>{mentor.full_name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-semibold">{mentor.full_name}</h3>

              <p className="text-sm text-muted-foreground">{mentor.email}</p>
            </div>
          </div>

          {/* Message */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>

            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              maxLength={500}
              placeholder="Tell the mentor about your startup, your current challenges, and the type of guidance you're looking for..."
            />

            <p className="text-right text-xs text-muted-foreground">
              {message.length}/500
            </p>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              disabled={!message.trim() || isPending}
              onClick={handleSendRequest}
            >
              {isPending ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorRequestDialog;
