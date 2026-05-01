import prisma from "../lib/prisma";

export default eventHandler(async () => {
  try {
    const collectors = await prisma.collectors.findMany({
      where: {},
    });
    return collectors;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
