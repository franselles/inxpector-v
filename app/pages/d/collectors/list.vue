<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    roles: 3,
});

const { data: collectors, refresh } = await useFetch("/api/collectors");

function editCollector(id: number) {
    navigateTo(`/d/collectors/edit/${id}`);
}

async function deleteCollector(id: number) {
    if (
        !confirm(
            "¿Estás seguro de eliminar a este cobrador? Esta acción no se puede deshacer.",
        )
    )
        return;

    try {
        await $fetch(`/api/collector/${id}`, { method: "DELETE" as any });
        await refresh();
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Hubo un error al intentar eliminar al cobrador.");
    }
}
</script>

<template>
    <div class="space-y-6">
        <header class="flex justify-between items-center px-2">
            <div>
                <h1 class="text-2xl font-black tracking-tight">Cobradores</h1>
                <p class="text-xs opacity-50 uppercase font-bold">
                    Gestión de personal de campo
                </p>
            </div>
            <NuxtLink
                to="/d/collectors/add"
                class="btn btn-primary btn-sm shadow-md"
            >
                + Nuevo
            </NuxtLink>
        </header>

        <div
            class="bg-base-100 rounded-box shadow-md border border-base-300 overflow-hidden"
        >
            <ul class="list bg-base-100 divide-y divide-base-300">
                <CollectorListItem
                    v-for="collector in collectors"
                    :key="collector.id"
                    :collector="collector"
                    @edit="editCollector"
                    @delete="deleteCollector"
                />
            </ul>

            <div
                v-if="collectors?.length === 0"
                class="p-10 text-center opacity-40 italic text-sm"
            >
                No hay cobradores registrados actualmente.
            </div>
        </div>
    </div>
</template>
