import { CategoryItem } from "./CategoryItem";

const Origin = {
    id: null,
    label: null,
};

class GetArtworkDetail {
    /**
     * Constructor of get artwork detail.
     * @param {Number} id The id of this artwork.
     * @param {String} title The title of this artwork.
     * @param {Origin} origin The origin of this artwork.
     * @param {String} introduction The introduction of this artwork.
     * @param {CategoryItem[]} selectedCategories The list of selected categories of this artwork.
     * @param {Number} publicLevel The public level enum value to specify for this artwork.
     * @param {Boolean} allowComment Specify if this artwork allow to comment at detail page.
     * @param {String} thumbnailUrl The thumbnail image's URL of this artwork.
     */
    constructor(
        id,
        title,
        origin,
        introduction,
        selectedCategories,
        publicLevel,
        allowComment,
        thumbnailUrl
    ) {
        this.id = id;
        this.title = title;
        this.origin = origin;
        this.introduction = introduction;
        this.selectedCategories = selectedCategories;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.thumbnailUrl = thumbnailUrl;
    }
}

export { GetArtworkDetail };
