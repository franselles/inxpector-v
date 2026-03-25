import prisma from "../lib/prisma";

export default eventHandler(async (event) => {
  const { name, user, rol, pass } = await readBody(event);

  const hashedPassword = await hashPassword(pass);

  const userSign = await prisma.inspectors.create({
    data: {
      name,
      user,
      pass: hashedPassword,
      rol,
    },
  });
  return userSign;
});
