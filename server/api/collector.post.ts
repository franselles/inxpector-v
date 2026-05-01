import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  const { name, active } = await readBody(event);

  try {
    const newCollector = await prisma.collectors.create({
      data: {
        name,
        active,
      },
    });
    return newCollector;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el colector",
    });
  }
});
