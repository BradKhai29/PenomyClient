<template>
    <DrawerLink
        title="Quản lý chung"
        icon="palette"
        link="/studio/artworks"
        :isSelected="isSelected"
    />
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();
const isSelected = ref(false);

watch(
    () => route.path,
    (newPath, _) => {
        if (newPath && newPath == `/studio/artworks`) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);
</script>
