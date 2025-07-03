import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { email } from "zod/v4";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin12345", 10);

  await prisma.user.upsert({
    where: { email: "admin@mail.com" },
    update: {},
    create: {
      email: "admin@mail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user has seeded");
}

main().finally(() => prisma.$disconnect);
