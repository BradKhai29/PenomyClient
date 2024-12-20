<template>
    <DrawerLink title="Bài viết đã lưu" icon="bookmark" link="/social/posts/saved" :isSelected="isSelected" />
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();

const isSelected = computed(() => {
    const currentPath = String(route.path);

    return (
        currentPath == ("/social/posts/saved")
    );
})
</script>
