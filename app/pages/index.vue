<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const credentials = reactive({
    user: "",
    password: "",
});

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
            await navigateTo("/d/dash");
        }
    } catch {
        clearCredentials();
    }
}
</script>

<template>
    <div class="max-w-2xl mx-auto p-4">
        <form @submit.prevent="login">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input
                    v-model="credentials.user"
                    type="text"
                    placeholder="Usuario"
                    class="input input-bordered w-full"
                />
                <input
                    v-model="credentials.password"
                    type="password"
                    placeholder="Password"
                    class="input input-bordered w-full"
                />
                <button type="submit" class="btn btn-primary flex-1">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>
