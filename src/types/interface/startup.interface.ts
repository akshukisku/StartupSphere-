import { StartupStatus } from "../enum/enum";
import { StartupMedia } from "./startupMedia.interface";

export interface StartupPayload {
  remove_logo?: boolean;
  startup_name: string;
  tagline: string;
  description: string;

  industry: string;
  funding_stage: string;

  website: string;
  linkedin?: string;
  github?: string;
  twitter?: string;

  logo_url?: File | null;

  showcase_images?: File[];
  cover_url: string | null;
  cover_path: string | null;
}
export interface StartupTeamPayload {
  id?: string;

  member_name: string;
  role: string;

  bio?: string;
  linkedin_url?: string;

  avatar: File | null;

  is_founder: boolean;

  // NEW
  remove_avatar?: boolean;
}
export interface StartupTeam {
  id: string;

  startup_id: string;

  member_name: string;

  role: string;

  bio: string | null;

  linkedin_url: string | null;

  avatar_url: string | null;

  avatar_path: string | null;

  is_founder: boolean;

  created_at: string;

  updated_at: string;
}

export interface Startup {
  id: string;

  founder_id: string;

  startup_name: string;
  tagline: string;
  description: string;

  industry: string;
  funding_stage: string;

  website: string;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;

  logo_url: string | null;

  showcase_images: string[];
  startup_media: StartupMedia[];

  // Approval Workflow
  status: StartupStatus;
  submitted_at: string | null;
  approved_at: string | null;
  approved_by: string | null;
  rejection_reason: string | null;

  created_at: string;
  updated_at: string;

  startup_team: StartupTeam[];
}

export interface StartupState {
  // Logo
  logoFile: File | null;
  logoPreview: string | null;
  removeLogoOnSave: boolean;

  // Cover
  coverFile: File | null;
  coverPreview: string | null;

  // Showcase
  showcaseFiles: File[];
  showcasePreviews: string[];
  removedShowcaseIds: string[];

  // Avatar
  avatarFile: File | null;
  avatarPreview: string | null;
  removeAvatarOnSave: boolean;

  // Logo
  setLogo: (file: File | null) => void;
  removeLogo: () => void;

  // Cover
  setCover: (file: File | null) => void;
  removeCover: () => void;

  // Showcase
  addShowcaseFiles: (files: File[]) => void;
  removeNewShowcaseFile: (index: number) => void;
  removeExistingShowcaseFile: (id: string) => void;
  clearShowcaseFiles: () => void;

  // Avatar
  setAvatar: (file: File | null) => void;
  removeAvatar: () => void;
  resetAvatar: () => void;

  // Reset
  resetMediaState: () => void;
}