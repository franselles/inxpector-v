import { z } from "zod";
import prisma from "../lib/prisma";

const bodySchema = z.object({
  user: z.string(),
  password: z.string().min(4),
});

export default eventHandler(async (event) => {
  const { user, password } = await readValidatedBody(event, bodySchema.parse);

  const userRegistered = await prisma.inspectors.findFirst({
    where: {
      user: user,
    },
  });

  if (userRegistered) {
    /*
    const hashedPassword = await hashPassword(password);

    if (await verifyPassword(hashedPassword, userRegistered.pass)) {
      // Password is valid
    }
    */
    if (userRegistered.pass == password) {
      await setUserSession(event, {
        user: {
          id: userRegistered.id,
          name: userRegistered.name,
          roles: userRegistered.rol,
        },
      });
      return { roles: userRegistered.rol };
    }
  }
  throw createError({
    status: 401,
    message: "Bad credentials",
  });
});
