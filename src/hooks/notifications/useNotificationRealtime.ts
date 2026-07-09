"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase.config";


export const useNotificationRealtime = (
  userId?: string,
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications-${userId}`)

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["notifications"],
          });

          queryClient.invalidateQueries({
            queryKey: [
              "notifications",
              "unread-count",
            ],
          });
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
};