import { defineStore } from "pinia";

const WatchingAreas = {
    COMIC: 1,
    ANIME: 2,
};

const lastVisitPathKeyName = "user:last_visit_path";

function internalSaveLastVisitPath(path) {
    localStorage.setItem(lastVisitPathKeyName, path);
}

function loadLastVisitPath() {
    localStorage.getItem(lastVisitPathKeyName);
}

const useWatchingAreaStore = defineStore("watchingAreaStore", {
    state: () => ({
        area: WatchingAreas.COMIC,
        lastVisitRoutePath: null,
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
        lastVisitPath() {
            return this.lastVisitRoutePath;
        },
        hasLastVisitPath() {
            return this.lastVisitPath != null;
        },
    },

    actions: {
        setUp() {
            this.lastVisitRoutePath = loadLastVisitPath();
        },
        setComicArea() {
            this.area = WatchingAreas.COMIC;
        },
        setAnimeArea() {
            this.area = WatchingAreas.ANIME;
        },
        setLastVisitPath(path) {
            console.log(path);

            this.lastVisitRoutePath = path;

            internalSaveLastVisitPath(path);
        },
    },
});

export { useWatchingAreaStore, WatchingAreas };
