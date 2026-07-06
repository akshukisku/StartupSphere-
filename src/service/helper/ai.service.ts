import { google } from "@ai-sdk/google";
import { generateText } from "ai";


export const generateAIResponse = async (
  message: string,
  language: string = "en"
) => {
  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),

      system: `
You are StartupSphere AI.

You are an intelligent AI assistant that helps founders and investors.

You can assist with:
- Startup ideas
- Business plans
- Market research
- Funding strategies
- Investor pitches
- SWOT analysis
- Product validation
- Growth strategies

Rules:
- Always answer in ${language}.
- Keep responses professional.
- Use markdown when helpful.
- Be concise but actionable.
      `,

      prompt: message,
    });

    return {
      success: true,
      data: text,
      message: "Response generated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Failed to generate AI response.",
    };
  }
};