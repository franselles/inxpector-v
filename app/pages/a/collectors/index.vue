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
    <div class="max-w-2xl mx-auto p-4 space-y-6">
        <header
            class="flex items-center justify-between bg-base-200 p-4 rounded-box shadow-sm border border-base-300"
        >
            <div class="flex items-center gap-3">
                <div class="avatar placeholder">
                    <div
                        class="bg-primary text-primary-content rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2"
                    >
                        <span class="text-lg font-bold">{{
                            user?.name?.charAt(0)
                        }}</span>
                    </div>
                </div>
                <div>
                    <h1
                        class="text-[10px] opacity-60 uppercase font-black tracking-widest"
                    >
                        Inspector
                    </h1>
                    <p class="text-lg font-bold leading-none">
                        {{ user?.name }}
                    </p>
                </div>
            </div>

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
        </header>

        <section>
            <div class="flex items-center justify-between px-2 mb-2">
                <h2
                    class="text-sm font-bold opacity-50 uppercase tracking-wider"
                >
                    Cobradores Activos
                </h2>
                <span class="badge badge-sm badge-neutral">{{
                    collectors?.length || 0
                }}</span>
            </div>

            <ul
                class="bg-base-100 rounded-box shadow-md border border-base-300 divide-y divide-base-300 overflow-hidden"
            >
                <CollectorCheckItem
                    v-for="collector in collectors"
                    :key="collector.id"
                    :collector="collector"
                    @select="checkCollector"
                />
            </ul>

            <div
                v-if="!collectors?.length"
                class="text-center p-10 opacity-30 italic"
            >
                No hay cobradores disponibles para revisión.
            </div>
        </section>
    </div>
</template>
