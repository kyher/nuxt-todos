import { prisma } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ title: string; description: string }>(event);

  const task = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return task;
});
