"use client";

import DashboardCard from "@/components/common/DashboardCard";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextArea";

const SessionBasicInfo = () => {
  return (
    <DashboardCard>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Session Information
          </h3>

          <p className="text-sm text-muted-foreground">
            Provide the details of your mentorship session.
          </p>
        </div>

        <FormInput
          name="title"
          label="Session Title"
          placeholder="e.g. Product Strategy Review"
        />

        <FormTextarea
          name="description"
          label="Description"
          placeholder="Discuss product roadmap, GTM strategy, fundraising preparation..."
        />

        <FormInput
          name="meeting_link"
          label="Meeting Link"
          placeholder="https://meet.google.com/..."
        />
      </div>
    </DashboardCard>
  );
};

export default SessionBasicInfo;