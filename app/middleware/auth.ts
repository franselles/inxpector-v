// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  // 1. Si no está logeado, mandarlo al inicio (evitando bucle si ya está en /)
  if (!loggedIn.value) {
    if (to.path !== "/") return navigateTo("/");
    return; // Si ya está en /, no hacemos nada y dejamos que cargue
  }

  // 2. Obtener el rol que REQUIERE la página actual
  const pageRequiredRole = to.meta.roles;

  // 3. Lógica de redirección inicial (Cuando entran al sitio logeados)
  // Solo redirigimos si el usuario intenta entrar a la raíz "/"
  if (to.path === "/") {
    if (user.value?.roles === 1) return navigateTo("/a/collectors");
    if (user.value?.roles === 2) return navigateTo("/d/dash");
  }

  // 4. Lógica de PROTECCIÓN de rol (Para que un rol 1 no entre a páginas de rol 2)
  // Comprobamos si la página pide un rol y si el usuario lo tiene.
  // IMPORTANTE: Aquí NO usamos navigateTo a una página con middleware,
  // simplemente abortamos o dejamos pasar.
  if (pageRequiredRole && user.value?.roles !== pageRequiredRole) {
    return abortNavigation({
      statusCode: 403,
      message: "No tienes permiso para ver esta página",
    });
  }
});
