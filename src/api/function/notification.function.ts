import { supabase } from "@/lib/supabase.config";
import { NotificationType } from "@/types/enum/enum";

export const createNotification = async ({
  userId,
  title,
  description,
  type,
  referenceId,
}: {
  userId: string;
  title: string;
  description: string;
  type: NotificationType;
  referenceId?: string;
}) => {
  try {
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      title,
      description,
      type,
      reference_id: referenceId ?? null,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Notification created successfully.",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message: err.message,
    };
  }
};
export const fetchNotifications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return {
        success: false,
        data: [],
        message: error.message,
      };
    }

    return {
      success: true,
      data: data ?? [],
      message: "Notifications fetched successfully.",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      data: [],
      message: err.message,
    };
  }
};
export const fetchUnreadNotificationCount = async (userId: string) => {
  try {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) {
      return {
        success: false,
        count: 0,
        message: error.message,
      };
    }

    return {
      success: true,
      count: count ?? 0,
      message: "Unread notification count fetched successfully.",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      count: 0,
      message: err.message,
    };
  }
};
export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("id", notificationId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Notification marked as read.",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message: err.message,
    };
  }
};
export const markAllNotificationsAsRead = async (userId: string) => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({
        is_read: true,
      })
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "All notifications marked as read.",
    };
  } catch (error) {
    const err = error as Error;

    return {
      success: false,
      message: err.message,
    };
  }
};
export const fetchFounderNotificationsFns = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        data: [],
        message: "User not authenticated.",
      };
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: "Notifications fetched successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};