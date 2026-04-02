import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  try {
    // Capturar parámetros de la URL (ej: /api/allinforms?skip=50&take=50)
    const query = getQuery(event);

    // Convertimos a número y definimos valores por defecto
    const skip = parseInt(query.skip as string) || 0;
    const take = parseInt(query.take as string) || 50;

    // Consultar los datos con paginación
    // Usamos una promesa paralela para obtener los datos y el total al mismo tiempo
    const [informs, total] = await Promise.all([
      prisma.informs.findMany({
        skip: skip,
        take: take,
        orderBy: [
          { date_inform: "desc" },
          { collector_id: "asc" },
          { time_in: "desc" },
        ],
        include: {
          collectors: true,
          inspectors: true,
          sectors: {
            include: {
              cities: true,
            },
          },
        },
      }),
      prisma.informs.count(), // Necesitamos el total para saber cuándo deshabilitar el botón "Siguiente"
    ]);

    // 3. Devolvemos un objeto con los datos y el total
    return {
      data: informs,
      total: total,
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error al obtener los informes paginados",
    });
  }
});
