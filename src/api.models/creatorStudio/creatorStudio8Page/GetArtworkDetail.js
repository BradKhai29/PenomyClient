import { CategoryItem } from "../common/CategoryItem";

class GetArtworkDetail {
    /**
     * Constructor of get artwork detail.
     * @param {Number} id The id of this artwork.
     * @param {String} title The title of this artwork.
     * @param {String} originId The id of the origin of this artwork.
     * @param {String} introduction The introduction of this artwork.
     * @param {CategoryItem[]} selectedCategories The list of selected categories of this artwork.
     * @param {Number} publicLevel The public level enum value to specify for this artwork.
     * @param {Boolean} allowComment Specify if this artwork allow to comment at detail page.
     * @param {String} thumbnailUrl The thumbnail image's URL of this artwork.
     * @param {Boolean} isNotFound Indicate if the artwork detail is not found.
     */
    constructor(
        id,
        title,
        originId,
        introduction,
        selectedCategories,
        publicLevel,
        allowComment,
        thumbnailUrl,
        isNotFound
    ) {
        this.id = id;
        this.title = title;
        this.originId = originId;
        this.introduction = introduction;
        this.selectedCategories = selectedCategories;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.thumbnailUrl = thumbnailUrl;
        this.isNotFound = isNotFound;
    }

    static NotFound() {
        const result = new GetArtworkDetail();
        result.isNotFound = true;

        return result;
    }
}

export { GetArtworkDetail };
