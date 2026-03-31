import prisma from "../lib/prisma";

export default eventHandler(async () => {
  try {
    const informs = await prisma.informs.findMany({
      orderBy: {
        date_inform: "asc",
        collector_id: "asc",
        time_in: "asc",
      },
    });
    return informs;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener los informes",
    });
  }
});
