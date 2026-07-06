export interface Notification {
  id: string;

  user_id: string;

  title: string;

  description: string | null;

  is_read: boolean;

  created_at: string;
}