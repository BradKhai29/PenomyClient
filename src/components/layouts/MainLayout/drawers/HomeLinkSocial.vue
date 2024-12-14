<template>
    <DrawerLink title="Trang chủ" icon="home" link="/social" :isSelected="isSelected" />
</template>

<script>
// Import components section.
import DrawerLink from "components/layouts/DrawerLink.vue";

export default {
    components: {
        DrawerLink,
    },
    computed: {
        isSelected() {
            const currentPath = String(this.$route.path);

            return (
                currentPath == ("/social")
            );
        },
    },
};
</script>
