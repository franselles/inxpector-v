import prisma from "../../lib/prisma";

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    const inspector = await prisma.inspectors.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        user: body.user,
        pass: body.pass,
        rol: body.rol,
        active: body.active,
      },
    });
    return inspector;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el inspector",
    });
  }
});
