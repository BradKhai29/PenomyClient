// stores/favorites.js
import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", {
    state: () => ({
        favoriteCount: 0,
    }),
    actions: {
        setFavoriteCount(count) {
            this.favoriteCount = count;
        },
    },
    getters: {
        getFavoriteCount() {
            return this.favoriteCount;
        },
    },
});
