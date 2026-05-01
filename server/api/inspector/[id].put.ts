import prisma from "../../lib/prisma";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    // 1. Preparamos el objeto de actualización
    const updateData: any = {
      name: body.name,
      user: body.user,
      rol: body.rol,
      active: body.active,
    };

    // 2. Solo si viene 'pass' en el body, la hasheamos y la añadimos al objeto
    if (body.pass && body.pass.trim() !== "") {
      updateData.pass = await hashPassword(body.pass);
    }

    // 3. Ejecutamos la actualización
    const inspector = await prisma.inspectors.update({
      where: {
        id: Number(id),
      },
      data: updateData,
    });

    return inspector;
  } catch (error) {
    console.error("Prisma Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el inspector",
    });
  }
});
