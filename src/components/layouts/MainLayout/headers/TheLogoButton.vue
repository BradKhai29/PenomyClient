<template>
    <q-btn flat no-caps no-wrap dense @click="goToHome">
        <q-avatar>
            <img src="/src/assets/logo/penomy.png" />
        </q-avatar>
        <span class="q-pl-sm text-weight-bold text-subtitle1">Penomy</span>
    </q-btn>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToHome() {
    router.push("/");
}
</script>
