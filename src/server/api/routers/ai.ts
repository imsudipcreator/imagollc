import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";

export const aiRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        input: z.string(),
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
        model: z.enum(["imi1", "imi1c", "imi2", "imi3", "imi4"]),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const createdMessage = await db.message.create({
        data: {
          id: crypto.randomUUID(),
          userId: input.userId,
          chatId: input.chatId,
          role: "user",
          type: "result",
          model: input.model,
        },
      });

      const aiResponse = await fetch("https://tool-user-ai.onrender.com/chat", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!aiResponse.ok) {
        throw new Error(
          "Something went wrong, model could not provide any responses",
        );
      }

      return { createdMessage, aiResponse };
    }),
});
