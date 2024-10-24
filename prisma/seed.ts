import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const userData = [
  {
    name: "Jane",
    email: "jane@example.com",
    password: bcrypt.hashSync('password123', 10),
    posts: {
      create: [
        {
          title: "First Post",
          content: "Hello, World!",
        },
      ],
    },
  },
  {
    name: "Joe",
    email: "joe@example.com",
    password: bcrypt.hashSync('ilovemycat', 10),
    posts: {
      create: [
        {
          title: "Second Post",
          content: "Hello, Journal!",
        },
      ],
    },
  },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (const user of userData) {
      await prisma.user.create({
        data: user,
      });
    }

    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
