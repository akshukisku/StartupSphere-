"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  investmentValidation,
  InvestmentFormValues,
} from "@/service/validation/investment.validation";

import { InvestorStartup } from "@/types/interface/investor.interface";
import InvestmentActions from "./InvestmentActions";
import InvestmentFields from "./InvestmentFields";
import { useCreateInvestmentRequest } from "@/hooks/investment/useInvestment";
import { useInvestmentStore } from "@/store/useInvestmentStore";

interface Props {
  startup: InvestorStartup;
}

const InvestmentForm = ({ startup }: Props) => {
  const { mutateAsync: createInvestmentRequest, isPending } =
    useCreateInvestmentRequest();

    const { closeInvestmentDialog } =
  useInvestmentStore();

  const methods = useForm<InvestmentFormValues>({
    resolver: yupResolver(investmentValidation),

    defaultValues: {
      amount: 1000,
      equity_offer: 1,
      message: "",
    },
  });

  const onSubmit = async (values: InvestmentFormValues) => {
    const res = await createInvestmentRequest({
      startup_id: startup.id,
      amount: values.amount,
      equity_offer: values.equity_offer,
      message: values.message,
    });

    if (!res.success) return;

    methods.reset();

    closeInvestmentDialog();
    // close dialog
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <InvestmentFields />

        <InvestmentActions isSubmitting={isPending} />
      </form>
    </FormProvider>
  );
};

export default InvestmentForm;
