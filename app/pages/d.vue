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
            </div>
        </nav>

        <main class="max-w-5xl mx-auto p-6">
            <NuxtPage />
        </main>
    </div>
</template>
