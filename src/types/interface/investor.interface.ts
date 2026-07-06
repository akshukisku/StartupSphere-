export interface InvestorStartupCard {
  id: string;

  startup_name: string;

  startup_logo: string | null;

  tagline: string | null;

  industry: string;

  stage: string;

  city: string | null;

  founder_name: string;

  tags: string[];
}

export interface InvestorStartup {
  id: string;

  startup_name: string;

  logo_url: string | null;
  logo_path: string | null;

  industry: string | null;
  funding_stage: string | null;

  tagline: string | null;
  description: string | null;

  website: string | null;

  created_at: string;

  founder_name: string | null;
}

export interface InvestorState {
  search: string;
  industry: string;
  fundingStage: string;
  page: number;
  limit: number;

  setSearch: (search: string) => void;
  setIndustry: (industry: string) => void;
  setFundingStage: (fundingStage: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;

  resetFilters: () => void;
}