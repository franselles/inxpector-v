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
    <form @submit.prevent="login">
        <input v-model="credentials.user" type="text" placeholder="Usuario" />
        <input
            v-model="credentials.password"
            type="password"
            placeholder="Password"
        />
        <button type="submit">Login</button>
    </form>
</template>
