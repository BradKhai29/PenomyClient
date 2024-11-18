import { DateTimeHelper } from "src/helpers/DateTimeHelper";

class NewChapterResponseItem {
    constructor(chapterId, uploadOrder, publishedAt) {
        this.chapterId = chapterId;
        this.uploadOrder = uploadOrder;
        this.publishedAt = DateTimeHelper.formatISODate(
            publishedAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
    }

    /**
     * Map from the provided response item to the NewChapterResponseItem instance.
     *
     * @param {NewChapterResponseItem} responseItem The response item to map from.
     * @returns {NewChapterResponseItem} The instance after mapping.
     */
    static mapFrom(responseItem) {
        return new NewChapterResponseItem(
            responseItem.chapterId,
            responseItem.uploadOrder,
            responseItem.publishedAt
        );
    }

    /**
     * Map from the provided array of response items to
     * the array of NewChapterResponseItem instances.
     *
     * @param {NewChapterResponseItem[]} responseItems The array of response items to map from.
     * @returns {NewChapterResponseItem[]} The array after mapping.
     */
    static mapFromArray(responseItems) {
        return responseItems.map((item) => this.mapFrom(item));
    }
}

export { NewChapterResponseItem };
