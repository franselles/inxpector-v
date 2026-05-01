<script setup lang="ts">
interface Collector {
    id: number;
    name: string | null;
}

defineProps<{
    collector: Collector;
}>();

const emit = defineEmits<{
    (e: "select", id: number): void;
}>();
</script>

<template>
    <li
        class="flex items-center justify-between p-4 hover:bg-base-200 active:bg-base-300 transition-colors cursor-pointer group"
        @click="emit('select', collector.id)"
    >
        <div class="flex items-center gap-4">
            <div
                class="mask mask-squircle bg-base-300 p-2 text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors"
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
                    {{ collector.name || "Sin nombre" }}
                </div>
                <div class="text-xs opacity-50 font-mono tracking-wider">
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
</template>
