"use client";

import { useEffect } from "react";

import { supabase } from "@/lib/supabase.config";

export const useRealtimeTest = () => {
  useEffect(() => {
    const channel = supabase
      .channel("realtime-test")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "realtime_test",
        },
        (payload) => {
          console.log("🔥 TEST EVENT");
          console.log(payload);
        }
      )

      .subscribe((status) => {
        console.log("Test Status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
};