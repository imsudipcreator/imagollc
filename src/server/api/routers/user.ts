import { db } from "@/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: {
        id: ctx.userId,
      },
      include: {
        apps: true,
        websites: true,
        communityPosts: true,
      },
    });

    return user;
  }),
  communityPostsByDate: protectedProcedure.query(async ({ ctx }) => {
    const rawData = await db.$queryRawUnsafe<{ date: string; count: bigint }[]>(
      `
        SELECT 
            to_char("createdAt", 'YYYY-MM-DD') as date, 
            COUNT(*) as count
        FROM "CommunityPost"
        WHERE "userId" = $1
        GROUP BY to_char("createdAt", 'YYYY-MM-DD')
        ORDER BY date ASC;
        `,
      ctx.userId,
    );

    const data = rawData.map((row) => ({
      date: row.date,
      count: Number(row.count),
    }));

    return data;
  }),
});
