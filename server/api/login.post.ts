import { z } from "zod";
import prisma from "../lib/prisma";

const bodySchema = z.object({
  user: z.string(),
  password: z.string().min(4),
});

export default eventHandler(async (event) => {
  const { user, password } = await readValidatedBody(event, bodySchema.parse);

  try {
    const userRegistered = await prisma.inspectors.findFirst({
      where: {
        user: user.toUpperCase(),
      },
    });

    if (userRegistered) {
      const hashedPassword = await hashPassword(password);

      if (await verifyPassword(hashedPassword, password)) {
        // Password is valid
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
  } catch (error) {
    throw createError({
      status: 401,
      message: "Bad credentials",
    });
  }
});
