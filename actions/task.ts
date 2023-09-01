"use server";

import { prisma } from "@/lib/primsa";
import { createTaskSchemaType } from "@/schema/createTask";
import { currentUser } from "@clerk/nextjs";

export async function createTask(data: createTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.task.create({
    data: {
      userId: user.id,
      content: data.content,
      expiresAt: data.expiresAt,
      Collection: {
        connect: {
          id: data.collectionId,
        },
      },
    },
  });
}