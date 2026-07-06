export interface PitchDeckPayload {
  file?: File;
}

export interface PitchDeck {
  id: string;
  startup_id: string;

  file_name: string;
  file_path: string;

  file_size: number;
  mime_type: string;

  created_at: string;
  updated_at: string;
}

export type PitchDeckForm = {
  file?: File;
};
