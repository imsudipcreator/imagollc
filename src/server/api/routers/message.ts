import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { inngest } from "@/inngest/client";

export const messageRouter = createTRPCRouter({
  getMessagesByChatId : publicProcedure
  .input(
    z.object({
      userId : z.string(),
      chatId : z.string()
    })
  )
  .query( async ({ input }) => {
    const messages = await db.message.findMany({
      where : {
        userId : input.userId,
        chatId : input.chatId,
      },
      orderBy: { createdAt: "asc" }
    })

    return messages
  }),
  create : publicProcedure
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
      await db.message.create({
        data: {
          id: crypto.randomUUID(),
          userId: input.userId,
          chatId: input.chatId,
          role: "user",
          type: "result",
          model: input.model,
          content : input.input
        },
      });

      // const response = await fetch("https://tool-user-ai.onrender.com/chat", {
      //   headers: { "Content-Type": "application/json" },
      //   method: "POST",
      //   body: JSON.stringify(input),
      // });

      // if (!response.ok) {
      //   throw new Error(
      //     "Something went wrong, model could not provide any responses",
      //   );
      // }

      // const aiResponse = response.json();

      await inngest.send({
        name: "call-imi/run",
        data: input,
      });

      ;
    }),
});
