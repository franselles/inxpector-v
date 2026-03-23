declare module "#auth-utils" {
  interface User {
    // Añade aquí todas las propiedades que guardas en tu sesión
    id: number;
    name: string;
    roles?: number;
  }
}

declare module "#app" {
  interface PageMeta {
    // Aquí defines que 'roles' puede ser un número, un string o lo que necesites
    roles?: number | string | string[];
  }
}

export {};
