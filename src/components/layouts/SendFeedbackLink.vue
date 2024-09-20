<template>
    <DrawerLink
        title="Gửi phản hồi"
        icon="feedback"
        link="/"
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
        if (newPath && newPath == `/the2`) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);
</script>
