<template>
    <DrawerLink title="Kênh chat" icon="chat" link="/chat/recommended" :isSelected="isSelected" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();

const isSelected = computed(() => {
    const currentPath = String(route.path);

    return (
        currentPath == ("/chat/recommended")
    );
})
</script>
