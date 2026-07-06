import { supabase } from "@/lib/supabase.config";
import { Notification } from "@/types/interface/notification.interface";

export const fetchNotificationsFns = async () => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return {
      success: true,
      data: (data ?? []) as Notification[],
      message: "Notifications fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};

export const markNotificationAsReadFns = async (notificationId: string) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", notificationId);

    if (error) throw error;

    return {
      success: true,
      message: "Notification marked as read.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
export const markAllNotificationsAsReadFns = async () => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("is_read", false);

    if (error) throw error;

    return {
      success: true,
      message: "All notifications marked as read.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong.",
    };
  }
};
