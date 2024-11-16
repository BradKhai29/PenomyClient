<template>
    <DrawerLink
        :title="GroupName"
        icon="person"
        :link="toLink"
        :isSelected="isSelected"
    />
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import { useRoute } from "vue-router";
import DrawerLink from "components/layouts/DrawerLink.vue";

const route = useRoute();
const isSelected = ref(false);
const props = defineProps({
    GroupName: {
        type: String,
        required: true,
        default: "default",
    },
    GroupId: String
})
const toLink = `/social/group/${props.GroupName}`

watch(
    () => route.path,
    (newPath, _) => {
        if (newPath && newPath == `/social/group/:id`) {
            isSelected.value = true;
        } else {
            isSelected.value = false;
        }
    }
);
</script>
