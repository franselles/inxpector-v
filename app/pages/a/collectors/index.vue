<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    roles: 1,
});

const { user, clear: clearSession } = useUserSession();

async function checkCollector(id: number) {
    await navigateTo(`/a/check/${id}`);
}

async function logout() {
    await clearSession();
    await navigateTo("/");
}

const { data: collectors } = await useFetch("/api/collectors");
</script>

<template>
    <div>
        <ul class="list bg-base-100 rounded-box shadow-md">
            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
                Cobradores
            </li>

            <li class="list-row" v-for="collector in collectors">
                <div>
                    <div>{{ collector.name }}</div>
                    <div class="text-xs uppercase font-semibold opacity-60">
                        {{ collector.id }}
                    </div>
                </div>
                <button
                    @click="checkCollector(collector.id)"
                    class="btn btn-square btn-ghost"
                >
                    <svg
                        class="size-[1.2em]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="2"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M6 3L20 12 6 21 6 3z"></path>
                        </g>
                    </svg>
                </button>
            </li>
        </ul>
        <div class="max-w-2xl mx-auto p-4 space-y-6">
            <div
                class="flex items-center justify-between bg-base-200 p-6 rounded-box shadow-sm border border-base-300"
            >
                <div class="flex items-center gap-4">
                    <div class="avatar placeholder">
                        <div
                            class="bg-primary text-primary-content rounded-full w-12"
                        >
                            <span class="text-xl">{{
                                user?.name?.charAt(0)
                            }}</span>
                        </div>
                    </div>
                    <div>
                        <h1
                            class="text-sm opacity-60 uppercase font-bold tracking-tighter"
                        >
                            Panel de Inspector
                        </h1>
                        <p class="text-xl font-extrabold italic">
                            Hola, {{ user?.name }}
                        </p>
                    </div>
                </div>

                <button
                    class="btn btn-outline btn-error btn-sm"
                    @click="logout"
                >
                    Cerrar Sesión
                </button>
            </div>

            <ul
                class="list bg-base-100 rounded-box shadow-md border border-base-300"
            ></ul>
        </div>
    </div>
</template>
