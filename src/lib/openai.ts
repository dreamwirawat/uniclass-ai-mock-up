import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export interface ChatCompletionParams {
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  model?: string;
  stream?: boolean;
  temperature?: number;
}

export async function createChatCompletion(params: ChatCompletionParams) {
  const {
    messages,
    model = "gpt-4-turbo-preview",
    stream = false,
    temperature = 0.7,
  } = params;

  return await openai.chat.completions.create({
    model,
    messages,
    stream,
    temperature,
  });
}

export function getSystemPrompt(
  teachingStyle: string,
  context?: string
): string {
  const stylePrompts = {
    strict:
      "You are a strict but fair tutor. Be direct, correct mistakes immediately, and maintain high standards. Push the student to think critically.",
    encouraging:
      "You are an encouraging and supportive tutor. Praise effort, provide positive reinforcement, and help build confidence while teaching.",
    socratic:
      "You are a Socratic tutor. Guide students to answers through thoughtful questions rather than direct explanations. Make them think deeply.",
    friendly:
      "You are a friendly and approachable tutor. Use simple language, provide relatable examples, and create a comfortable learning environment.",
  };

  let prompt =
    stylePrompts[teachingStyle as keyof typeof stylePrompts] ||
    stylePrompts.encouraging;

  if (context) {
    prompt += `\n\nThe student has highlighted this text: "${context}". Help them understand it better, explain concepts, or answer questions about it.`;
  }

  prompt +=
    "\n\nProvide clear, concise explanations. Use examples when helpful. Break down complex topics into digestible parts.";

  return prompt;
}

export { openai };
