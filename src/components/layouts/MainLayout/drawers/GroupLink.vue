<template>
    <DrawerLink v-if="group != null" :title="group.name" :link="toLink" :isSelected="isSelected"
        :createdAt="group.createdAt" :image="group.coverImgUrl" />
    <DrawerLink v-if="group == null" :title="'Xem tất cả'" link="toLink" :isSelected="false" :createdAt="''" />

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
const toLink = props.group == null ? `/social/group/create` : `/social/group/${props.group.id}`
onMounted(() => {
    if (props.group != null) {

        if (route.path.indexOf(`/social/group/${props.group.id}`) != -1) {
            isSelected.value = true;
        }
    }
})
watch(
    () => route.path,
    (newPath, _) => {
        if (props.group != null) {
            if (newPath && newPath.indexOf(`/social/group/${props.group.id}`) != -1) {
                isSelected.value = true;
            } else {
                isSelected.value = false;
            }
        }
    }
);

</script>
