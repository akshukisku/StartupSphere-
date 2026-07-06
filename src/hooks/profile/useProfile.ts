import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchProfileFns, getProfileAvatarSignedUrlFns, updateProfileFns } from "@/api/function/profile.function";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],

    queryFn: async () => {
      const response = await fetchProfileFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
      refetchOnWindowFocus: false,
  });
};


export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileFns,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useProfileAvatar = (
  avatarPath: string | null | undefined
) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (!avatarPath) {
      setAvatarUrl("");
      return;
    }

    const loadAvatar = async () => {
      const res = await getProfileAvatarSignedUrlFns(avatarPath);

      if (res.success && res.data) {
        setAvatarUrl(res.data);
      }
    };

    loadAvatar();
  }, [avatarPath]);

  return avatarUrl;
};