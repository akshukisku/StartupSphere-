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
          console.log("🚀 STARTUP EVENT", payload);

          const startup = payload.new as {
            status?: StartupStatus;
          };

          // Founder submitted startup
          if (
            payload.eventType === "UPDATE" &&
            startup.status === StartupStatus.PENDING
          ) {
            console.log("🔄 Refetch Pending Startups");

            await queryClient.refetchQueries({
              queryKey: ["admin-pending-startups"],
              type: "active",
            });

            await queryClient.refetchQueries({
              queryKey: ["admin-dashboard"],
              type: "active",
            });
          }
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