import { defineStore } from "pinia";
import {
    GetPageCount,
    GetArtworksByType,
} from "src/api.handlers/userProfile/UserProfile1Page";
import { ArtworkType } from "src/api.common/ArtworkType";

const getPageCount = GetPageCount;
const getArtworksByType = GetArtworksByType;

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
    },

    actions: {
        setupProfileStore() {
            this.setPageCountAndTotalArtwork();
        },
        //********************************* */
        // Get page count from api then assign to local state
        //********************************* */
        setPageCountAndTotalArtwork() {
            this.totalComics = getPageCount(ArtworkType.COMIC).result;
            this.totalAnimations = getPageCount(ArtworkType.ANIMATION).result;
            this.totalSeries = getPageCount(ArtworkType.SERIES).result;

            this.comicTotalPage = Math.round(this.totalComics / 8 + 0.5);
            this.animationTotalPage = Math.round(
                this.totalAnimations / 8 + 0.5
            );
            this.seriesTotalPage = Math.round(this.totalSeries / 8 + 0.5);

            this.setArtworksByType(ArtworkType.COMIC, 1);
            this.setArtworksByType(ArtworkType.ANIMATION, 1);
            this.setArtworksByType(ArtworkType.SERIES, 1);
        },

        //********************************* */
        // Get artwork in page from api then assign to local state
        //********************************* */
        setArtworksByType(artworkType, currentPage) {
            if (artworkType === ArtworkType.COMIC)
                this.comics.push(
                    getArtworksByType(artworkType, currentPage).artworkList
                );
            else if (artworkType === ArtworkType.ANIMATION)
                this.animations.push(
                    getArtworksByType(artworkType, currentPage).artworkList
                );
            else if (artworkType === ArtworkType.SERIES)
                this.series.push(
                    getArtworksByType(artworkType, currentPage).artworkList
                );
        },

        /**
         * Find the artworks for the given page and type.
         * If the artworks for the page have not been loaded yet, load them.
         * @param {ArtworkType} artworkType The type of artwork to find.
         * @param {number} currentPage The page number to find the artworks for.
         * @returns {Array} The artworks for the page.
         */
        findArtworkByPage(artworkType, currentPage) {
            // If the artworks for the requested page have not been loaded yet, load them
            if (artworkType === ArtworkType.COMIC) {
                if (this.comics.length <= (currentPage - 1) * 8) {
                    this.setArtworksByType(ArtworkType.COMIC, currentPage);
                }
                // Return the artworks for the page
                return this.comics.slice(
                    (currentPage - 1) * 8,
                    currentPage * 8
                );
            } else if (artworkType === ArtworkType.ANIMATION) {
                if (this.animations.length <= (currentPage - 1) * 8) {
                    this.setArtworksByType(ArtworkType.ANIMATION, currentPage);
                }
                return this.animations.slice(
                    (currentPage - 1) * 8,
                    currentPage * 8
                );
            } else if (artworkType === ArtworkType.SERIES) {
                if (this.series.length <= (currentPage - 1) * 8) {
                    this.setArtworksByType(ArtworkType.SERIES, currentPage);
                }
                return this.series.slice(
                    (currentPage - 1) * 8,
                    currentPage * 8
                );
            }
        },
    },
});

export { useProfileStore };
