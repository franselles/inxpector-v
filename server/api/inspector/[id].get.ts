import prisma from "../../lib/prisma";

export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  try {
    const inspector = await prisma.inspectors.findUnique({
      where: { id },
    });
    return inspector;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: "Inspector no encontrado",
    });
  }
});
