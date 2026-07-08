// ==============================
// Mentor Profile
// ==============================

export interface MentorProfile {
  id: string;
  profile_id: string;

  headline: string | null;
  bio: string | null;

  experience_years: number;

  linkedin_url: string | null;
  portfolio_url: string | null;

  expertise: string[];
  industries: string[];

  availability: Record<string, unknown> | null;

  created_at: string;
  updated_at: string;
}

export interface MentorProfilePayload {
  headline: string;
  bio: string;
  experience_years: number;

  linkedin_url: string;
  portfolio_url: string;

  expertise: string[];
  industries: string[];
}

export type CreateMentorProfilePayload = MentorProfilePayload;
export type UpdateMentorProfilePayload = MentorProfilePayload;

// ==============================
// Mentor Startup
// ==============================

export interface MentorStartup {
  id: string;

  founder_id: string;

  startup_name: string;

  tagline: string | null;
  description: string | null;

  logo_url: string | null;

  industry: string | null;
  funding_stage: string | null;

  website: string | null;

  linkedin: string | null;
  github: string | null;
  twitter: string | null;
}

// ==============================
// Mentor Assignment
// ==============================

export interface MentorAssignment {
  id: string;

  startup_id: string;
  mentor_profile_id: string;

  startups: MentorStartup;
}

// ==============================
// Mentor Session
// ==============================

export interface MentorSession {
  id: string;

  mentor_assignment_id: string;

  title: string;
  description: string;

  meeting_link: string;

  session_date: string;
  duration: number;

  status: "scheduled" | "completed" | "cancelled";

  notes: string | null;

  mentor_assignments: MentorAssignment;
}

export interface MentorSessionPayload {
  mentor_assignment_id: string;

  title: string;
  description: string;

  meeting_link: string;

  session_date: string;

  duration: number;
}
export interface MentorEvaluation {
  id: string;

  mentor_session_id: string;

  mentor_assignment_id: string;

  technical_rating: number;

  business_rating: number;

  communication_rating: number;

  overall_rating: number;

  strengths: string | null;

  recommendations: string | null;

  created_at: string;

  updated_at: string;
}

export interface MentorEvaluationPayload {
  mentor_session_id: string;

  mentor_assignment_id: string;

  technical_rating: number;

  business_rating: number;

  communication_rating: number;

  overall_rating: number;

  strengths: string;

  recommendations: string;
}