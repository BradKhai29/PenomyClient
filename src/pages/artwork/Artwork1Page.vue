<template>
    <q-page class="">
        <img
            alt="Quasar logo"
            src="~assets/quasar-logo-vertical.svg"
            style="width: 200px; height: 200px"
        />

        <div>
            <p>This is counter: {{ counter }}</p>
            <button @click="clickMe">Click me ++</button>
        </div>
    </q-page>
</template>

<script setup>
import { useAuthStore } from "stores/AuthStore";
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
