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
                    collectors?.length
                }}</span>
            </div>

            <ul
                class="bg-base-100 rounded-box shadow-md border border-base-300 divide-y divide-base-300 overflow-hidden"
            >
                <li
                    v-for="collector in collectors"
                    :key="collector.id"
                    class="flex items-center justify-between p-4 hover:bg-base-200 active:bg-base-300 transition-colors cursor-pointer"
                    @click="checkCollector(collector.id)"
                >
                    <div class="flex items-center gap-4">
                        <div
                            class="mask mask-squircle bg-base-300 p-2 text-primary"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>

                        <div>
                            <div class="font-bold text-base">
                                {{ collector.name }}
                            </div>
                            <div
                                class="text-xs opacity-50 font-mono tracking-wider"
                            >
                                ID: #{{ collector.id }}
                            </div>
                        </div>
                    </div>

                    <div class="btn btn-circle btn-primary btn-sm shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>
