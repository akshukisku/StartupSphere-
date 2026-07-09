import { NotificationType } from "../enum/enum";

export interface Notification {
  id: string;

  user_id: string;

  title: string;

  description: string | null;

  type: NotificationType | null;

  reference_id: string | null;

  is_read: boolean;

  created_at: string;
}

export interface NotificationState {
  unreadCount: number;

  notifications: Notification[];
}