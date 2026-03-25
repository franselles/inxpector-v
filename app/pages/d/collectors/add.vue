<script setup lang="ts">
const router = useRouter();
const isLoading = ref(false);

const formData = reactive({
    name: "",
    active: true, // Por defecto el cobrador se crea activo
});

async function handleCreateCollector() {
    if (!formData.name) {
        alert("El nombre del cobrador es obligatorio.");
        return;
    }

    isLoading.value = true;

    try {
        await $fetch("/api/collectors", {
            method: "POST",
            body: {
                name: formData.name.toUpperCase(),
                active: formData.active,
            },
        });

        alert("Cobrador registrado con éxito.");
        navigateTo("/d");
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al crear el cobrador.");
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="max-w-md mx-auto p-4 space-y-6">
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
            <h1 class="text-xl font-black tracking-tight">
                Nuevo <span class="text-primary">Cobrador</span>
            </h1>
        </header>

        <div class="card bg-base-200 shadow-xl border border-base-300">
            <div class="card-body p-6">
                <form @submit.prevent="handleCreateCollector" class="space-y-6">
                    <div class="form-control">
                        <label class="label pt-0">
                            <span
                                class="label-text font-bold uppercase text-xs opacity-60"
                                >Nombre del Trabajador</span
                            >
                        </label>
                        <input
                            v-model="formData.name"
                            type="text"
                            placeholder="Ej: Carlos Ruiz"
                            class="input input-bordered w-full bg-base-100 font-semibold focus:input-primary"
                            required
                        />
                    </div>

                    <div
                        class="form-control bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm"
                    >
                        <label class="label cursor-pointer p-0">
                            <div class="flex flex-col">
                                <span class="label-text font-bold"
                                    >Estado Inicial</span
                                >
                                <span class="text-[10px] opacity-50 uppercase"
                                    >¿Puede recibir inspecciones?</span
                                >
                            </div>
                            <input
                                v-model="formData.active"
                                type="checkbox"
                                class="toggle toggle-primary"
                                checked
                            />
                        </label>
                    </div>

                    <div class="card-actions flex-col gap-3 pt-2">
                        <button
                            type="submit"
                            class="btn btn-primary btn-block shadow-lg"
                            :disabled="isLoading"
                        >
                            <span
                                v-if="isLoading"
                                class="loading loading-spinner"
                            ></span>
                            {{
                                isLoading
                                    ? "Registrando..."
                                    : "Registrar Cobrador"
                            }}
                        </button>
                        <button
                            type="button"
                            @click="router.back()"
                            class="btn btn-ghost btn-block btn-sm opacity-60"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div
            class="flex items-start gap-3 p-4 bg-info/10 border border-info/20 rounded-xl text-info-content text-sm"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <p>
                Una vez creado, el cobrador aparecerá automáticamente en la
                lista de inspección de todos los inspectores.
            </p>
        </div>
    </div>
</template>
