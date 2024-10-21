<template>
    <DrawerLink
        title="Trang chủ"
        icon="home"
        link="/"
        :isSelected="isSelected"
    />
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();
const isSelected = ref(route.path == "/");

watch(
    () => route.path,
    (newPath, _) => {
        if (newPath && newPath == `/`) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);
</script>
