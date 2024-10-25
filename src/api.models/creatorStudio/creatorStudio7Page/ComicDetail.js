import { CategoryItem } from "../common/CategoryItem";

class ComicDetail {
    /**
     * Constructor of get artwork detail.
     * @param {Number} id The id of this artwork.
     * @param {String} title The title of this artwork.
     * @param {String} origin The origin of this artwork.
     * @param {String} introduction The introduction of this artwork.
     * @param {CategoryItem[]} categories The list of selected categories of this artwork.
     * @param {Number} publicLevel The public level enum value to specify for this artwork.
     * @param {Boolean} allowComment Specify if this artwork allow to comment at detail page.
     * @param {String} thumbnailUrl The thumbnail image's URL of this artwork.
     * @param {Boolean} isNotFound Indicate if the artwork detail is not found.
     */
    constructor(
        id,
        title,
        origin,
        introduction,
        categories,
        publicLevel,
        allowComment,
        thumbnailUrl,
        isNotFound
    ) {
        this.id = id;
        this.title = title;
        this.originId = origin;
        this.introduction = introduction;
        this.categories = categories;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.thumbnailUrl = thumbnailUrl;
        this.isNotFound = isNotFound;
    }

    static NotFound() {
        const result = new ComicDetail();
        result.isNotFound = true;

        return result;
    }
}

export { ComicDetail };
