import * as yup from "yup";

export const investmentValidation = yup.object({
  amount: yup
    .number()
    .typeError("Investment amount is required")
    .required("Investment amount is required")
    .min(1000, "Minimum investment is ₹1000"),

  equity_offer: yup
    .number()
    .typeError("Equity offer is required")
    .required("Equity offer is required")
    .min(0.1, "Minimum equity is 0.1%")
    .max(100, "Equity cannot exceed 100%"),

  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(20, "Message must be at least 20 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

export interface InvestmentFormValues {
  amount: number;
  equity_offer: number;
  message: string;
}