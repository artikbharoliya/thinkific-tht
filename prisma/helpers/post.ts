import prisma from "../../lib/prisma";

export const fetchPosts = async () => {
  const results = await prisma.post.findMany({
    orderBy: [
      { createdAt: "desc" }
    ],
    include: { author: true },
  });
  return results;
};

export const findUserPosts = async (userId: string) => {
  return await prisma.post.findMany({
    orderBy: [
      { createdAt: "desc" }
    ],
    where: { authorId: Number(userId) },
    include: { author: true },
  });
}

export const createPost = async (title: string, content: string, userId: number | null) => {
  const authorId = userId || null;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
  return result;
};
