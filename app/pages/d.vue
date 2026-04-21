<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    roles: [2, 3],
});

const { clear: clearSession, user } = useUserSession();

async function logout() {
    await clearSession();
    await navigateTo("/");
}
</script>

<template>
    <div class="min-h-screen bg-base-100">
        <nav
            class="navbar bg-base-200 border-b border-base-300 px-4 flex-col lg:flex-row gap-4"
        >
            <div class="flex-1">
                <NuxtLink to="/d" class="text-xl font-black tracking-tighter">
                    PANEL<span class="text-primary">ADMINISTRADOR</span> R.A.
                    BENIDORM
                </NuxtLink>
            </div>

            <div class="flex-none flex items-center gap-2">
                <ul
                    class="menu menu-horizontal bg-base-100 rounded-lg border border-base-300 p-1 gap-1"
                >
                    <li
                        v-if="user?.roles === 3"
                        class="border-r border-base-300 pr-1 mr-1 flex items-center justify-center"
                    >
                        <span
                            class="text-[9px] sm:text-[10px] uppercase font-black opacity-40 select-none leading-none"
                        >
                            Inspectores
                        </span>
                    </li>
                    <li v-if="user?.roles === 3">
                        <NuxtLink
                            to="/d/inspectors/list"
                            class="rounded-md transition-colors px-2 sm:px-4"
                            active-class="bg-primary text-primary-content font-bold shadow-sm"
                        >
                            Lista
                        </NuxtLink>
                    </li>
                    <li v-if="user?.roles === 3">
                        <NuxtLink
                            to="/d/inspectors/add"
                            class="rounded-md transition-colors px-2 sm:px-4"
                            active-class="bg-primary text-primary-content font-bold shadow-sm"
                        >
                            + Nuevo
                        </NuxtLink>
                    </li>

                    <div
                        class="divider divider-horizontal mx-0 hidden sm:flex"
                    ></div>

                    <li
                        v-if="user?.roles === 3"
                        class="border-r border-base-300 pr-1 mr-1 flex items-center justify-center"
                    >
                        <span
                            class="text-[9px] sm:text-[10px] uppercase font-black opacity-40 select-none leading-none"
                        >
                            Cobradores
                        </span>
                    </li>
                    <li v-if="user?.roles === 3">
                        <NuxtLink
                            to="/d/collectors/list"
                            class="rounded-md transition-colors px-2 sm:px-4"
                            active-class="bg-primary text-primary-content font-bold shadow-sm"
                        >
                            Lista
                        </NuxtLink>
                    </li>
                    <li v-if="user?.roles === 3">
                        <NuxtLink
                            to="/d/collectors/add"
                            class="rounded-md transition-colors px-2 sm:px-4"
                            active-class="bg-primary text-primary-content font-bold shadow-sm"
                        >
                            + Nuevo
                        </NuxtLink>
                    </li>

                    <div
                        class="divider divider-horizontal mx-0 hidden sm:flex"
                    ></div>

                    <li
                        class="border-r border-base-300 pr-1 mr-1 flex items-center justify-center"
                    >
                        <span
                            class="text-[9px] sm:text-[10px] uppercase font-black opacity-40 select-none leading-none"
                        >
                            Informes
                        </span>
                    </li>
                    <li>
                        <NuxtLink
                            to="/d/dash/informs/all"
                            class="rounded-md transition-colors px-2 sm:px-4"
                            active-class="bg-primary text-primary-content font-bold shadow-sm"
                        >
                            Listados
                        </NuxtLink>
                    </li>

                    <div
                        class="divider divider-horizontal mx-0 hidden sm:flex"
                    ></div>
                </ul>

                <button
                    class="btn btn-circle btn-ghost btn-sm text-error ml-2"
                    @click="logout"
                    title="Cerrar Sesión"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                </button>
            </div>
        </nav>

        <main class="max-w-5xl mx-auto p-6">
            <NuxtPage />
        </main>
    </div>
</template>
