"use client";

import StartupApprovalCard from "@/layout/startup/StartupApprovalCard";
import StartupForm from "@/layout/startup/StartupForm";

import {
  useStartup,
  useSubmitStartup,
} from "@/hooks/startup/useStartup";

const StartupProfileForm = () => {
  const { data: startup } = useStartup();
const { mutateAsync: submitStartupMutation, isPending } =
  useSubmitStartup();

const submitStartup = async () => {
  const res = await submitStartupMutation();

  return res.success;
};

  return (
    <div className="space-y-8">
      {startup && (
        <StartupApprovalCard
          status={startup.status}
          rejectionReason={startup.rejection_reason}
          onSubmit={submitStartup}
          isLoading={isPending}
        />
      )}

      <StartupForm />
    </div>
  );
};

export default StartupProfileForm;