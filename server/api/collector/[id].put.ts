import prisma from "../../lib/prisma";

export default eventHandler(async (event) => {
  // 1. Obtenemos el ID de la URL
  const id = Number(getRouterParam(event, "id"));

  // 2. Leemos el body de la petición (aquí está el truco)
  const body = await readBody(event);

  try {
    // 3. Actualizamos en la base de datos
    const collector = await prisma.collectors.update({
      where: { id },
      data: {
        name: body.name,
        active: Boolean(body.active), // Forzamos booleano por seguridad
      },
    });

    return collector;
  } catch (error) {
    // Si el ID no existe, Prisma lanzará un error
    throw createError({
      statusCode: 404,
      statusMessage: "Cobrador no encontrado",
    });
  }
});
