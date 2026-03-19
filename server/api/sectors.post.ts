import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  const body = await readBody(event);

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
});
