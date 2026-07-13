"use client";

import { UserCircle2 } from "lucide-react";

import DashboardCard from "@/components/common/DashboardCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMentorStore } from "@/store/useMentorStore";

interface MentorCardProps {
  mentor: {
    id: string;
    full_name: string;
    email: string;
    avatar_path: string | null;
  };
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const { openRequestDialog } = useMentorStore();
  return (
    <DashboardCard className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback>{mentor.full_name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">{mentor.full_name}</h3>

            <p className="text-sm text-muted-foreground">{mentor.email}</p>
          </div>
        </div>

        <Button className="w-full" onClick={() => {
  console.log("Clicked", mentor.id);
  openRequestDialog(mentor);
}}>
          Request Mentor
        </Button>
      </div>
    </DashboardCard>
  );
};

export default MentorCard;
