import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";

export const messageRouter = createTRPCRouter({
  getHistoryforAi: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const messages = await db.message.findMany({
        where: {
          chatId: input.chatId,
          userId: ctx.userId,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          role: true,
          content: true,
        },
        skip: 1,
        take: 10,
      });

      return messages;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const messages = await db.message.findMany({
        where: {
          chatId: input.chatId,
          userId: ctx.userId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return messages;
    }),
  getMessagesByChatId: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const messages = await db.message.findMany({
        where: {
          userId: ctx.userId,
          chatId: input.chatId,
        },
        orderBy: { createdAt: "asc" },
      });

      return messages;
    }),
  create: protectedProcedure
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
        model: z.enum(["imi1", "imi1c", "imi2", "imi2c", "imi3", "imi4"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const message = await db.message.create({
        data: {
          id: crypto.randomUUID(),
          userId: ctx.userId,
          chatId: input.chatId,
          role: "user",
          type: "result",
          model: input.model,
          content: input.input,
        },
      });

      return message;
    }),
});
