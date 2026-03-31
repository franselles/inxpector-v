<script setup lang="ts">
// Metadatos de página (opcional si usas middleware de admin)
definePageMeta({
    middleware: "auth",
    roles: 2,
});

const router = useRouter();
const isLoading = ref(false);

const formData = reactive({
    name: "",
    user: "",
    pass: "",
    rol: 1, // Por defecto rol de inspector
});

async function handleCreateInspector() {
    if (!formData.name || !formData.user || !formData.pass) {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    isLoading.value = true;
    try {
        await $fetch("/api/inspector", {
            method: "POST",
            body: {
                name: formData.name.toUpperCase(),
                user: formData.user.toUpperCase(),
                pass: formData.pass,
                rol: formData.rol,
            },
        });

        alert("Inspector creado correctamente.");

        navigateTo("/d/inspectors/list");
    } catch (error) {
        console.error("Error al crear:", error);
        alert(
            "Error al crear el inspector. Es posible que el usuario ya exista.",
        );
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="max-w-md mx-auto p-4 space-y-6">
        <header class="flex items-center gap-3 border-b border-base-300 pb-4">
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
            <h1 class="text-xl font-black tracking-tight">
                Nuevo <span class="text-primary">Inspector</span>
            </h1>
        </header>

        <div class="card bg-base-200 shadow-xl border border-base-300">
            <div class="card-body p-6">
                <form @submit.prevent="handleCreateInspector" class="space-y-4">
                    <div class="form-control">
                        <label class="label pt-0">
                            <span
                                class="label-text font-bold uppercase text-xs opacity-60"
                                >Nombre Real</span
                            >
                        </label>
                        <label
                            class="input input-bordered flex items-center gap-2 bg-base-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4 opacity-50"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm4.306 6.707C11.13 13.083 9.637 12 8 12s-3.13 1.083-4.306 2.707c.46.174.937.293 1.428.352a11.09 11.09 0 0 0 5.756 0c.491-.059.969-.178 1.428-.352Z"
                                />
                            </svg>
                            <input
                                v-model="formData.name"
                                type="text"
                                class="grow"
                                placeholder="Ej: Juan Pérez"
                                required
                            />
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label pt-0">
                            <span
                                class="label-text font-bold uppercase text-xs opacity-60"
                                >ID de Usuario</span
                            >
                        </label>
                        <label
                            class="input input-bordered flex items-center gap-2 bg-base-100"
                        >
                            <span class="text-sm opacity-50 font-bold">@</span>
                            <input
                                v-model="formData.user"
                                type="text"
                                class="grow"
                                placeholder="juanp88"
                                required
                            />
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label pt-0">
                            <span
                                class="label-text font-bold uppercase text-xs opacity-60"
                                >Contraseña Temporal</span
                            >
                        </label>
                        <label
                            class="input input-bordered flex items-center gap-2 bg-base-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="size-4 opacity-50"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <input
                                v-model="formData.pass"
                                type="password"
                                class="grow"
                                placeholder="••••••••"
                                required
                            />
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label pt-0">
                            <span
                                class="label-text font-bold uppercase text-xs opacity-60"
                                >Privilegios</span
                            >
                        </label>
                        <select
                            v-model.number="formData.rol"
                            class="select select-bordered w-full bg-base-100"
                        >
                            <option :value="1">Inspector Estándar</option>
                            <option :value="2">Administrador</option>
                        </select>
                    </div>

                    <div class="card-actions flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            class="btn btn-primary btn-block shadow-lg"
                            :disabled="isLoading"
                        >
                            <span
                                v-if="isLoading"
                                class="loading loading-spinner"
                            ></span>
                            {{ isLoading ? "Creando..." : "Crear Inspector" }}
                        </button>
                        <button
                            type="button"
                            @click="$router.back()"
                            class="btn btn-ghost btn-block btn-sm opacity-60"
                            :disabled="isLoading"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div
            class="alert bg-base-200 border-base-300 text-xs py-2 px-4 italic opacity-60"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-info shrink-0 w-4 h-4"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            <span
                >La contraseña será encriptada automáticamente antes de
                guardarse en la base de datos.</span
            >
        </div>
    </div>
</template>
