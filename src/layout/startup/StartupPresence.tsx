"use client";

import DashboardCard from "@/components/common/DashboardCard";
import SectionHeader from "@/components/common/SectionHeader";

import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextArea";

const StartupPresence = () => {
  return (
    <DashboardCard className="space-y-8">
      <SectionHeader
        title="Company Presence"
        description="Add your website, social links and company overview."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <FormInput
          name="website"
          label="Website"
          placeholder="https://yourstartup.com"
          type="url"
        />

        <FormInput
          name="linkedin"
          label="LinkedIn"
          placeholder="https://linkedin.com/company/..."
          type="url"
        />

        <FormInput
          name="github"
          label="GitHub"
          placeholder="https://github.com/..."
          type="url"
        />

        <FormInput
          name="twitter"
          label="Twitter / X"
          placeholder="https://x.com/..."
          type="url"
        />
      </div>

      <FormTextarea
        name="description"
        label="Company Overview"
        placeholder="Describe your startup, the problem you're solving, your solution, target audience, and vision."
        rows={8}
      />
    </DashboardCard>
  );
};

export default StartupPresence;