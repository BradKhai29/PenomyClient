class OverviewStatisticResponseItem {
    /**
     * @param {Number} totalComics The total comics get from overview statistic.
     * @param {Number} totalAnimations The total animations get from overview statistic.
     * @param {Number} totalSeries The total series get from overview statistic.
     */
    constructor(totalComics, totalAnimations, totalSeries) {
        this.totalComics = totalComics;
        this.totalAnimations = totalAnimations;
        this.totalSeries = totalSeries;
    }
}

export { OverviewStatisticResponseItem };
