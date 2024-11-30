import { defineStore } from "pinia";

const WatchingAreas = {
    COMIC: 1,
    ANIME: 2,
};

const useWatchingAreaStore = defineStore("watchingAreaStore", {
    state: () => ({
        area: WatchingAreas.COMIC,
    }),

    getters: {
        /**
         * Get the current area that selected by the user.
         * @returns {Number} The area value that user currently selected.
         */
        currentArea() {
            return this.area;
        },
        isComicArea() {
            return this.area == WatchingAreas.COMIC;
        },
        isAnimeArea() {
            return this.area == WatchingAreas.ANIME;
        },
    },

    actions: {
        setComicArea() {
            this.area = WatchingAreas.COMIC;
        },
        setAnimeArea() {
            this.area = WatchingAreas.ANIME;
        },
    },
});

export { useWatchingAreaStore, WatchingAreas };
