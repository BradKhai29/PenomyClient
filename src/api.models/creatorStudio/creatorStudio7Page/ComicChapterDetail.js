import { DateTimeHelper } from "src/helpers/DateTimeHelper";

class ComicChapterDetail {
    /**
     *
     * @param {String} id
     * @param {String} title
     * @param {Number} uploadOrder
     * @param {String} createdAt
     * @param {String} publishedAt
     * @param {Number} publishStatus
     * @param {Number} publicLevel
     * @param {String} thumbnailUrl
     * @param {Boolean} allowComment
     */
    constructor(
        id,
        title,
        uploadOrder,
        createdAt,
        publishedAt,
        publishStatus,
        publicLevel,
        thumbnailUrl,
        allowComment
    ) {
        this.id = id;
        this.title = title;
        this.uploadOrder = uploadOrder;
        this.createdAt = DateTimeHelper.formatISODate(
            createdAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
        this.publishedAt = DateTimeHelper.formatISODate(
            publishedAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
        this.publishStatus = publishStatus;
        this.publicLevel = publicLevel;
        this.thumbnailUrl = thumbnailUrl;
        this.allowComment = allowComment;
    }

    /**
     *
     * @param {ComicChapterDetail} responseItem The response item to map from.
     * @returns {ComicChapterDetail} The return instance after map.
     */
    static mapFrom(responseItem) {
        return new ComicChapterDetail(
            responseItem.id,
            responseItem.title,
            responseItem.uploadOrder,
            responseItem.createdAt,
            responseItem.publishedAt,
            responseItem.publishStatus,
            responseItem.publicLevel,
            responseItem.thumbnailUrl,
            responseItem.allowComment
        );
    }

    /**
     *
     * @param {ComicChapterDetail[]} responseBody The response body to map.
     * @returns {ComicChapterDetail[]}
     */
    static asArray(responseBody) {
        const chapters = [];

        for (const responseItem of responseBody) {
            const chapter = ComicChapterDetail.mapFrom(responseItem);

            chapters.push(chapter);
        }

        return chapters;
    }
}

export { ComicChapterDetail };
