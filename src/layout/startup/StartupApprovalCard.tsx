
"use client";

import DashboardCard from "@/components/common/DashboardCard";
import SectionHeader from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { StartupStatus } from "@/types/enum/enum";

interface StartupApprovalCardProps {
  status: StartupStatus;
  rejectionReason?: string | null;
  onSubmit: () => Promise<boolean>;
  isLoading?: boolean;
}

type StatusConfig = {
  title: string;
  description: string;
  color: string;
  buttonText?: string;
};
const STATUS_CONFIG: Record<StartupStatus, StatusConfig> = {
  [StartupStatus.DRAFT]: {
    title: "Draft",
    description:
      "Complete your startup profile before submitting it for review.",
    color: "text-yellow-600",
    buttonText: "Submit for Review",
  },

  [StartupStatus.PENDING]: {
    title: "Pending Review",
    description:
      "Your startup has been submitted and is waiting for admin approval.",
    color: "text-orange-600",
  },

  [StartupStatus.APPROVED]: {
    title: "Approved",
    description: "Congratulations! Your startup has been approved.",
    color: "text-green-600",
  },

  [StartupStatus.REJECTED]: {
    title: "Rejected",
    description: "Your startup needs some changes before it can be approved.",
    color: "text-red-600",
    buttonText: "Submit Again",
  },
};

const StartupApprovalCard = ({
  status,
  rejectionReason,
  onSubmit,
  isLoading = false,
}: StartupApprovalCardProps) => {
  const currentStatus = STATUS_CONFIG[status];
  return (
    <DashboardCard contentClassName="space-y-6">
      <SectionHeader
        title="Startup Status"
        description="Track your startup approval progress."
      />

      <div className="rounded-2xl border bg-muted/30 p-6">
        <div className="space-y-4">
          {/* Status */}
          <div>
            <p className="text-sm text-muted-foreground">Current Status</p>

            <h3 className={`mt-1 text-2xl font-bold ${currentStatus.color}`}>
              {currentStatus.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-6 text-muted-foreground">
            {currentStatus.description}
          </p>

          {/* Rejection Reason */}
          {status === StartupStatus.REJECTED && rejectionReason && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <h4 className="mb-2 text-sm font-semibold text-destructive">
                Rejection Reason
              </h4>

              <p className="text-sm text-muted-foreground">{rejectionReason}</p>
            </div>
          )}

          {/* Submit Button */}
          {(status === StartupStatus.DRAFT ||
            status === StartupStatus.REJECTED) && (
            <Button
              onClick={onSubmit}
              disabled={isLoading}
              className="rounded-xl"
            >
              {currentStatus.buttonText}
            </Button>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};

export default StartupApprovalCard;
