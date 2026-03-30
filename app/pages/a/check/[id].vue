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

interface Collectors {
    id: number;
    name: string;
    active: boolean;
}

interface GeoResult {
    coords: GeolocationCoordinates | null;
    error: string | null;
}

// 3. Carga de Datos (SSR por defecto en Nuxt 4)
const { data: cities } = await useFetch<City[]>("/api/cities");
const { data: allSectors } = await useFetch<Sector[]>("/api/sectors");
const { data: collector } = await useFetch<Collectors>(`/api/collector/${id}`);

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

const coords = ref<GeolocationCoordinates | null>(null);
let watchId: number | null = null;

onMounted(() => {
    watchId = navigator.geolocation.watchPosition(
        (position) => {
            // Cada vez que el GPS mejore la precisión, esto se actualiza solo
            coords.value = position.coords;
            //console.log("Nueva precisión:", position.coords.accuracy, "metros");
        },
        (err) => {
            console.warn("Error de ubicación:", err);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        },
    );
});

onUnmounted(() => {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
    }
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

const totalFailed = computed(() => {
    return (
        formData.failed_beds +
        formData.failed_umbrellas +
        formData.failed_boats +
        formData.failed_padel
    );
});

// 6. Función de Envío
async function handleSubmit() {
    if (!formData.sector_id) {
        alert("Por favor, selecciona un sector antes de guardar.");
        return;
    }

    isLoading.value = true;

    try {
        /*
        // A. Obtener Geolocalización
        const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000,
                });
            },
        ).catch((err) => {
            console.warn("Geo bloqueada o error:", err);
            return null;
        });
        */
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
            lat: coords.value?.latitude || 0,
            lng: coords.value?.longitude || 0,
        };

        // C. Guardar en Base de Datos
        await $fetch("/api/check", {
            method: "POST",
            body: payload,
        });

        alert("¡Inspección guardada con éxito!");
        // Aquí podrías usar navigateTo('/') si quieres redirigir
        navigateTo("/a/collectors");
    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Error crítico al procesar el formulario.");
        navigateTo("/a/collectors");
    } finally {
        isLoading.value = false;
    }
}

const handleCancel = () => {
    if (
        confirm("¿Estás seguro de que quieres cancelar? Perderás los cambios.")
    ) {
        Object.assign(formData, {
            collector_id: null,
            inspector_id: null,
            lat: 0,
            lng: 0,
            time_in: null,
            time_out: null,
            date_inform: null,
            city_id: 0,
            sector_id: null,
            comments: "",
            failed_beds: 0,
            failed_umbrellas: 0,
            failed_boats: 0,
            failed_padel: 0,
        });
    }
    navigateTo("/a/collectors");
};
</script>

<template>
    <div class="max-w-2xl mx-auto p-4 pb-12 space-y-6">
        <header class="flex flex-col gap-2 border-b border-base-300 pb-4">
            <div class="flex items-center gap-2">
                <button
                    @click="$router.back()"
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
                <h1 class="text-xl font-black tracking-tight leading-tight">
                    Inspección cobrador
                </h1>
            </div>

            <div
                class="flex items-center justify-between bg-base-200 px-3 py-2 rounded-lg"
            >
                <div class="flex flex-col">
                    <span class="text-[10px] uppercase opacity-50 font-bold"
                        >Cobrador</span
                    >
                    <span class="text-sm font-bold">{{
                        collector?.name || "Cargando..."
                    }}</span>
                </div>
                <div class="flex flex-col items-end">
                    <span class="text-[10px] uppercase opacity-50 font-bold"
                        >Inspector</span
                    >
                    <span class="badge badge-sm badge-neutral">{{
                        user?.name
                    }}</span>
                </div>
            </div>
        </header>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <section class="space-y-4">
                <div class="flex items-center gap-2 px-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <h2
                        class="text-sm font-bold uppercase opacity-60 tracking-wider"
                    >
                        Ubicación
                    </h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div class="form-control w-full">
                        <select
                            v-model.number="formData.city_id"
                            class="select select-bordered w-full font-bold"
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

                    <div class="form-control w-full">
                        <select
                            v-model.number="formData.sector_id"
                            class="select select-bordered w-full font-bold"
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
            </section>

            <section class="space-y-4">
                <div class="flex items-center gap-2 px-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                    <h2
                        class="text-sm font-bold uppercase opacity-60 tracking-wider"
                    >
                        Control de No Vendidos
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-3">
                    <div
                        v-for="(label, key) in {
                            failed_beds: 'Hamacas',
                            failed_umbrellas: 'Sombrillas',
                            failed_boats: 'Patines',
                            failed_padel: 'PadelSurf',
                        }"
                        :key="key"
                        class="flex items-center justify-between bg-base-100 border border-base-300 p-3 rounded-xl shadow-sm"
                    >
                        <span class="font-bold pl-2 text-base-content/80">{{
                            label
                        }}</span>
                        <div class="flex items-center gap-1">
                            <button
                                type="button"
                                @click="
                                    formData[key] > 0 ? formData[key]-- : null
                                "
                                class="btn btn-square btn-sm btn-outline border-base-300"
                            >
                                -
                            </button>
                            <input
                                v-model.number="formData[key]"
                                type="number"
                                class="input input-sm w-16 text-center font-black text-lg p-0 focus:outline-none bg-transparent"
                            />
                            <button
                                type="button"
                                @click="formData[key]++"
                                class="btn btn-square btn-sm btn-primary"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="form-control space-y-2">
                <label class="label px-1">
                    <span
                        class="label-text font-bold uppercase opacity-60 text-xs"
                        >Comentarios e Incidencias</span
                    >
                </label>
                <textarea
                    v-model="formData.comments"
                    class="textarea textarea-bordered h-24 text-base"
                    placeholder="¿Alguna novedad relevante?"
                ></textarea>
            </section>

            <div
                v-if="totalFailed > 0"
                class="alert alert-warning shadow-sm mb-4"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <span
                    >Se han registrado
                    <strong>{{ totalFailed }}</strong> elementos no
                    vendidos.</span
                >
            </div>

            <div class="flex flex-col gap-3 pt-4">
                <button
                    type="submit"
                    class="btn btn-primary btn-lg shadow-lg"
                    :disabled="isLoading"
                >
                    <span
                        v-if="isLoading"
                        class="loading loading-spinner"
                    ></span>
                    {{ isLoading ? "Guardando..." : "Finalizar y Guardar" }}
                </button>
                <button
                    type="button"
                    @click="handleCancel"
                    class="btn btn-ghost btn-sm opacity-50"
                    :disabled="isLoading"
                >
                    Descartar Cambios
                </button>
            </div>
        </form>
    </div>
</template>
