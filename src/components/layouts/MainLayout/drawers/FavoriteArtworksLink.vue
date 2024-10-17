<template>
    <DrawerLink
        title="Tác phẩm yêu thích"
        icon="favorite"
        link="/profile/user/favorite"
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
        if (newPath && newPath == `/profile/user/favorite`) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);
</script>
