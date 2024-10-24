import prisma from "../../lib/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

export const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}


export const createAccount = async (email: string, name: string, password: string) => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return null;
  }
  return await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });
}