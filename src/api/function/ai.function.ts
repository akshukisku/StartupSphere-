interface GenerateAIResponsePayload {
  message: string;
  language: string;
}

interface GenerateAIResponse {
  success: boolean;
  data: string | null;
  message: string;
}

export const generateAIResponseFns = async ({
  message,
  language,
}: GenerateAIResponsePayload): Promise<GenerateAIResponse> => {
  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        language,
      }),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
};