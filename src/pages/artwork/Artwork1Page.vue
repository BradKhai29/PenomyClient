<template>
    <q-page class="">
        <img
            alt="Quasar logo"
            src="~assets/quasar-logo-vertical.svg"
            style="width: 200px; height: 200px"
        />
        <q-img
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            spinner-color="white"
            style="height: 140px; max-width: 150px; padding: 0px"
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
