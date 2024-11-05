class ChapterImageResponseItem {
    /**
     * @param {Number} uploadOrder The order of the chapter image.
     * @param {String} storageUrl Storage URL of the chapter image.
     */
    constructor(uploadOrder, storageUrl) {
        this.uploadOrder = uploadOrder;
        this.storageUrl = storageUrl;
    }

    /**
     * Map the detail that get from the input responesItem
     * into a ChapterImageResponseItem instance.
     *
     * @param {ChapterImageResponseItem} responseItem Item that need to map from.
     */
    static mapFrom(responseItem) {
        return new ChapterImageResponseItem(
            responseItem.uploadOrder,
            responseItem.storageUrl
        );
    }

    /**
     * Map an array of object into an array of ChapterImageResponseItem instance.
     *
     * @param {ChapterImageResponseItem[]} responseItems Item that need to map from.
     */
    static mapArray(responseItems) {
        const result = [];

        for (const item of responseItems) {
            const imageItem = this.mapFrom(item);

            result.push(imageItem);
        }

        return result;
    }
}

export { ChapterImageResponseItem };
