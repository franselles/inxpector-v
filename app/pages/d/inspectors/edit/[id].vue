<script setup lang="ts">
// Metadatos de página
definePageMeta({
    middleware: "auth",
    roles: 3, // Solo administradores
});

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isFetching = ref(true);

// El ID lo obtenemos de la URL, por ejemplo: /admin/inspectores/editar/[id]
const inspectorId = route.params.id;

const formData = reactive({
    name: "",
    user: "",
    pass: "", // Se deja vacío si no se desea cambiar
    rol: 1,
});

onMounted(async () => {
    try {
        const data = await $fetch(`/api/inspector/${inspectorId}`);
        if (data) {
            formData.name = data.name;
            formData.user = data.user;
            formData.rol = data.rol;
        }
    } catch (error) {
        console.error("Error al obtener inspector:", error);
        alert("No se pudo cargar la información del inspector.");
        router.back();
    } finally {
        isFetching.value = false;
    }
});

async function handleUpdateInspector() {
    if (!formData.name || !formData.user) {
        alert("El nombre y el usuario son obligatorios.");
        return;
    }

    isLoading.value = true;
    try {
        await $fetch(`/api/inspector/${inspectorId}`, {
            method: "PUT",
            body: {
                name: formData.name.toUpperCase(),
                user: formData.user.toUpperCase(),
                // Solo enviamos la contraseña si el admin escribió algo nuevo
                ...(formData.pass ? { pass: formData.pass } : {}),
                rol: formData.rol,
            },
        });

        alert("Inspector actualizado correctamente.");
        navigateTo("/d/inspectors/list"); // O la ruta de tu lista de inspectores
    } catch (error) {
        console.error("Error al actualizar:", error);
        alert("Hubo un error al intentar actualizar el perfil.");
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
                Editar <span class="text-primary">Inspector</span>
            </h1>
        </header>

        <div v-if="isFetching" class="flex flex-col gap-4">
            <div class="skeleton h-12 w-full"></div>
            <div class="skeleton h-12 w-full"></div>
            <div class="skeleton h-12 w-full"></div>
        </div>

        <div v-else class="card bg-base-200 shadow-xl border border-base-300">
            <div class="card-body p-6">
                <form @submit.prevent="handleUpdateInspector" class="space-y-4">
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
                                >Nueva Contraseña</span
                            >
                        </label>
                        <label
                            class="input input-bordered flex items-center gap-2 bg-base-100"
                        >
                            <input
                                v-model="formData.pass"
                                type="password"
                                class="grow"
                                placeholder="Dejar en blanco para no cambiar"
                            />
                        </label>
                        <label class="label">
                            <span class="label-text-alt opacity-50 italic"
                                >Solo rellena este campo si deseas cambiar la
                                clave actual.</span
                            >
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
                            <option :value="3">Superadmin</option>
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
                            {{
                                isLoading
                                    ? "Guardando cambios..."
                                    : "Actualizar Datos"
                            }}
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
    </div>
</template>
