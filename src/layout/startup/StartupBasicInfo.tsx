"use client";

import DashboardCard from "@/components/common/DashboardCard";
import FormInput from "@/components/common/form/FormInput";
import FormSelect from "@/components/common/form/FormSelect";

import {
  industries,
  fundingStages,
} from "@/service/json/select/startup.select";
import StartupLogoUpload from "./StartupLogoUpload";
import FormTextarea from "@/components/common/form/FormTextArea";
import { useFormContext } from "react-hook-form";

const StartupBasicInfo = () => {
  const { register } = useFormContext();

  return (
    <DashboardCard>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Logo */}

        <div className="flex flex-col items-center gap-3">
          <StartupLogoUpload />

          <div className="text-center">
            <h4 className="font-medium">Startup Logo</h4>

            <p className="text-xs text-muted-foreground">
              PNG, JPG or SVG
              <br />
              Max 2MB
            </p>
          </div>
        </div>

        {/* Form */}

        <div className="flex-1 space-y-6">
          <FormInput
            name="startup_name"
            label="Startup Name"
            placeholder="Startup Name"
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <FormSelect
              name="industry"
              label="Industry"
              placeholder="Select Industry"
              options={industries}
            />

            <FormSelect
              name="funding_stage"
              label="Funding Stage"
              placeholder="Select Stage"
              options={fundingStages}
            />
          </div>

          <FormTextarea
            name="tagline"
            label="One Sentence Pitch"
            placeholder="Describe your startup in one sentence"
          />
        </div>
      </div>
    </DashboardCard>
  );
};

export default StartupBasicInfo;
