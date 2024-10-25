import { DateTimeHelper } from "src/helpers/DateTimeHelper";

class ComicChapterDetail {
    /**
     *
     * @param {String} id
     * @param {String} title
     * @param {Number} uploadOrder
     * @param {String} createdAt
     * @param {Number} publishStatus
     * @param {String} thumbnailUrl
     * @param {Boolean} allowComment
     * @param {Number} totalComments
     * @param {Number} totalViews
     * @param {Number} totalFavorites
     */
    constructor(
        id,
        title,
        uploadOrder,
        createdAt,
        publishStatus,
        thumbnailUrl,
        allowComment,
        totalComments,
        totalViews,
        totalFavorites
    ) {
        this.id = id;
        this.title = title;
        this.uploadOrder = uploadOrder;
        this.createdAt = DateTimeHelper.formatISODate(
            createdAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
        this.publishStatus = publishStatus;
        this.thumbnailUrl = thumbnailUrl;
        this.allowComment = allowComment;
        this.totalComments = totalComments;
        this.totalViews = totalViews;
        this.totalFavorites = totalFavorites;
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
            responseItem.publishStatus,
            responseItem.thumbnailUrl,
            responseItem.allowComment,
            responseItem.totalComments,
            responseItem.totalViews,
            responseItem.totalFavorites
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
