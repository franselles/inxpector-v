<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const id = route.params.id;

interface Collector {
    name: string | null;
    active: boolean;
}

const updateCollector = reactive({
    name: null,
    active: false,
} as Collector);

const { data: collector, pending } = await useFetch<Collector>(
    `/api/collector/${id}`,
);

updateCollector.name = collector.value?.name ?? updateCollector.name;
updateCollector.active = collector.value?.active ?? updateCollector.active;

const isLoading = ref(false);

async function handleUpdate() {
    isLoading.value = true;
    try {
        await $fetch(`/api/collector/${id}`, {
            method: "PUT",
            body: {
                name: updateCollector?.name,
                active: updateCollector?.active,
            },
        });
        alert("Datos actualizados correctamente.");
        router.push("/d/collectors/list");
    } catch (error) {
        alert("Error al actualizar.");
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="max-w-md mx-auto space-y-6">
        <header class="flex items-center gap-3 border-b border-base-300 pb-4">
            <button
                @click="router.back()"
                class="btn btn-sm btn-ghost btn-circle"
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
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <h1 class="text-xl font-black tracking-tight italic">
                Editar <span class="text-primary">Cobrador</span>
            </h1>
        </header>

        <div v-if="pending" class="flex justify-center p-10">
            <span class="loading loading-dots loading-lg text-primary"></span>
        </div>

        <div v-else class="card bg-base-200 border border-base-300 shadow-xl">
            <div class="card-body p-6">
                <form @submit.prevent="handleUpdate" class="space-y-6">
                    <div class="form-control">
                        <label class="label pt-0">
                            <span
                                class="label-text font-bold uppercase text-xs opacity-60"
                                >Nombre Completo</span
                            >
                        </label>
                        <input
                            v-model="updateCollector.name"
                            type="text"
                            class="input input-bordered bg-base-100 font-bold"
                            required
                        />
                    </div>

                    <div
                        class="form-control bg-base-100 p-4 rounded-xl border border-base-300"
                    >
                        <label class="label cursor-pointer p-0">
                            <span class="label-text font-bold"
                                >Estado de Disponibilidad</span
                            >
                            <input
                                v-model="updateCollector.active"
                                type="checkbox"
                                class="toggle toggle-primary"
                            />
                        </label>
                    </div>

                    <div class="card-actions flex-col gap-2 pt-4">
                        <button
                            type="submit"
                            class="btn btn-primary btn-block shadow-md"
                            :disabled="isLoading"
                        >
                            <span
                                v-if="isLoading"
                                class="loading loading-spinner"
                            ></span>
                            Guardar Cambios
                        </button>
                        <button
                            type="button"
                            @click="router.back()"
                            class="btn btn-ghost btn-block btn-sm opacity-50"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
