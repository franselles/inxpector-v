<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession();
const credentials = reactive({
    email: "",
    password: "",
});

function clearCredentials() {
    credentials.email = "";
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
        if (result.role == "admin") {
            await navigateTo("/a/collectors");
            console.log(result);
        } else {
            await navigateTo("/");
        }
    } catch {
        clearCredentials();
    }
}
</script>

<template>
    <form @submit.prevent="login">
        <input v-model="credentials.email" type="email" placeholder="Email" />
        <input
            v-model="credentials.password"
            type="password"
            placeholder="Password"
        />
        <button type="submit">Login</button>
    </form>
</template>
