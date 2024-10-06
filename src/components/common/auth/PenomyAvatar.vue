<template>
    <q-btn flat no-caps no-wrap dense @click="goToHome">
        <q-avatar>
            <img src="/src/assets/logo/penomy.png" />
        </q-avatar>
        <span class="q-pl-sm text-weight-bold text-h5">
            <span class="underline-primary">Penom</span>
            <span>y</span>
        </span>
    </q-btn>
</template>

<script setup>
import { useRouter } from "vue-router";

defineOptions({
    name: "PenomyAvatar",
});

const router = useRouter();

function goToHome() {
    router.push("/");
}
</script>
