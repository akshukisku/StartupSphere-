import { ApprovalStatus } from "../enum/enum";

export interface FounderStartup {
  id: string;
  startup_name: string;
  status: string;
}

export interface Founder {
  id: string;
  full_name: string;
  email: string;
  avatar_path: string | null;

  approval_status: ApprovalStatus;
  is_verified: boolean;

  created_at: string;

  startup: FounderStartup | null;
}
