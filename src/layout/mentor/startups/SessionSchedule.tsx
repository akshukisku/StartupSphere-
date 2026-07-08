"use client";

import DashboardCard from "@/components/common/DashboardCard";
import FormInput from "@/components/common/form/FormInput";

const SessionSchedule = () => {
  return (
    <DashboardCard>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Schedule
          </h3>

          <p className="text-sm text-muted-foreground">
            Select when the mentorship session will take place.
          </p>
        </div>

        <FormInput
          name="session_date"
          label="Date & Time"
          type="datetime-local"
        />

        <FormInput
          name="duration"
          label="Duration (minutes)"
          type="number"
          placeholder="60"
        />
      </div>
    </DashboardCard>
  );
};

export default SessionSchedule;