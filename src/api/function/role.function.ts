import { supabase } from "@/lib/supabase.config";

export const createFounderProfileFns = async (
  profileId: string
) => {
  const { error } = await supabase
    .from("founder_profiles")
    .insert({
      profile_id: profileId,
    });

  if (error) throw error;
};