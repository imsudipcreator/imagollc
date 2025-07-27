import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { generateSlug } from "random-word-slugs";

export const codeAgentRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const response = await fetch(
        "https://tool-user-ai.onrender.com/generate/code",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ prompt: input.prompt }),
        },
      );

      const { error, response: code } = (await response.json()) as {
        response: string;
        error: string | null;
      };

      if (!error) {
        const data = await db.website.update({
          where: {
            id: input.projectId,
            userId: ctx.userId,
          },
          data: {
            code,
            prompt: input.prompt,
          },
        });

        return data;
      } else {
        throw new Error("Could not generate your website");
      }
    }),
});
