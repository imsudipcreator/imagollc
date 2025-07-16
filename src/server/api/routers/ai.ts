import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { inngest } from "@/inngest/client";

export const aiRouter = createTRPCRouter({
  generate: protectedProcedure
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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const aiMessage = await inngest.send({
        name: "call-imi/run",
        data: {
          ...input,
          userId: ctx.userId,
        },
      });

      console.log("aiMessage", aiMessage);

      return aiMessage
    }),
});
