import { generateAIResponse } from "@/service/helper/ai.service";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      message,
      language = "en",
    } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await generateAIResponse(
        message,
        language
      );

      console.log("Response from ai",response)
    if (!response.success) {
      return NextResponse.json(
        response,
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}