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
      const task = await db.task.create({
        data: {
          id: crypto.randomUUID(),
          chatId: input.chatId,
          userId: ctx.userId,
          status: input.status,
        },
      });

      return task;
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

  getOne: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const task = await db.task.findUnique({
        where: {
          chatId: input.chatId,
          userId: ctx.userId,
        },
      });

      return task?.status;
    }),

  createImageTask: protectedProcedure.mutation(async ({ ctx }) => {
    const task = await db.postTask.create({
      data: {
        userId: ctx.userId,
        status: "generating",
        id: crypto.randomUUID(),
      },
    });

    return task;
  }),
  getImageTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await db.postTask.findMany({
      where: {
        userId: ctx.userId,
        status: "generating",
      },
    });

    return tasks;
  }),
  createWebsiteTask: protectedProcedure.mutation(async ({ ctx }) => {
    const task = await db.postTask.create({
      data: {
        userId: ctx.userId,
        status: "generating",
        id: crypto.randomUUID(),
      },
    });

    return task;
  }),
  getWebsiteTasks: protectedProcedure.query(async ({ ctx }) => {
    const tasks = await db.postTask.findMany({
      where: {
        userId: ctx.userId,
        status: "generating",
      },
    });

    return tasks;
  }),
});
