<template>
    <DrawerLink title="Mạng xã hội" icon="group" link="/social" :isSelected="isSelected" />
</template>

<script setup>
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();

watch(
    () => route.path,
    (newPath, _) => {
        if (newPath && newPath == `/social`) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);

const isSelected = computed(() => {
    const currentPath = String(route.path);

    return (
        currentPath.includes("/social")
    );
})
</script>
