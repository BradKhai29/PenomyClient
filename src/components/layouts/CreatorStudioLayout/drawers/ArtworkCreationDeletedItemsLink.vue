<template>
    <DrawerLink
        title="Thùng rác"
        icon="delete"
        link="/studio/bin"
        :isSelected="isSelected"
        :hasBadge="hasDeletedItems"
    />
</template>

<script>
// Import components section.
import DrawerLink from "components/layouts/DrawerLink.vue";

// Init store for later operation.
import { useCreatorStore } from "src/stores/common/CreatorStore";
const creatorStore = useCreatorStore();

export default {
    name: "ArtworkCreationDeletedItemsLink",
    components: {
        DrawerLink,
    },
    computed: {
        isSelected() {
            const currentPath = this.$route.path;

            return String(currentPath).includes("/studio/bin");
        },
        hasDeletedItems() {
            return creatorStore.hasDeletedItems;
        },
    },
};
</script>
