import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";

export const aiRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        image: z.string().optional(),
        history: z
          .array(
            z.object({
              sender: z.string(),
              content: z.string(),
            }),
          )
          .optional(),
        chatId: z.string(),
        model: z.enum(["imi1", "imi1c", "imi2", "imi2c", "imi3", "imi4", "imioss", "imiossc"]),
        persona: z.string().optional(),
        customPrompt: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { chatId, prompt, history, image, model, persona, customPrompt } = input;
      const response = await fetch("https://tool-user-ai.onrender.com/chat", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ input: prompt, image, model, history, persona, custom_prompt : customPrompt }),
      });

      if (response.ok) {
        const aiResponse = (await response.json()) as { assistant: string };

        const aiMessage = await db.message.create({
          data: {
            id: crypto.randomUUID(),
            model,
            role: "assistant",
            type: "result",
            chatId: chatId,
            userId: ctx.userId,
            content: aiResponse.assistant,
          },
        });

        return aiMessage;
      } else {
        const aiMessage = await db.message.create({
          data: {
            id: crypto.randomUUID(),
            model,
            role: "assistant",
            type: "error",
            chatId: chatId,
            userId: ctx.userId,
            content: "Something went wrong! Regenerate",
          },
        });
        return aiMessage;
      }
    }),
});
