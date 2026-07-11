import { InvestmentStatus } from "../enum/enum";

export interface InvestmentRequestPayload {
  startup_id: string;
  amount: number;
  equity_offer: number;
  message: string;
}

export interface InvestmentRequest {
  id: string;

  startup_id: string;
  investor_id: string;
  founder_id: string;

  amount: number;
  equity_offer: number;

  message: string;

  status: "pending" | "accepted" | "rejected";

  created_at: string;
  updated_at: string;
  responded_at: string | null;
}

export interface InvestmentStartup {
  id: string;
  startup_name: string;
  logo_url: string | null;
  industry: string;
  funding_stage: string;
}

export interface UpdateInvestmentStatusPayload {
  requestId: string;
  status: InvestmentStatus;
}