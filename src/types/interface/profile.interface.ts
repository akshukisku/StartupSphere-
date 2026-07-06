export interface Profile {
  id: string;

  full_name: string;

  email: string;

  role: string;

  avatar_url: string | null;

  approval_status: string;

  approved_by: string | null;

  approved_at: string | null;

  is_verified: boolean;

  verification_notes: string | null;

  created_at: string;

  updated_at: string | null;
}

export interface UpdateProfilePayload {
  full_name: string;

  avatar: File | null;

  remove_avatar: boolean;
}