<template>
    <DrawerLink
        title="Tổng quan"
        icon="space_dashboard"
        link="/studio/overview"
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
        if (
            (newPath && newPath == `/studio`) ||
            newPath == `/studio/overview`
        ) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);
</script>
