import { prisma } from "../../utils/db";

async function main() {
  const task = await prisma.task.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Check out Prisma with Next.js",
      description: "Learn how to integrate Prisma with Next.js",
      completed: 0,
    },
  });

  console.log({ task });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
