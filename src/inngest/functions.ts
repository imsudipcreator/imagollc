/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from "@/server/db";
import { inngest } from "./client";
import type { Model } from "@prisma/client";

export const callIMI = inngest.createFunction(
  { id: "call-imi" },
  { event: "call-imi/run" },
  async ({ event, step }) => {
    const { input, image, history, model } = event.data;
    const aiResponse = await step.run("get-response", async () => {
      const response = await fetch("https://tool-user-ai.onrender.com/chat", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ input, image, history, model }),
      });

      if (!response.ok) throw new Error("Failed to generate your response");

      return (await response.json()) as { assistant: string };
    });

    console.log(event.data.userId);

    await step.run("save-messages", async () => {
      if (aiResponse.assistant) {
        await db.message.create({
          data: {
            id: crypto.randomUUID(),
            model: event.data.model as Model,
            role: "assistant",
            type: "result",
            chatId: event.data.chatId as string,
            userId: event.data.userId as string,
            content: aiResponse.assistant,
          },
        });
      } else {
        await db.message.create({
          data: {
            id: crypto.randomUUID(),
            model: event.data.model as Model,
            role: "assistant",
            type: "error",
            chatId: event.data.chatId as string,
            userId: event.data.userId as string,
            content: "Something went wrong. Retry",
          },
        });
      }
    });
  },
);
