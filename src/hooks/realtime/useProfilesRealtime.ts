"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase.config";

export const useProfilesRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("Profiles Realtime Hook Mounted");
    const channel = supabase
      .channel("profiles-realtime")

      // New User Registered
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "profiles",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["founders"],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-investors"],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-mentors"],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-dashboard"],
          });
        },
      )

      // Profile Updated
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["founders"],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-investors"],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-mentors"],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-dashboard"],
          });
        },
      )

      .subscribe((status) => {
        console.log("Profiles Realtime:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
