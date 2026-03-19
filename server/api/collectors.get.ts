import prisma from "../lib/prisma";

export default eventHandler(async () => {
  const collectors = await prisma.collectors.findMany({
    where: {
      active: true,
    },
  });
  return collectors;
});
