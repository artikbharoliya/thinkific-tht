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

export const findPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
};

export const findUserPosts = async (userId: string) => {
  return await prisma.post.findMany({
    where: { authorId: Number(userId) },
    include: { author: true },
  });
}

export const createPost = async (title: string, content: string, email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const authorId = user.id;
  return await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
};
