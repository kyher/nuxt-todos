import { prisma } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  await prisma.task.delete({
    where: { id: Number(id) },
  });
});
