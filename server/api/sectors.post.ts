import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const sectors = await prisma.sectors.create({
      data: {
        name: body.name,
        active: body.active,
        cities: {
          connect: {
            id: body.city_id,
          },
        },
      },
    });
    return sectors;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el sector",
    });
  }
});
