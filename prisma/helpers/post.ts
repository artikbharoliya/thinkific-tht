import prisma from "../../lib/prisma";

export const fetchPosts = async () => {
  const results = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  console.log(results);
  return results;
};

export const findPost = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });
};
