"use client";

import DashboardCard from "@/components/common/DashboardCard";
import FormInput from "@/components/common/form/FormInput";

const MentorSocialLinks = () => {
  return (
    <DashboardCard>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Social Links
          </h3>

          <p className="text-sm text-muted-foreground">
            Help founders learn more about your professional background.
          </p>
        </div>

        <FormInput
          name="linkedin_url"
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
        />

        <FormInput
          name="portfolio_url"
          label="Portfolio / Website"
          placeholder="https://yourportfolio.com"
        />
      </div>
    </DashboardCard>
  );
};

export default MentorSocialLinks;