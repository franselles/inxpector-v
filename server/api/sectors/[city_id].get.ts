import prisma from "../../lib/prisma";

export default eventHandler(async (event) => {
  const city_id = Number(getRouterParam(event, "city_id"));

  const cities = await prisma.sectors.findMany({
    where: {
      city_id: city_id,
    },
  });
  return cities;
});
