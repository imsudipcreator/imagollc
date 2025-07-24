import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";

export const appsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        logo: z.string().url(),
        downloadLink: z.string().url().optional(),
        releaseNotes: z.string().optional(),
        screenshots: z.array(z.string().url()),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        description,
        logo,
        title,
        downloadLink,
        releaseNotes,
        screenshots,
      } = input;
      await db.app.create({
        data: {
          id: crypto.randomUUID(),
          description,
          logo,
          title,
          downloadLink,
          releaseNotes,
          screenshots,
          userId: ctx.userId,
        },
      });
    }),
    findMany : protectedProcedure
    .query(async ({ ctx}) => {
      const apps = await db.app.findMany({
        where : {
          userId : ctx.userId
        },
        orderBy : {
          createdAt : "desc"
        }
      })

      return apps
    })
});
