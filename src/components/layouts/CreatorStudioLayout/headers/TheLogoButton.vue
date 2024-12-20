<template>
    <q-btn flat no-caps no-wrap dense @click="goToHome">
        <q-avatar>
            <img
                src="https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729522677/penomy_assets/penomy.png"
            />
        </q-avatar>
        <span class="q-pl-sm text-weight-bold text-subtitle1">
            Penomy Studio
        </span>
    </q-btn>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToHome() {
    router.push("/studio/overview");
}
</script>
