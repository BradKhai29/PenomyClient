import { CategoryItem } from "../common/CategoryItem";

class UpdateArtworkDetail {
    /**
     * Constructor of artwork detail.
     * @param {any} id The id of this artwork.
     * @param {String} title The title of this artwork.
     * @param {Number} originId The id of the origin that assigned to this artwork.
     * @param {String} introduction The introduction of this artwork.
     * @param {CategoryItem[]} selectedCategories The list of selected categories of this artwork.
     * @param {any} publicLevel The public level enum value to specify for this artwork.
     * @param {Boolean} allowComment Specify if this artwork allow to comment at detail page.
     * @param {File} thumbnailImageFile The thumbnail image file of this artwork.
     * @param {Boolean} isCategoriesUpdated Specify if the current artwork has updated in their categories.
     */
    constructor(
        id,
        title,
        originId,
        introduction,
        selectedCategories,
        publicLevel,
        allowComment,
        thumbnailImageFile,
        isCategoriesUpdated
    ) {
        this.id = id;
        this.title = title;
        this.originId = originId;
        this.introduction = introduction;
        this.selectedCategories = selectedCategories;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.thumbnailImageFile = thumbnailImageFile;
        this.isCategoriesUpdated = isCategoriesUpdated;
    }
}

export { UpdateArtworkDetail };
