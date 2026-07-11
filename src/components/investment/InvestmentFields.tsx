"use client";

import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { InvestmentFormValues } from "@/service/validation/investment.validation";

const InvestmentFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<InvestmentFormValues>();

  return (
    <div className="space-y-6">
      {/* Investment Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount">
          Investment Amount (₹)
        </Label>

        <Input
          id="amount"
          type="number"
          placeholder="Enter investment amount"
          {...register("amount")}
        />

        {errors.amount && (
          <p className="text-sm text-destructive">
            {errors.amount.message}
          </p>
        )}
      </div>

      {/* Equity Offer */}
      <div className="space-y-2">
        <Label htmlFor="equity_offer">
          Equity Offer (%)
        </Label>

        <Input
          id="equity_offer"
          type="number"
          step="0.1"
          placeholder="Enter equity percentage"
          {...register("equity_offer")}
        />

        {errors.equity_offer && (
          <p className="text-sm text-destructive">
            {errors.equity_offer.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Investment Proposal
        </Label>

        <Textarea
          id="message"
          rows={6}
          placeholder="Tell the founder why you want to invest..."
          {...register("message")}
        />

        {errors.message && (
          <p className="text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default InvestmentFields;