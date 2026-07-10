"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase.config";

export const useProfilesRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("profiles-realtime")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        async (payload) => {
          const profile = payload.new as {
            role: string | null;
            approval_status: string;
          };

          // Pending Users Page
          if (profile.approval_status === "pending") {
            await queryClient.refetchQueries({
              queryKey: ["admin-pending-users"],
            });
          }

          // Founder Management
          if (
            profile.approval_status === "approved" &&
            profile.role === "founder"
          ) {
            await queryClient.refetchQueries({
              queryKey: ["founders"],
            });
          }

          // Investor Management
          if (
            profile.approval_status === "approved" &&
            profile.role === "investor"
          ) {
            await queryClient.refetchQueries({
              queryKey: ["admin-investors"],
            });
          }

          // Mentor Management
          if (
            profile.approval_status === "approved" &&
            profile.role === "mentor"
          ) {
            await queryClient.refetchQueries({
              queryKey: ["admin-mentors"],
            });
          }

          // Dashboard always updates
          await queryClient.refetchQueries({
            queryKey: ["admin-dashboard"],
          });
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
