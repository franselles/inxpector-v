import prisma from "../lib/prisma";

export default eventHandler(async () => {
  try {
    const informs = await prisma.informs.findMany({
      orderBy: [
        { date_inform: "asc" },
        { collector_id: "asc" },
        { time_in: "asc" },
      ],
      include: {
        collectors: true,
        inspectors: true,
        sectors: {
          include: {
            cities: true, // Aquí incluimos la relación de la ciudad dentro de sectores
          },
        },
      },
    });

    return informs;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener los informes con ciudad",
    });
  }
});
