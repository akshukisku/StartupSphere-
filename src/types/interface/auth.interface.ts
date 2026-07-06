import { UserRole } from "../enum/enum";

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  terms: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  approval_status: string;
  avatar_path:string
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: string | null;

  profile: Profile | null;
  role: UserRole | null;

  registerUser: (payload: RegisterPayload) => Promise<boolean>;

  login: (email: string, password: string) => Promise<boolean>;

  logout: () => Promise<void>;

  refreshProfileFromCookie: () => void;
}