import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { generateSlug } from "random-word-slugs";

export const chatRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const chats = await db.chat.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        slug: true,
      },
    });

    return chats;
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const chat = await db.chat.findUnique({
        where: {
          id: input.chatId,
          userId: ctx.userId,
        },
        select: {
          id: true,
        },
      });

      return chat?.id;
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const chat = await db.chat.create({
      data: {
        id: crypto.randomUUID(),
        userId: ctx.userId,
        slug: generateSlug(2, { format: "kebab" }),
      },
    });

    return chat.id;
  }),
});
