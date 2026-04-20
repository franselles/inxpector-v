<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    roles: 3,
});

const { data: inspectors, refresh } = await useFetch("/api/inspectors");

function editInspector(id: number) {
    navigateTo(`/d/inspectors/edit/${id}`);
}

async function deleteInspector(id: number) {
    if (
        !confirm(
            "¿Estás seguro de eliminar a este inspector? Perderá el acceso al sistema inmediatamente.",
        )
    )
        return;

    try {
        await $fetch(`/api/inspector/${id}`, { method: "DELETE" as any });
        await refresh();
    } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el inspector.");
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
                <InspectorListItem
                    v-for="inspector in inspectors"
                    :key="inspector.id"
                    :inspector="inspector"
                    @edit="editInspector"
                    @delete="deleteInspector"
                />
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
