import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/chat-context";
import type { ChatMessage } from "@/types/chat";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  console.log("[chat] key present?", !!apiKey, "model:", modelName);

  if (!apiKey) {
    return new Response("Missing GEMINI_API_KEY in .env.local", { status: 500 });
  }

  try {
    const { messages, lang } = (await req.json()) as {
      messages: ChatMessage[];
      lang: "en" | "ja";
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("No messages", { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = messages.map((m) => ({
      role: m.role, // "user" | "model"
      parts: [{ text: m.text }],
    }));

    const stream = await ai.models.generateContentStream({
      model: modelName,
      contents,
      config: {
        systemInstruction: buildSystemPrompt(lang),
        temperature: 0.6,
        maxOutputTokens: 800,
      },
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[chat] error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Chat error: ${message}`, { status: 500 });
  }
}