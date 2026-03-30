import prisma from "../lib/prisma";

export default eventHandler(async () => {
  try {
    const inspectors = await prisma.inspectors.findMany({
      where: {},
    });
    return inspectors;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
