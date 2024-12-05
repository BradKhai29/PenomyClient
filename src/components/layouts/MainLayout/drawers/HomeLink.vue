<template>
    <DrawerLink
        title="Trang chủ"
        icon="home"
        :link="homeLink"
        :isSelected="isSelected"
    />
</template>

<script>
// Import components section.
import DrawerLink from "components/layouts/DrawerLink.vue";

// Support constants for component.
const ROOT_PATH = "/";
const COMIC_ROOT_AREA_PATH = "/artwork/comic";
const ANIME_ROOT_AREA_PATH = "/artwork/anime";

// Init store.
import { useWatchingAreaStore } from "src/stores/common/WatchingAreaStore";
const watchingAreaStore = useWatchingAreaStore();

export default {
    name: "HomeLink",
    components: {
        DrawerLink,
    },
    computed: {
        homeLink() {
            if (watchingAreaStore.isComicArea) {
                return ROOT_PATH;
            }

            return ANIME_ROOT_AREA_PATH;
        },
        isSelected() {
            const currentPath = String(this.$route.path);

            return (
                currentPath == ROOT_PATH ||
                currentPath == COMIC_ROOT_AREA_PATH ||
                currentPath == ANIME_ROOT_AREA_PATH
            );
        },
    },
};
</script>
