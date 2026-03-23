import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  const cities = await prisma.sectors.findMany({
    where: {},
  });
  return cities;
});
