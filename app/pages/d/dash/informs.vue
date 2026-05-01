<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    roles: 2,
});
</script>

<template>
    <div class="min-h-screen bg-base-100">
        <nav
            class="navbar bg-base-200 border-b border-base-300 px-4 flex-col lg:flex-row gap-4"
        >
            <div class="flex-none flex items-center gap-2">
                <ul
                    class="menu menu-horizontal bg-base-100 rounded-lg border border-base-300 p-1 gap-1"
                >
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
                            Todos
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </nav>

        <main class="max-w-5xl mx-auto p-6">
            <NuxtPage />
        </main>
    </div>
</template>
