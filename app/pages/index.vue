<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const credentials = reactive({
    user: "",
    password: "",
});

const isLoading = ref(false);

function clearCredentials() {
    credentials.user = "";
    credentials.password = "";
}

async function login() {
    try {
        const result = await $fetch("/api/login", {
            method: "POST",
            body: credentials,
        });

        // Refresh the session on client-side and redirect to the home page
        await refreshSession();
        if (result.roles == 1) {
            await navigateTo("/a/collectors");
        } else if (result.roles == 2) {
            await navigateTo("/d");
        }
    } catch {
        clearCredentials();
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4 bg-base-100">
        <div
            class="card bg-base-200 w-full max-w-sm shadow-xl border border-base-300"
        >
            <div class="card-body">
                <div class="text-center mb-4">
                    <h2 class="card-title justify-center text-2xl font-bold">
                        Acceso
                    </h2>
                    <p class="text-sm opacity-60">
                        Ingresa tus credenciales de inspector
                    </p>
                </div>

                <form @submit.prevent="login" class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold"
                                >Usuario</span
                            >
                        </label>
                        <input
                            v-model="credentials.user"
                            type="text"
                            placeholder="Ej: MARIO"
                            class="input input-bordered w-full focus:input-primary"
                            required
                        />
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-semibold"
                                >Contraseña</span
                            >
                        </label>
                        <input
                            v-model="credentials.password"
                            type="password"
                            placeholder="••••••••"
                            class="input input-bordered w-full focus:input-primary"
                            required
                        />
                    </div>

                    <div class="card-actions mt-6">
                        <button
                            type="submit"
                            class="btn btn-primary btn-block shadow-lg"
                            :disabled="isLoading"
                        >
                            <span
                                v-if="isLoading"
                                class="loading loading-spinner"
                            ></span>
                            {{ isLoading ? "Entrando..." : "Iniciar Sesión" }}
                        </button>
                    </div>
                </form>

                <div class="text-center mt-4">
                    <span class="text-xs opacity-40"
                        >v0.0.14 en desarrollo</span
                    >
                </div>
                <div class="text-center mt-4">
                    <span class="text-xs opacity-40"
                        >Sistema control de Inspecciones R.A. BENIDORM
                        S.L.</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
