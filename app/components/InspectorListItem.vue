<script setup lang="ts">
interface Inspector {
    id: number;
    name: string | null;
    user: string | null;
    rol: number;
}

const props = defineProps<{
    inspector: Inspector;
}>();

const emit = defineEmits<{
    (e: "edit", id: number): void;
    (e: "delete", id: number): void;
}>();

// Helper para obtener la inicial del nombre de forma segura
const initial = computed(
    () => props.inspector.name?.charAt(0).toUpperCase() || "?",
);
</script>

<template>
    <li
        class="list-row items-center p-4 hover:bg-base-200 transition-colors flex"
    >
        <div class="avatar placeholder mr-3">
            <div class="bg-base-300 text-base-content rounded-full w-10">
                <span class="text-xs font-bold">{{ initial }}</span>
            </div>
        </div>

        <div class="flex-1">
            <div class="font-bold text-lg leading-tight">
                {{ inspector.name || "Sin nombre" }}
            </div>
            <div class="flex items-center gap-2 mt-1">
                <span
                    class="text-[10px] font-mono bg-base-200 px-1 rounded text-base-content/70"
                >
                    @{{ inspector.user || "sin-usuario" }}
                </span>

                <span
                    v-if="inspector.rol === 1"
                    class="badge-ghost badge badge-xs font-bold text-[9px] uppercase tracking-tighter"
                >
                    Inspector
                </span>

                <span
                    v-if="inspector.rol === 2"
                    class="badge-secondary badge badge-xs font-bold text-[9px] uppercase tracking-tighter"
                >
                    Admin
                </span>

                <span
                    v-if="inspector.rol === 3"
                    class="badge-success badge badge-xs font-bold text-[9px] uppercase tracking-tighter"
                >
                    Superadmin
                </span>
            </div>
        </div>

        <div class="flex gap-2">
            <button
                @click="emit('edit', inspector.id)"
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
                @click="emit('delete', inspector.id)"
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
</template>
