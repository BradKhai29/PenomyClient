import { defineStore } from "pinia";

const useCreatorStudio5Store = defineStore("creatorStudio5Store", {
    state: () => ({
        overviewStatistic: {
            /**
             * @type {Number} The total comics has created by current creator studio.
             */
            totalComics: 0,
            /**
             * @type {Number} The total animations has created by current creator studio.
             */
            totalAnimations: 0,
            /**
             * @type {Number} The total series has created by current creator studio.
             */
            totalSeries: 0,
        },
    }),

    getters: {
        /**
         * Get the total animations.
         *
         * @returns {Number} The total animations get from overview statistic object.
         */
        totalAnimations() {
            return this.overviewStatistic.totalAnimations;
        },
        /**
         * Get the total comics.
         *
         * @returns {Number} The total comics get from overview statistic object.
         */
        totalComics() {
            return this.overviewStatistic.totalComics;
        },
        /**
         * Get the total series.
         *
         * @returns {Number} The total series get from overview statistic object.
         */
        totalSeries() {
            return this.overviewStatistic.totalSeries;
        },
    },

    actions: {
        /**
         * Set new total comics to overview statistic object.
         *
         * @param {Number} totalComics Value to set new.
         */
        setTotalComics(totalComics) {
            this.overviewStatistic.totalComics = totalComics;
        },
        /**
         * Set new total animations to overview statistic object.
         *
         * @param {Number} totalAnimations Value to set new.
         */
        setTotalAnimations(totalAnimations) {
            this.overviewStatistic.totalAnimations = totalAnimations;
        },
        /**
         * Set new total series to overview statistic object.
         *
         * @param {Number} totalSeries Value to set new.
         */
        setTotalSeries(totalSeries) {
            this.overviewStatistic.totalSeries = totalSeries;
        },
    },
});

export { useCreatorStudio5Store };
