import { CategoryItem } from "../common/CategoryItem";

const artworkStatuses = {
    onGoing: 1,
    finished: 2,
    cancelled: 3,
};

class ComicDetail {
    /**
     * Constructor of get artwork detail.
     * @param {Number} id The id of this artwork.
     * @param {String} title The title of this artwork.
     * @param {String} origin The origin of this artwork.
     * @param {String} introduction The introduction of this artwork.
     * @param {String} thumbnailUrl The thumbnail image's URL of this artwork.
     * @param {CategoryItem[]} categories The list of selected categories of this artwork.
     * @param {Number} artworkStatus The publication status of this artwork.
     * @param {Number} publicLevel The public level enum value to specify for this artwork.
     * @param {Boolean} allowComment Specify if this artwork allow to comment at detail page.
     * @param {String} series The series that contains this artwork.
     * @param {String} authorName The author name that publishs this artwork.
     */
    constructor(
        id,
        title,
        origin,
        introduction,
        thumbnailUrl,
        categories,
        artworkStatus,
        publicLevel,
        allowComment,
        series,
        authorName
    ) {
        this.id = id;
        this.title = title;
        this.origin = origin;
        this.introduction = introduction;
        this.thumbnailUrl = thumbnailUrl;
        this.categories = categories;
        this.artworkStatus = artworkStatus;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.series = series;
        this.authorName = authorName;
    }

    /**
     * Map the input api's response body to the comic detail object instance.
     *
     * @param {ComicDetail} responseBody The api resposne body to be mapped.
     */
    static mapFrom(responseBody) {
        return new ComicDetail(
            responseBody.id,
            responseBody.title,
            responseBody.origin,
            responseBody.introduction,
            responseBody.thumbnailUrl,
            CategoryItem.asArray(responseBody.categories),
            responseBody.artworkStatus,
            responseBody.publicLevel,
            responseBody.allowComment,
            responseBody.series,
            responseBody.authorName
        );
    }

    getStatusName() {
        switch (this.artworkStatus) {
            case artworkStatuses.onGoing:
                return "Còn cập nhật";
            case artworkStatuses.finished:
                return "Hoàn thành";
            case artworkStatuses.onGoing:
                return "Ngừng cập nhật";
        }
    }

    getStatusIcon() {
        switch (this.artworkStatus) {
            case artworkStatuses.finished:
                return "check";
            case artworkStatuses.onGoing:
                return "close";
        }
    }
}

export { ComicDetail, artworkStatuses };
