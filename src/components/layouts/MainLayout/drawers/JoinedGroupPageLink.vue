<template>
    <DrawerLink title="Nhóm" icon="groups" link="/social/groups" :isSelected="isSelected" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";
import { useAuthStore } from "src/stores/common/AuthStore";

const route = useRoute();
const authStore = useAuthStore();

const toLink = authStore.bearerAccessToken().length == 11 ? "/social/groups/joined" : "/auth/login"

const isSelected = computed(() => {
    const currentPath = String(route.path);

    return (
        currentPath == ("/social/groups/joined")
    );
})
</script>
