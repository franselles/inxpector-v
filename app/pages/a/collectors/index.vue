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
        <h1>Welcome {{ user }}</h1>
        <button @click="logout">Logout</button>
    </div>
</template>
