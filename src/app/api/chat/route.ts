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

    // Extract the response
    const responseMessage =
      completion.choices[0]?.message?.content ||
      "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({
      message: responseMessage,
      usage: completion.usage,
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

// Streaming endpoint (optional - for better UX)
export async function STREAM(req: NextRequest) {
  try {
    const {
      messages,
      context,
      teachingStyle = "encouraging",
    } = await req.json();

    const systemPrompt = getSystemPrompt(teachingStyle, context);

    const completion = await createChatCompletion({
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
    });

    // Create a ReadableStream for streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion as any) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat streaming error:", error);
    return NextResponse.json(
      { error: "Failed to stream chat response" },
      { status: 500 }
    );
  }
}
