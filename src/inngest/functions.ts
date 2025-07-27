/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from "@/server/db";
import { inngest } from "./client";
import type { Model } from "@prisma/client";

export const callIMI = inngest.createFunction(
  { id: "call-imi" },
  { event: "call-imi/run" },
  async ({ event, step }) => {
    const { input, image, history, model } = event.data;
    const taskId = await step.run("add-task", async () => {
      const task = await db.task.create({
        data: {
          chatId: event.data.chatId,
          userId: event.data.userId,
          status: "Thinking",
        },
      });

      return task.id;
    });

    const aiResponse = await step.run("get-response", async () => {
      const response = await fetch("https://tool-user-ai.onrender.com/chat", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ input, image, history, model }),
      });

      if (!response.ok) throw new Error("Failed to generate your response");

      return (await response.json()) as { assistant: string };
    });

    // console.log(event.data.userId);

    await step.run("save-messages", async () => {
      await db.task.delete({
        where: {
          id: taskId,
        },
      });
      if (aiResponse.assistant) {
        return await db.message.create({
          data: {
            id: crypto.randomUUID(),
            model: event.data.model as Model,
            role: "assistant",
            type: "result",
            chatId: event.data.chatId as string,
            userId: event.data.userId as string,
            content: aiResponse.assistant,
          },
        });
      } else {
        return await db.message.create({
          data: {
            id: crypto.randomUUID(),
            model: event.data.model as Model,
            role: "assistant",
            type: "error",
            chatId: event.data.chatId as string,
            userId: event.data.userId as string,
            content: "Something went wrong. Retry",
          },
        });
      }
    });
  },
);

export const createCommunityPost = inngest.createFunction(
  { id: "create-community-post", retries: 1 },
  { event: "create-community-post/run" },
  async ({ event, step }) => {
    const { taskId, prompt, userId } = event.data as {
      taskId: string;
      prompt: string;
      userId: string;
    };
    console.log("running inngest function");
    const imageGenResponse = step.run("generate-image", async () => {
      const response = await fetch(
        `https://tool-user-ai.onrender.com/generate/image?input=${encodeURIComponent(prompt)}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) throw new Error("Failed to generate your image");

      return (await response.json()) as {
        type: "error" | "image";
        image_url: string;
        log: string;
      };
    });

    const { image_url } = await imageGenResponse;

    const createdPost = await db.communityPost.create({
      data: {
        imageUrl: image_url,
        prompt,
        id: crypto.randomUUID(),
        userId,
      },
    });

    await db.postTask.delete({
      where: {
        userId,
        id: taskId,
      },
    });

    return createdPost;
  },
);

export const createWebsite = inngest.createFunction(
  { id: "create-website", retries: 1 },
  { event: "create-website/run" },
  async ({ event, step }) => {
    const { taskId, prompt, userId, projectId } = event.data as {
      taskId: string;
      prompt: string;
      userId: string;
      projectId: string;
    };

    const codeAgentResponse = step.run("generate-code", async () => {
      const response = await fetch(
        "https://tool-user-ai.onrender.com/generate/code",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ prompt }),
        },
      );

      if (!response.ok) throw new Error("Failed to generate your website");

      return (await response.json()) as {
        response: string;
        error: null | string;
      };
    });

    const { response, error } = await codeAgentResponse;

    if (!error) {
      const data = await db.website.update({
        where: {
          id: projectId,
          userId,
        },
        data: {
          code: response,
          prompt,
        },
      });

      await db.postTask.delete({
        where: {
          userId,
          id: taskId,
        },
      });

      return data;
    }
  },
);
