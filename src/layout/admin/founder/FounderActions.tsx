"use client";

import { Button } from "@/components/ui/button";
import UserActionDialog from "@/app/admin/UserActionDialog";

import { Founder } from "@/types/interface/founder.interface";
import { useUpdateFounderVerification } from "@/hooks/admin/useFounder";

interface FounderActionsProps {
  founder: Founder;
}

const FounderActions = ({ founder }: FounderActionsProps) => {
  const { mutateAsync } = useUpdateFounderVerification();
  return (
    <div className="flex justify-end gap-2">
      <Button size="sm" variant="outline">
        View Startup
      </Button>

      {founder.is_verified ? (
        <UserActionDialog
          title="Disable Founder"
          description="Are you sure you want to disable this founder account?"
          onConfirm={() =>
            mutateAsync({
              founderId: founder.id,
              isVerified: false,
            })
          }
          trigger={
            <Button size="sm" variant="destructive">
              Disable
            </Button>
          }
        />
      ) : (
        <UserActionDialog
          title="Enable Founder"
          description="Are you sure you want to enable this founder account?"
          onConfirm={() =>
            mutateAsync({
              founderId: founder.id,
              isVerified: true,
            })
          }
          trigger={<Button size="sm">Enable</Button>}
        />
      )}
    </div>
  );
};

export default FounderActions;
