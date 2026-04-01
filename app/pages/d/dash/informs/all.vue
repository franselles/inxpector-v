<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    roles: 2,
});

const { data: reports, refresh, pending } = await useFetch("/api/allinforms");

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Función para abrir Google Maps
const openMap = (lat: string, lng: string) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
};

// Función para eliminar (aquí llamarías a tu API de delete)
const deleteReport = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este informe?")) {
        // await $fetch(`/api/reports/${id}`, { method: 'DELETE' })
        // refresh()
        console.log("Eliminando reporte:", id);
    }
};
</script>

<template>
    <div class="space-y-6">
        <header class="flex justify-between items-center px-2">
            <div>
                <h1 class="text-2xl font-black tracking-tight">
                    Registro de <span class="text-primary">Informes</span>
                </h1>
                <p class="text-xs opacity-50 uppercase font-bold text-pretty">
                    Historial de inspecciones e incidencias en playa
                </p>
            </div>
            <button
                @click="() => refresh()"
                class="btn btn-circle btn-ghost btn-sm"
                :class="{ 'animate-spin': pending }"
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                </svg>
            </button>
        </header>

        <div
            class="bg-base-100 rounded-box shadow-md border border-base-300 overflow-hidden"
        >
            <div class="overflow-x-auto">
                <table class="table table-sm md:table-md table-zebra w-full">
                    <thead class="bg-base-200">
                        <tr class="text-xs uppercase opacity-70">
                            <th>Fecha / Hora</th>
                            <th>Ubicación / GPS</th>
                            <th>Personal</th>
                            <th class="text-center">Hamc/Somb</th>
                            <th class="text-center">Patines</th>
                            <th class="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="report in reports" :key="report.id">
                            <tr class="hover:bg-base-200/50 border-b-0">
                                <td>
                                    <div class="font-bold text-xs md:text-sm">
                                        {{
                                            formatDate(report.date_inform || "")
                                        }}
                                    </div>
                                    <div class="text-[10px] opacity-60">
                                        {{ formatTime(report.time_in || "") }} -
                                        {{ formatTime(report.time_out || "") }}
                                    </div>
                                </td>

                                <td>
                                    <div
                                        class="font-bold text-primary text-xs uppercase leading-tight"
                                    >
                                        {{ report.sectors?.cities?.name }}
                                    </div>
                                    <div class="text-[10px] opacity-70 mb-1">
                                        {{ report.sectors?.name }}
                                    </div>
                                    <button
                                        @click="openMap(report.lat, report.lng)"
                                        class="btn btn-xs btn-outline btn-info gap-1 normal-case font-medium"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="size-3"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
                                            />
                                        </svg>
                                        GPS
                                    </button>
                                </td>

                                <td class="text-xs">
                                    <div class="opacity-60 italic text-[10px]">
                                        I: {{ report.inspectors?.name }}
                                    </div>
                                    <div class="font-bold text-base-content/80">
                                        C: {{ report.collectors?.name }}
                                    </div>
                                </td>

                                <td class="text-center">
                                    <div class="flex gap-1 justify-center">
                                        <div
                                            :class="
                                                report.failed_beds || 0 > 0
                                                    ? 'badge-error'
                                                    : 'badge-ghost'
                                            "
                                            class="badge badge-xs font-bold px-2"
                                        >
                                            {{ report.failed_beds }} H
                                        </div>
                                        <div
                                            :class="
                                                report.failed_umbrellas || 0 > 0
                                                    ? 'badge-error'
                                                    : 'badge-ghost'
                                            "
                                            class="badge badge-xs font-bold px-2"
                                        >
                                            {{ report.failed_umbrellas }} S
                                        </div>
                                    </div>
                                </td>

                                <td class="text-center">
                                    <div
                                        class="flex flex-wrap gap-1 justify-center max-w-25 mx-auto"
                                    >
                                        <div
                                            v-if="report.failed_boats || 0 > 0"
                                            class="badge badge-xs badge-warning font-black text-[9px]"
                                        >
                                            {{ report.failed_boats }} P
                                        </div>
                                        <div
                                            v-if="report.failed_padel || 0 > 0"
                                            class="badge badge-xs badge-secondary font-black text-[9px]"
                                        >
                                            {{ report.failed_padel }} D
                                        </div>
                                        <span
                                            v-if="
                                                report.failed_boats === 0 &&
                                                report.failed_padel === 0
                                            "
                                            class="text-xs opacity-20"
                                            >-</span
                                        >
                                    </div>
                                </td>

                                <td class="text-right">
                                    <button
                                        @click="deleteReport(report.id)"
                                        class="btn btn-ghost btn-xs text-error btn-square"
                                        disabled
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
                                </td>
                            </tr>

                            <tr
                                v-if="
                                    report.comments &&
                                    report.comments.trim() !== ''
                                "
                                class="bg-base-200/30"
                            >
                                <td colspan="6" class="py-2 px-4">
                                    <div class="flex items-start gap-2">
                                        <div
                                            class="badge text-[10px] font-bold uppercase mt-0.5"
                                        >
                                            Incidencia:
                                        </div>
                                        <p
                                            class="text-xs italic opacity-80 leading-relaxed"
                                        >
                                            "{{ report.comments }}"
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div
                v-if="!reports?.length && !pending"
                class="p-20 text-center opacity-40 italic"
            >
                No se han encontrado informes registrados.
            </div>

            <div v-if="pending" class="p-20 text-center">
                <span
                    class="loading loading-dots loading-lg text-primary"
                ></span>
            </div>
        </div>
    </div>
</template>
