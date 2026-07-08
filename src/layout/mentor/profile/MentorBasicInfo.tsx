"use client";

import DashboardCard from "@/components/common/DashboardCard";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextArea";

const MentorBasicInfo = () => {
  return (
    <DashboardCard>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Basic Information
          </h3>

          <p className="text-sm text-muted-foreground">
            Tell founders about yourself and your mentoring experience.
          </p>
        </div>

        <FormInput
          name="headline"
          label="Professional Headline"
          placeholder="e.g. Senior Product Manager at Google"
        />

        <FormInput
          name="experience_years"
          label="Years of Experience"
          type="number"
          placeholder="10"
        />

        <FormTextarea
          name="bio"
          label="Professional Bio"
          placeholder="Share your experience, achievements, and how you help startups..."
        />
      </div>
    </DashboardCard>
  );
};

export default MentorBasicInfo;