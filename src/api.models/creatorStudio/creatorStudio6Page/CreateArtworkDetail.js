import { CategoryItem } from "../common/CategoryItem";

class CreateArtworkDetail {
    /**
     * Constructor of artwork detail.
     * @param {String} title The title of this artwork.
     * @param {Number} originId The id of the origin that assigned to this artwork.
     * @param {String} introduction The introduction of this artwork.
     * @param {CategoryItem[]} selectedCategories The list of selected categories of this artwork.
     * @param {Number} publicLevel The public level enum value to specify for this artwork.
     * @param {Boolean} allowComment Specify if this artwork allow to comment at detail page.
     * @param {File} thumbnailImageFile The thumbnail image file of this artwork.
     */
    constructor(
        title,
        originId,
        introduction,
        selectedCategories,
        publicLevel,
        allowComment,
        thumbnailImageFile
    ) {
        this.title = title;
        this.originId = originId;
        this.introduction = introduction;
        this.selectedCategories = selectedCategories;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.thumbnailImageFile = thumbnailImageFile;
    }
}

export { CreateArtworkDetail };
