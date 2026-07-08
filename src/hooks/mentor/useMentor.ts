import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  completeMentorSessionFns,
  createMentorEvaluationFns,
  createMentorProfileFns,
  createMentorSessionFns,
  fetchAssignedStartupsFns,
  fetchMentorDashboardStatsFns,
  fetchMentorEvaluationFns,
  fetchMentorProfileFns,
  fetchMentorSessionDetailsFns,
  fetchMentorSessionsFns,
  finishMentorshipFns,
  updateMentorProfileFns,
  updateMentorSessionFns,
} from "@/api/function/mentor.function";
import {
  CreateMentorProfilePayload,
  MentorProfilePayload,
  MentorSessionPayload,
} from "@/types/interface/mentor.interface";
import { toast } from "sonner";

export const useMentorProfile = () => {
  return useQuery({
    queryKey: ["mentor-profile"],

    queryFn: async () => {
      const response = await fetchMentorProfileFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
export const useMentorDashboard = () => {
  return useQuery({
    queryKey: ["mentor-dashboard"],

    queryFn: async () => {
      const response = await fetchMentorDashboardStatsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
export const useAssignedStartups = () => {
  return useQuery({
    queryKey: ["mentor-assigned-startups"],

    queryFn: async () => {
      const response = await fetchAssignedStartupsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};

export const useCreateMentorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MentorProfilePayload) =>
      createMentorProfileFns(payload),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["mentor-profile"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdateMentorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MentorProfilePayload) =>
      updateMentorProfileFns(payload),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["mentor-profile"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useMentorSessions = () => {
  return useQuery({
    queryKey: ["mentor-sessions"],

    queryFn: async () => {
      const response = await fetchMentorSessionsFns();

      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data;
    },
  });
};
export const useMentorSession = (sessionId: string) => {
  return useQuery({
    queryKey: ["mentor-session", sessionId],

    queryFn: async () => {
      const res = await fetchMentorSessionDetailsFns(sessionId);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },

    enabled: !!sessionId,
  });
};
export const useCreateMentorSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMentorSessionFns,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["mentor-sessions"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateMentorSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      payload,
    }: {
      sessionId: string;
      payload: MentorSessionPayload;
    }) => updateMentorSessionFns(sessionId, payload),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["mentor-sessions"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useCompleteMentorSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, notes }: { sessionId: string; notes: string }) =>
      completeMentorSessionFns(sessionId, notes),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["mentor-sessions"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useFinishMentorship = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assignmentId: string) =>
      finishMentorshipFns(assignmentId),

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["mentor-assigned-startups"],
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor-dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor-session"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useCreateMentorEvaluation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMentorEvaluationFns,

    onSuccess: (response) => {
      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["mentor-session"],
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor-dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor-assigned-startups"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useMentorEvaluation = (
  sessionId: string
) => {
  return useQuery({
    queryKey: ["mentor-evaluation", sessionId],

    queryFn: async () => {
      const res =
        await fetchMentorEvaluationFns(sessionId);

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },

    enabled: !!sessionId,
  });
};