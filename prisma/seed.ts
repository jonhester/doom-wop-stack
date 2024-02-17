import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; 

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@example.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("admin", 10);

  // create user
  await prisma.user.create({
    data: {
      email,
      password:  hashedPassword,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
