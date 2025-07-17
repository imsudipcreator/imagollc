import { db } from "@/server/db";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import z from "zod";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
        status: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await db.task.create({
        data: {
          id: crypto.randomUUID(),
          chatId: input.chatId,
          userId: ctx.userId,
          status: input.status,
        },
      });
    }),
  deleteOne: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.task.delete({
        where: {
          id: input.taskId,
        },
      });
    }),

  getOne: publicProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const task = await db.task.findUnique({
        where: {
          chatId: input.chatId,
        },
      });
      

      return task?.status;
    }),
});
