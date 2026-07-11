"use client";

import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { InvestmentFormValues } from "@/service/validation/investment.validation";

interface InvestmentActionsProps {
  isSubmitting?: boolean;
  onCancel?: () => void;
}

const InvestmentActions = ({
  isSubmitting = false,
  onCancel,
}: InvestmentActionsProps) => {
  const {
    formState: { isSubmitting: formSubmitting },
  } = useFormContext<InvestmentFormValues>();

  const loading = isSubmitting || formSubmitting;

  return (
    <div className="flex justify-end gap-3 border-t pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : "Send Investment Request"}
      </Button>
    </div>
  );
};

export default InvestmentActions;