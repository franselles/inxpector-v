import prisma from "../lib/prisma";

export default eventHandler(async () => {
  const cities = await prisma.cities.findMany();
  return cities;
});
