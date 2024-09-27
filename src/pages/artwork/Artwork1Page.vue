<template>
    <q-page class=""> </q-page>
</template>

<script setup>
import { useAuthStore } from "src/stores/common/AuthStore";
import { ref } from "vue";

const authStore = useAuthStore();

const counterInitValue = 0;
const counter = ref(counterInitValue);

function clickMe() {
    authStore.increment();
    counter.value = authStore.counter;
}

defineOptions({
    name: "IndexPage",
});
</script>
