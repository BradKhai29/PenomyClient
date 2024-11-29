import { defineStore } from "pinia";
import { GetPageCount } from "src/api.handlers/userProfile/UserProfile1Page";
import { ArtworkType } from "src/api.common/ArtworkType";

const getPageCount = GetPageCount;
//

const useProfileStore = defineStore("profileStore", {
    state: () => ({
        /**
         * The total number of comics created by the user.
         * @type {number}
         */
        totalComics: 0,
        /**
         * The total number of animations created by the user.
         * @type {number}
         */
        totalAnimations: 0,
        /**
         * The total number of series created by the user.
         * @type {number}
         */
        totalSeries: 0,
        /**
         * The comics created by the user, sorted by creation time.
         * @type {Array}
         */
        comics: [],
        /**
         * The animations created by the user, sorted by creation time.
         * @type {Array}
         */
        animations: [],
        /**
         * The series created by the user, sorted by creation time.
         * @type {Array}
         */
        series: [],
        /**
         * The number of pages in the comics list.
         * @type {number}
         */
        comicTotalPage: 0,
        /**
         * The number of pages in the animations list.
         * @type {number}
         */
        animationTotalPage: 0,
        /**
         * The number of pages in the series list.
         * @type {number}
         */
        seriesTotalPage: 0,
    }),

    getters: {
        /**
         * Get the page count for comics from the state.
         * @returns {number} The page count for comics.
         */
        comicPageCount() {
            return this.comicTotalPage;
        },
        /**
         * Get the page count for animations from the state.
         * @returns {number} The page count for animations.
         */
        animationPageCount() {
            return this.animationTotalPage;
        },
        /**
         * Get the page count for series from the state.
         * @returns {number} The page count for series.
         */
        seriePageCount() {
            return this.seriesTotalPage;
        },

        /**
         * Get the total number of comics created by the user.
         * @returns {number} The total number of comics.
         */
        comicCount() {
            return this.totalComics;
        },

        /**
         * Get the total number of animations created by the user.
         * @returns {number} The total number of animations.
         */
        animationCount() {
            return this.totalAnimations;
        },

        /**
         * Get the total number of series created by the user.
         * @returns {number} The total number of series.
         */
        seriesCount() {
            return this.totalSeries;
        },
    },

    actions: {
        /**
         * Initialize the profile store by setting the page count and total artwork.
         */
        setupProfileStore() {
            // Set the page count and total number of artworks from the API
            this.setPageCountAndTotalArtwork();
        },
        //********************************* */
        // Get page count from api then assign to local state
        //********************************* */
        async setPageCountAndTotalArtwork() {
            this.totalComics = await getPageCount(ArtworkType.COMIC);
            this.totalAnimations = await getPageCount(ArtworkType.ANIMATION);
            this.totalSeries = await getPageCount(ArtworkType.SERIES);

            this.comicTotalPage = Math.round(this.totalComics / 8 + 0.5);
            this.animationTotalPage = Math.round(
                this.totalAnimations / 8 + 0.5
            );
            this.seriesTotalPage = Math.round(this.totalSeries / 8 + 0.5);
            localStorage.setItem("page1", this.comicTotalPage);
            localStorage.setItem("page2", this.animationTotalPage);
            localStorage.setItem("page3", this.seriesTotalPage);
            localStorage.setItem("comic", this.totalComics);
            localStorage.setItem("animation", this.totalAnimations);
            localStorage.setItem("series", this.totalSeries);
        },

        //********************************* */
        // Get artwork in page from api then assign to local state
        //********************************* */
        async setArtworksByType(artworkType, list) {
            // var result = [];
            // result = await getArtworksByType(artworkType, currentPage);
            if (artworkType === ArtworkType.COMIC) {
                list.forEach((item) => {
                    this.comics.push(item);
                });
            } else if (artworkType === ArtworkType.ANIMATION)
                list.forEach((item) => {
                    this.animations.push(item);
                });
            else if (artworkType === ArtworkType.SERIES)
                list.forEach((item) => {
                    this.series.push(item);
                });
        },

        /**
         * Find the artworks in the page from the local state
         *
         * @param {ArtworkType} artworkType The type of the artworks to find
         * @param {number} currentPage The current page number
         * @returns {Array} The artworks in the current page
         */
        findArtworkByPage(artworkType, currentPage) {
            const startIndex = (currentPage - 1) * 8;
            const endIndex = currentPage * 8;

            if (artworkType === ArtworkType.COMIC) {
                return this.comics.slice(startIndex, endIndex);
            } else if (artworkType === ArtworkType.ANIMATION) {
                return this.animations.slice(startIndex, endIndex);
            } else if (artworkType === ArtworkType.SERIES) {
                return this.series.slice(startIndex, endIndex);
            }
        },
    },
});

export { useProfileStore };
