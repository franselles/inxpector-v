<script setup lang="ts">
// 1. Hooks de Nuxt y sesión
const { user } = useUserSession();
const route = useRoute();
const id = route.params.id; // ID del cobrador desde la URL

// Estados de control de la UI
const isLoading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

// 2. Interfaces de Datos
interface City {
    id: number;
    name: string;
}

interface Sector {
    id: number;
    name: string;
    active: boolean;
    city_id: number;
}

// 3. Carga de Datos (SSR por defecto en Nuxt 4)
const { data: cities } = await useFetch<City[]>("/api/cities");
const { data: allSectors } = await useFetch<Sector[]>("/api/sectors");

// 4. Estado reactivo del formulario
const formData = reactive({
    city_id: 0,
    sector_id: null as number | null,
    comments: "",
    failed_beds: 0,
    failed_umbrellas: 0,
    failed_boats: 0,
    failed_padel: 0,
});

// 5. Lógica de Filtrado Dinámico
// Se ejecuta automáticamente cada vez que formData.city_id cambia
const filteredSectors = computed(() => {
    if (!allSectors.value) return [];
    return allSectors.value.filter((s) => s.city_id === formData.city_id);
});

// Resetear sector seleccionado si se cambia la ciudad
watch(
    () => formData.city_id,
    () => {
        formData.sector_id = null;
    },
);

// 6. Función de Envío
async function handleSubmit() {
    if (!formData.sector_id) {
        alert("Por favor, selecciona un sector antes de guardar.");
        return;
    }

    isLoading.value = true;

    try {
        // A. Obtener Geolocalización
        const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                });
            },
        ).catch((err) => {
            console.warn("Geo bloqueada o error:", err);
            return null;
        });

        const now = new Date();

        // B. Construir objeto final (Payload)
        const payload = {
            ...formData,
            inspector_id: user.value?.id || null,
            collector_id: Number(id) || null,
            // Metadatos automáticos
            date_inform: now,
            time_in: now,
            time_out: now,
            lat: position?.coords.latitude || 0,
            lng: position?.coords.longitude || 0,
        };

        // C. Guardar en Base de Datos
        await $fetch("/api/check", {
            method: "POST",
            body: payload,
        });

        alert("¡Inspección guardada con éxito!");
        // Aquí podrías usar navigateTo('/') si quieres redirigir
    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Error crítico al procesar el formulario.");
    } finally {
        isLoading.value = false;
    }
}

const handleCancel = () => {
    if (
        confirm("¿Estás seguro de que quieres cancelar? Perderás los cambios.")
    ) {
        Object.assign(formData, {
            city_id: 0,
            sector_id: null,
            comments: "",
            failed_beds: 0,
            failed_umbrellas: 0,
            failed_boats: 0,
            failed_padel: 0,
        });
    }
};
</script>

<template>
    <div class="max-w-2xl mx-auto p-4">
        <header class="mb-6">
            <h1 class="text-2xl font-bold">Inspección: Cobrador {{ id }}</h1>
            <div class="flex items-center gap-2 text-sm opacity-70">
                <span
                    >Inspector: <strong>{{ user?.name }}</strong></span
                >
                <span class="badge badge-sm badge-outline uppercase">{{
                    user?.roles
                }}</span>
            </div>
        </header>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <fieldset
                class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
            >
                <legend class="fieldset-legend font-bold">Ubicación</legend>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">Ciudad</label>
                        <select
                            v-model.number="formData.city_id"
                            class="select select-bordered w-full"
                        >
                            <option :value="0" disabled>
                                Seleccione ciudad
                            </option>
                            <option
                                v-for="city in cities"
                                :key="city.id"
                                :value="city.id"
                            >
                                {{ city.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-control">
                        <label class="label">Sector</label>
                        <select
                            v-model.number="formData.sector_id"
                            class="select select-bordered w-full"
                            :disabled="!formData.city_id"
                        >
                            <option :value="null">
                                {{
                                    formData.city_id
                                        ? "Seleccione sector"
                                        : "Elija ciudad primero"
                                }}
                            </option>
                            <option
                                v-for="sector in filteredSectors"
                                :key="sector.id"
                                :value="sector.id"
                            >
                                {{ sector.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </fieldset>

            <fieldset
                class="fieldset bg-base-200 border-base-300 rounded-box border p-4"
            >
                <legend class="fieldset-legend font-bold">
                    Inventario Defectuoso
                </legend>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="form-control">
                        <label class="label text-xs">Camas</label>
                        <input
                            v-model.number="formData.failed_beds"
                            type="number"
                            min="0"
                            class="input input-bordered w-full"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label text-xs">Sombrillas</label>
                        <input
                            v-model.number="formData.failed_umbrellas"
                            type="number"
                            min="0"
                            class="input input-bordered w-full"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label text-xs">Patines</label>
                        <input
                            v-model.number="formData.failed_boats"
                            type="number"
                            min="0"
                            class="input input-bordered w-full"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label text-xs">PadelSurf</label>
                        <input
                            v-model.number="formData.failed_padel"
                            type="number"
                            min="0"
                            class="input input-bordered w-full"
                        />
                    </div>
                </div>
            </fieldset>

            <div class="form-control">
                <label class="label font-bold">Comentarios</label>
                <textarea
                    v-model="formData.comments"
                    class="textarea textarea-bordered h-28"
                    placeholder="Notas de la inspección..."
                ></textarea>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    type="submit"
                    class="btn btn-primary flex-1"
                    :disabled="isLoading"
                >
                    <span
                        v-if="isLoading"
                        class="loading loading-spinner"
                    ></span>
                    {{
                        isLoading
                            ? "Guardando datos..."
                            : "Finalizar Inspección"
                    }}
                </button>
                <button
                    type="button"
                    class="btn btn-ghost"
                    @click="handleCancel"
                    :disabled="isLoading"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</template>
