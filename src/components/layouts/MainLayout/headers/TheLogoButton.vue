<template>
    <q-btn :to="homeLink" flat no-caps no-wrap dense>
        <q-avatar>
            <img
                src="https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729522677/penomy_assets/penomy.png"
            />
        </q-avatar>
        <span class="q-pl-sm text-weight-bold text-subtitle1">Penomy</span>
    </q-btn>
</template>

<script>
// Support constants for component.
const ROOT_PATH = "/";
const ANIME_ROOT_AREA_PATH = "/artwork/anime";

// Init store.
import { useWatchingAreaStore } from "src/stores/common/WatchingAreaStore";
const watchingAreaStore = useWatchingAreaStore();

export default {
    name: "TheLogoButton",
    computed: {
        homeLink() {
            if (watchingAreaStore.isComicArea) {
                return ROOT_PATH;
            }

            return ANIME_ROOT_AREA_PATH;
        },
    },
};
</script>
