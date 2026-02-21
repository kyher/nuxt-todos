import { prisma } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!task) {
    throw createError({ statusCode: 404, statusMessage: "Task not found" });
  }

  return await prisma.task.update({
    where: { id: Number(id) },
    data: {
      completed: {
        set: Number(!task.completed),
      },
    },
  });
});
