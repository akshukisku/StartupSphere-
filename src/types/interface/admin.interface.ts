import { Startup } from "./startup.interface";


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

export interface AdminDashboardStats {
  // Users
  totalUsers: number;
  pendingUsers: number;
  approvedUsers: number;
  rejectedUsers: number;

  founders: number;
  investors: number;
  mentors: number;

  // Startups
  totalStartups: number;
  pendingStartups: number;
  approvedStartups: number;
  rejectedStartups: number;

  // Mentorships
  activeMentorships: number;
  completedMentorships: number;
}

export interface MonthlyGrowth {
  month: string;
  users: number;
}

export interface RoleDistribution {
  role: string;
  count: number;
}

export interface StartupStatus {
  status: string;
  count: number;
}

export interface MentorshipStatus {
  status: string;
  count: number;
}

export interface AdminDashboardStats {
  totalUsers: number;

  pendingUsers: number;

  approvedUsers: number;

  rejectedUsers: number;

  founders: number;

  investors: number;

  mentors: number;

  totalStartups: number;

  pendingStartups: number;

  approvedStartups: number;

  rejectedStartups: number;

  activeMentorships: number;

  completedMentorships: number;
}

export interface AdminDashboardResponse {
  stats: AdminDashboardStats;

  monthlyGrowth: MonthlyGrowth[];

  roleDistribution: RoleDistribution[];

  startupStatus: StartupStatus[];

  mentorshipStatus: MentorshipStatus[];
}

export interface Investor {
  id: string;

  full_name: string;

  email: string;

  avatar_path: string | null;

  approval_status:
    | "approved"
    | "pending"
    | "rejected";

  is_verified: boolean;

  created_at: string;
}
export interface Mentor {
  id: string;

  full_name: string;

  email: string;

  avatar_path: string | null;

  approval_status:
    | "approved"
    | "pending"
    | "rejected";

  is_verified: boolean;

  created_at: string;
}