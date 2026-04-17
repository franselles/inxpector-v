<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    roles: 2,
});

const { data: inspectors, refresh } = await useFetch("/api/inspectors");

function editInspector(id: number) {
    navigateTo(`/d/inspectors/edit/${id}`);
}

async function deleteInspector(id: number) {
    if (
        confirm(
            "¿Estás seguro de eliminar a este inspector? Perderá el acceso al sistema inmediatamente.",
        )
    ) {
        try {
            // Usamos $fetch para la acción de borrado
            await $fetch(`/api/inspector/${id}`, { method: "DELETE" as any });

            // Refrescamos la lista reactiva
            await refresh();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el inspector.");
        }
    }
}
</script>

<template>
    <div class="space-y-6">
        <header class="flex justify-between items-center px-2">
            <div>
                <h1 class="text-2xl font-black tracking-tight">Inspectores</h1>
                <p class="text-xs opacity-50 uppercase font-bold text-primary">
                    Control de accesos y personal
                </p>
            </div>
            <NuxtLink
                to="/d/inspectors/add"
                class="btn btn-primary btn-sm shadow-md"
            >
                + Nuevo
            </NuxtLink>
        </header>

        <div
            v-if="inspectors?.length"
            class="bg-base-100 rounded-box shadow-md border border-base-300 overflow-hidden"
        >
            <ul class="list bg-base-100 divide-y divide-base-300">
                <li
                    v-for="inspector in inspectors"
                    :key="inspector.id"
                    class="list-row items-center p-4 hover:bg-base-200 transition-colors flex"
                >
                    <div class="avatar placeholder mr-3">
                        <div
                            class="bg-base-300 text-base-content rounded-full w-10"
                        >
                            <span class="text-xs font-bold">{{
                                inspector.name.charAt(0)
                            }}</span>
                        </div>
                    </div>

                    <div class="flex-1">
                        <div class="font-bold text-lg leading-tight">
                            {{ inspector.name }}
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span
                                class="text-[10px] font-mono bg-base-200 px-1 rounded text-base-content/70"
                            >
                                @{{ inspector.user }}
                            </span>

                            <span
                                :class="
                                    inspector.rol === 2
                                        ? 'badge-secondary'
                                        : 'badge-ghost'
                                "
                                class="badge badge-xs font-bold text-[9px] uppercase tracking-tighter"
                            >
                                {{
                                    inspector.rol === 2 ? "Admin" : "Inspector"
                                }}
                            </span>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button
                            @click="editInspector(inspector.id)"
                            class="btn btn-square btn-ghost btn-sm border border-base-300 shadow-sm"
                            title="Editar inspector"
                        >
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
                                    stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>

                        <button
                            @click="deleteInspector(inspector.id)"
                            class="btn btn-square btn-ghost btn-sm border border-base-300 shadow-sm text-error hover:bg-error hover:text-error-content hover:border-error"
                            title="Eliminar inspector"
                        >
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
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>
                </li>
            </ul>
        </div>

        <div
            v-else
            class="text-center py-20 bg-base-200/50 rounded-box border-2 border-dashed border-base-300 opacity-50"
        >
            <p class="font-bold">No hay inspectores registrados.</p>
            <p class="text-xs">Usa el botón superior para añadir uno nuevo.</p>
        </div>
    </div>
</template>
