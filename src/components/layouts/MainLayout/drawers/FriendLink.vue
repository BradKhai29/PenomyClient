<template>
    <DrawerLink title="Bạn bè" icon="group" link="/social/friends" :isSelected="isSelected" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();

const isSelected = computed(() => {
    const currentPath = String(route.path);

    return (
        currentPath == ("/social/friends")
    );
})
</script>
