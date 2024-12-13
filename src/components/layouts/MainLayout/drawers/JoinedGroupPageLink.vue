<template>
    <DrawerLink title="Nhóm" icon="groups" link="/social/groups/joined" :isSelected="isSelected" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();

const isSelected = computed(() => {
    const currentPath = String(route.path);

    return (
        currentPath == ("/social/groups/joined")
    );
})
</script>
