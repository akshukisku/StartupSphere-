import { StartupStatus } from "../enum/enum";
import { Startup } from "./startup.interface";

export interface AdminState {
  users: PendingUser[];

  pendingStartups: AdminStartup[];

  stats: AdminStats | null;

  isLoading: boolean;

  isError: string | null;

  previewOpen: boolean;

  selectedStartup: Startup | null;
  startupPreviewOpen: boolean;

  openStartupPreview: (startup: Startup) => void;

  closeStartupPreview: () => void;

  fetchStartupById: (startupId: string) => Promise<void>;
  fetchPendingUsers: () => Promise<void>;

  approveUser: (userId: string) => Promise<boolean>;

  rejectUser: (userId: string) => Promise<boolean>;

  fetchPendingStartups: () => Promise<void>;

  approveStartup: (startupId: string) => Promise<boolean>;

  rejectStartup: (startupId: string, reason: string) => Promise<boolean>;

  fetchDashboardStats: () => Promise<void>;
  rejectDialogOpen: boolean;

  selectedStartupForReject: AdminStartup | null;

  openRejectDialog: (startup: AdminStartup) => void;

  closeRejectDialog: () => void;
}
export interface PendingUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  approval_status: string;
}
export interface DashboardStats {
  pendingUsers: number;
  approvedUsers: number;
  rejectedUsers: number;
  founders: number;
  investors: number;
  mentors: number;
}

export interface AdminStartup {
  id: string;

  startup_name: string;

  logo_url: string | null;

  industry: string;

  status: StartupStatus;

  submitted_at: string | null;

  founder: {
    id: string;
    full_name: string;
    email: string;
  };
}

export interface AdminStats {
  pendingUsers: number;
  approvedUsers: number;
  rejectedUsers: number;

  founders: number;
  investors: number;
  mentors: number;

  pendingStartups: number;
  approvedStartups: number;
  rejectedStartups: number;
}