import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  const { name, active } = await readBody(event);

  const newCollector = await prisma.collectors.create({
    data: {
      name,
      active,
    },
  });
  return newCollector;
});
