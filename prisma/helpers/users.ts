import prisma from "../../lib/prisma";

export const fetchUsers = async () => {
  return await prisma.user.findMany();
};