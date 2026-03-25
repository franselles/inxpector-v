<script setup lang="ts">
const { clear: clearSession } = useUserSession();

async function logout() {
    await clearSession();
    await navigateTo("/");
}
</script>

<template>
    <div class="min-h-screen bg-base-100">
        <nav
            class="navbar bg-base-200 border-b border-base-300 px-4 flex-col sm:flex-row gap-4"
        >
            <div class="flex-1">
                <NuxtLink
                    to="/dashboard"
                    class="text-xl font-black tracking-tighter"
                >
                    ADMIN<span class="text-primary">PANEL</span>
                </NuxtLink>
            </div>

            <div class="flex-none">
                <ul
                    class="menu menu-horizontal bg-base-100 rounded-lg border border-base-300 p-1 gap-1"
                >
                    <li>
                        <NuxtLink
                            to="/d/inspectors/add"
                            class="rounded-md transition-colors"
                            active-class="bg-primary text-primary-content font-bold shadow-sm"
                        >
                            + Inspector
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/d/collectors/add"
                            class="rounded-md transition-colors"
                            active-class="bg-primary text-primary-content font-bold shadow-sm"
                        >
                            + Cobrador
                        </NuxtLink>
                    </li>
                </ul>
                <button
                    class="btn btn-circle btn-ghost btn-sm text-error"
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
