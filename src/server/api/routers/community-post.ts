import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { inngest } from "@/inngest/client";
import { db } from "@/server/db";

export const communityPostRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        prompt: z.string().min(2),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await inngest.send({
        name: "create-community-post/run",
        data: {
          ...input,
          userId: ctx.userId,
        },
      });
    }),

  getPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const posts = await db.communityPost.findMany({
        take: input.limit ?? 5,
        where: {
          userId: ctx.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return posts;
    }),

  getAllPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { limit, cursor } = input;
      const posts = await db.communityPost.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          public: true,
        },
        include: {
          user: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        const nextPost = posts.pop();
        nextCursor = nextPost?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  getTopPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor, limit } = input;
      const posts = await db.communityPost.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          public: true,
        },
        include: {
          user: true,
          likes: true,
        },
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        const nextPost = posts.pop();
        nextCursor = nextPost?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  getLikedPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const posts = await db.communityPost.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          likes: {
            some: {
              userId: ctx.userId,
            },
          },
        },
        include: {
          user: true,
          likes: true,
        },
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextPost = posts.pop();
        nextCursor = nextPost?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  getUserPosts: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const posts = await db.communityPost.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          userId: ctx.userId,
        },
        include: {
          user: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextPost = posts.pop();
        nextCursor = nextPost?.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const postId = input.postId;
      const userId = ctx.userId;

      const existingLike = await db.communityPostLike.findFirst({
        where: { userId, postId },
      });

      if (existingLike) {
        await db.communityPostLike.delete({
          where: { id: existingLike.id },
        });

        const data = await db.communityPostLike.findMany({
          where: {
            postId,
          },
        });

        return { liked: false, likesLength: data.length };
      } else {
        await db.communityPostLike.create({
          data: {
            postId,
            userId,
          },
        });

        const data = await db.communityPostLike.findMany({
          where: {
            postId,
          },
        });

        return { liked: true, likesLength: data.length };
      }
    }),

  togglePublishPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const isPublic = await db.communityPost.findUnique({
        where: {
          id: input.postId,
          userId: ctx.userId,
        },
        select: {
          public: true,
        },
      });

      if (isPublic?.public) {
        await db.communityPost.update({
          where: {
            id: input.postId,
          },
          data: {
            public: false,
          },
        });

        return { public: false };
      } else {
        await db.communityPost.update({
          where: {
            id: input.postId,
          },
          data: {
            public: true,
          },
        });
        return { public: true };
      }
    }),

  uploadToCommunity: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { imageUrl } = input;
      await db.communityPost.create({
        data: {
          id: crypto.randomUUID(),
          imageUrl,
          prompt: "Unknown. This image was generated from intelligence.",
          userId: ctx.userId,
        },
      });
    }),
});
