import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { generateSlug } from "random-word-slugs";

export const chatRouter = createTRPCRouter({
    getOne : publicProcedure
    .input(
        z.object({
            chatId : z.string(),
            userId : z.string()
        })
    )
    .query(async ({input}) => {
        const chat = await db.chat.findUnique({
            where : {
                id : input.chatId,
                userId : input.userId
            },
            select : {
                id : true
            }
        })

        return chat?.id
    }),
    create : publicProcedure
    .input(
        z.object({
            userId : z.string()
        })
    )
    .mutation(async ({ input }) => {
        const chat = await db.chat.create({
            data : {
                id : crypto.randomUUID(),
                userId : input.userId,
                slug : generateSlug(2, { format : "kebab"})
            }
        })

        return chat.id
    })
})