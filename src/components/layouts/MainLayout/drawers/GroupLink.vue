<template>
    <DrawerLink :title="group.name" :image="group.coverImgUrl" :link="toLink" :isSelected="isSelected" :createdAt="group.createdAt"/>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerGroupLink.vue";

const route = useRoute();
const isSelected = ref(false);
const props = defineProps({
    group: Object,
})
const toLink = `/social/group/${props.group.id}`
onMounted(() => {
    if (route.path == `/social/group/${props.group.id}`) {
        isSelected.value = true;
    }
})
watch(
    () => route.path,
    (newPath, _) => {
        if (newPath && newPath == `/social/group/${props.group.id}`) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);
</script>
