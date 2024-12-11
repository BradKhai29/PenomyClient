<template>
    <div>
        <q-btn color="dark" no-caps dense class="bg-dark area-button">
            <div class="row items-center no-wrap">
                <q-icon :name="selectedArea.icon" />
                <div class="text-center" style="width: 80px">
                    {{ selectedArea.name }}
                </div>
            </div>
            <q-menu
                v-model="showMenu"
                transition-show="jump-down"
                transition-hide="jump-up"
                :offset="[0, 8]"
                fit
            >
                <q-list>
                    <q-item
                        :active="isComicArea"
                        active-class="bg-dark text-light"
                        v-close-popup
                        clickable
                        @click="setComicArea"
                    >
                        <div class="flex items-center">
                            <q-icon :name="comicArea.icon" size="sm" />
                            <span class="q-ml-sm">{{ comicArea.name }}</span>
                        </div>
                    </q-item>
                    <q-item
                        :active="isAnimeArea"
                        active-class="bg-dark text-light"
                        v-close-popup
                        clickable
                        @click="setAnimeArea"
                    >
                        <div class="flex items-center">
                            <q-icon :name="animeArea.icon" size="sm" />
                            <span class="q-ml-sm">{{ animeArea.name }}</span>
                        </div>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </div>
</template>

<script>
// Support constants for component.
const COMIC_ROOT_AREA_PATH = "/artwork/comic";
const ANIME_ROOT_AREA_PATH = "/artwork/anime";

// Init store for later operation.
import { useWatchingAreaStore } from "src/stores/common/WatchingAreaStore";
import { useAuthStore } from "src/stores/common/AuthStore";
import { useRoute } from "vue-router";

const watchingAreaStore = useWatchingAreaStore();
watchingAreaStore.setUp();
const authStore = useAuthStore();

export default {
    name: "TheWatchingAreaDropdown",
    data() {
        return {
            showMenu: false,
            routeObject: null,
        };
    },
    computed: {
        comicArea() {
            return {
                name: "Truyện tranh",
                icon: "palette",
                isSelected: true,
                routePath: "/artwork/comic",
            };
        },
        animeArea() {
            return {
                name: "Hoạt hình",
                icon: "videocam",
                isSelected: false,
                routePath: "/artwork/anime",
            };
        },
        selectedArea() {
            if (this.isComicArea) {
                return this.comicArea;
            }

            return this.animeArea;
        },
        isComicArea() {
            return watchingAreaStore.isComicArea;
        },
        /**
         * @returns {String} The value of the current path that visited by the user.
         */
        currentPath() {
            if (this.routeObject) {
                return this.routeObject.fullPath;
            }

            return "";
        },
        isAnimeArea() {
            return watchingAreaStore.isAnimeArea;
        },
    },
    methods: {
        setComicArea() {
            watchingAreaStore.setComicArea();
            this.showMenu = false;

            // Redirect user to homepage of the comic area.
            this.$router.push(this.comicArea.routePath);
        },
        setAnimeArea() {
            watchingAreaStore.setAnimeArea();
            this.showMenu = false;

            // Redirect user to homepage of the anime area.
            this.$router.push(this.animeArea.routePath);
        },
    },
    beforeMount() {
        // Check the current path to specify the watching area.
        if (this.currentPath.includes(COMIC_ROOT_AREA_PATH)) {
            watchingAreaStore.setComicArea();
            return;
        }

        if (this.currentPath.includes(ANIME_ROOT_AREA_PATH)) {
            watchingAreaStore.setAnimeArea();
        }
    },
    watch: {
        /**
         * Tracking the change in the path to specify the watching area.
         */
        "$route.path": {
            handler(newValue, _) {
                if (newValue.includes(COMIC_ROOT_AREA_PATH)) {
                    watchingAreaStore.setComicArea();

                    return;
                }

                if (newValue.includes(ANIME_ROOT_AREA_PATH)) {
                    watchingAreaStore.setAnimeArea();
                }

                // Set the redirect path for user re-visit when login success.
                if (!authStore.isAuth) {
                    watchingAreaStore.setLastVisitPath(newValue);
                }
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>

<style scoped>
.area-button {
    border-radius: 6.4px;
    padding: 6.4px !important;
}
</style>
