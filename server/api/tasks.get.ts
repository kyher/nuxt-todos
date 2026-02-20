import { prisma } from "../utils/db";

export default defineEventHandler(async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
});
