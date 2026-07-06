"use client";

import DashboardCard from "@/components/common/DashboardCard";
import FormInput from "@/components/common/form/FormInput";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
  isSubmitting: boolean;
}

const ProfileForm = ({ isSubmitting }: ProfileFormProps) => {
  return (
    <DashboardCard>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your personal information. Your email and role cannot be
            changed.
          </p>
        </div>

        <div className="space-y-6">
          <FormInput
            name="full_name"
            label="Full Name"
            placeholder="Enter your full name"
          />

          <FormInput
            name="email"
            label="Email Address"
            placeholder="example@email.com"
            disabled
          />

          <FormInput name="role" label="Role" placeholder="Founder" disabled />
        </div>

        <div className="flex justify-end border-t pt-6">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ProfileForm;
