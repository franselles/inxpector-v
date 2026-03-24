import prisma from "../../lib/prisma";

export default eventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const collector = await prisma.collectors.findUnique({
    where: { id },
  });
  return collector;
});
