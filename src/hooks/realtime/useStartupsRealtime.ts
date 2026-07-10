"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase.config";
import { StartupStatus } from "@/types/enum/enum";

export const useStartupsRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("startups-realtime")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "startups",
        },
        async (payload) => {
          console.log("🚀 Startup Realtime Event", payload);

          const startup = payload.new as {
            status?: StartupStatus;
          };

          // ==========================
          // Founder Startup Profile
          // ==========================
          await queryClient.refetchQueries({
            queryKey: ["startup"],
          });

          // ==========================
          // Admin Pending Startups
          // ==========================
          if (
            payload.eventType === "INSERT" ||
            startup.status === StartupStatus.PENDING
          ) {
            await queryClient.refetchQueries({
              queryKey: ["admin-pending-startups"],
            });
          }

          // ==========================
          // Investor Marketplace
          // Refetches every startups query:
          // ["startups", page, limit, search, industry, stage]
          // ==========================
          if (startup.status === StartupStatus.APPROVED) {
            await queryClient.refetchQueries({
              queryKey: ["startups"],
            });
          }

          // ==========================
          // Admin Dashboard
          // ==========================
          await queryClient.refetchQueries({
            queryKey: ["admin-dashboard"],
          });
        }
      )

      .subscribe((status) => {
        console.log("🚀 Startups Realtime:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};