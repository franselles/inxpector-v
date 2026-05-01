import prisma from "../lib/prisma";

export default eventHandler(async () => {
  try {
    const cities = await prisma.cities.findMany();
    return cities;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener las ciudades",
    });
  }
});
