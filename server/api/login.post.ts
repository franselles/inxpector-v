import { z } from "zod";

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(4),
});

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  if (email === "a@a.com" && password === "1234") {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        name: "John Doe",
        role: "admin",
      },
    });
    return { role: "admin" };
  }
  throw createError({
    status: 401,
    message: "Bad credentials",
  });
});
