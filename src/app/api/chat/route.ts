import { NextRequest, NextResponse } from "next/server";
import { createChatCompletion, getSystemPrompt } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const {
      messages,
      context,
      teachingStyle = "encouraging",
    } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Build system prompt based on teaching style and context
    const systemPrompt = getSystemPrompt(teachingStyle, context);

    // Create chat completion with OpenAI
    const completion = await createChatCompletion({
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: false,
    });

    // Type assertion since we know stream is false
    const chatCompletion = completion as any;

    // Extract the response
    const responseMessage =
      chatCompletion.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({
      message: responseMessage,
      usage: chatCompletion.usage,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
