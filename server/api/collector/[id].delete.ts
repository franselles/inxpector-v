import prisma from "../../lib/prisma";

export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  const body = await readBody(event);

  try {
    const collector = await prisma.collectors.delete({
      where: { id },
    });
    return collector;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Cobrador no eliminado",
    });
  }
});
