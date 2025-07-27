import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "@/server/db";
import { generateSlug } from "random-word-slugs";
import { inngest } from "@/inngest/client";

const defaultCode = `
<!DOCTYPE html>
<html>
  <head>
    <title>My app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="flex justify-center items-center h-screen overflow-hidden bg-white font-sans text-center px-6">
    <div class="w-full">
      <span class="text-xs rounded-full mb-2 inline-block px-2 py-1 border border-amber-500/15 bg-amber-500/15 text-amber-500">🔥 New version dropped!</span>
      <h1 class="text-4xl lg:text-6xl font-bold font-sans">
        <span class="text-2xl lg:text-4xl text-gray-400 block font-medium">I'm ready to work,</span>
        Ask me anything.
      </h1>
    </div>
      <img src="https://enzostvs-deepsite.hf.space/arrow.svg" class="absolute bottom-8 left-0 w-[100px] transform rotate-[30deg]" />
    <script></script>
  </body>
</html>
`;

export const websiteRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        projectId: z.string(),
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await inngest.send({
        name: "create-website/run",
        data: {
          ...input,
          userId: ctx.userId,
        },
      });
    }),
  createProject: protectedProcedure.mutation(async ({ ctx }) => {
    const website = await db.website.create({
      data: {
        id: crypto.randomUUID(),
        code: defaultCode,
        prompt: "Basic starter website",
        slug: generateSlug(2, { format: "kebab" }),
        userId: ctx.userId,
      },
    });

    return website;
  }),
  findOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const website = await db.website.findUnique({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      });

      return website;
    }),
  findMany: protectedProcedure.query(async ({ ctx }) => {
    const website = await db.website.findMany({
      where: {
        userId: ctx.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return website;
  }),

  updateOne: protectedProcedure
    .input(
      z.object({
        code: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await db.website.update({
        data: {
          code: input.code,
        },
        where: {
          id: input.projectId,
          userId: ctx.userId,
        },
      });
    }),
});
