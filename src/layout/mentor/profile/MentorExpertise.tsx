"use client";

import DashboardCard from "@/components/common/DashboardCard";
import FormInput from "@/components/common/form/FormInput";

const MentorExpertise = () => {
  return (
    <DashboardCard>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Expertise
          </h3>

          <p className="text-sm text-muted-foreground">
            Mention your core skills and industries.
          </p>
        </div>

        <FormInput
          name="expertise"
          label="Expertise"
          placeholder="React, Product Management, AI"
        />

        <FormInput
          name="industries"
          label="Industries"
          placeholder="FinTech, HealthTech, EdTech"
        />
      </div>
    </DashboardCard>
  );
};

export default MentorExpertise;