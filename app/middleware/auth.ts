export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  // 1. Si no está logeado, mandarlo al inicio
  if (!loggedIn.value) {
    if (to.path !== "/") return navigateTo("/");
    return;
  }

  // 2. Lógica de redirección inicial (Landing según Rol)
  if (to.path === "/") {
    const userRole = user.value?.roles;
    if (userRole === 1) return navigateTo("/a/collectors");
    // Roles 2 y 3 van al mismo dashboard administrativo
    if (userRole === 2 || userRole === 3) return navigateTo("/d/dash");
  }

  // 3. Lógica de PROTECCIÓN de rutas
  const requiredRoles = to.meta.roles;

  if (requiredRoles !== undefined) {
    // Normalizamos: si es un número lo metemos en un array, si ya es array lo dejamos igual
    const allowedRoles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];
    const userRole = user.value?.roles ?? 0;

    // Verificamos si el rol del usuario está incluido en los permitidos de la página
    if (!allowedRoles.includes(userRole)) {
      return abortNavigation({
        statusCode: 403,
        message: "No tienes permiso para ver esta página",
      });
    }
  }
});
