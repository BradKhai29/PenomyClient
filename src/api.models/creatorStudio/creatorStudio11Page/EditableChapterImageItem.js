/**
 * This class is used for internally processing purpose.
 */
class ChapterImageApiResponseItem {
    /**
     *
     * @param {String} id Id of the image item from the api response body.
     * @param {Number} uploadOrder Upload order of the image item that get from api response body.
     * @param {Number} fileSize File size of the image item from the api response body.
     * @param {String} storageUrl Storage URL of the image item from the api response body.
     */
    constructor(id, uploadOrder, fileSize, storageUrl) {
        this.id = id;
        this.uploadOrder = uploadOrder;
        this.fileSize = fileSize;
        this.storageUrl = storageUrl;
    }
}

class EditableChapterImageItem {
    /**
     * @param {String} id Id of the image item.
     * @param {Number} position Support for drag&drop purpose and tracking the current position of the item in the list.
     * @param {Number} oldUploadOrder Save the upload order of the item when first fetched from the api.
     * @param {Number} newUploadOrder Save the new upload order that take the latest position of the item in the list (support for update operation).
     * @param {Number} fileSize File size of the image item.
     * @param {String} src The source URL or path of the image item.
     * @param {String} imageName - The name of the image item.
     * @param {File} imageFile The image file object (e.g., from file input or upload).
     * @param {Boolean} isNewItem Indicate this editable item is uploaded new from the user
     * (Default is false).
     */
    constructor(
        id,
        position,
        oldUploadOrder,
        newUploadOrder,
        fileSize,
        src,
        imageName,
        imageFile,
        isNewItem = false
    ) {
        this.id = String(id);
        this.position = position;
        this.oldUploadOrder = oldUploadOrder;
        this.newUploadOrder = newUploadOrder;
        this.fileSize = fileSize;
        this.src = src;
        this.imageName = imageName;
        this.imageFile = imageFile;
        this.isNewItem = isNewItem;
    }

    /**
     * Reload the new upload order with the value get from the current position.
     */
    reloadNewUploadOrder() {
        this.newUploadOrder = this.position;
    }

    /**
     * Check if the current chapter image item has changed in upload order or not.
     *
     * @returns {Boolean} The result after checking.
     */
    isUploadOrderChanged() {
        return this.newUploadOrder != this.oldUploadOrder;
    }

    /**
     * Map the input object into a ComicChapterMediaResponseItem instance.
     * @param {ChapterImageApiResponseItem} object The object to map from.
     */
    static mapFrom(object) {
        const id = object.id;
        const position = object.uploadOrder;
        const oldUploadOrder = object.uploadOrder;
        const newUploadOrder = object.uploadOrder;
        const fileSize = object.fileSize;
        const src = object.storageUrl;

        return new EditableChapterImageItem(
            id,
            position,
            oldUploadOrder,
            newUploadOrder,
            fileSize,
            src,
            `${id}.png`
        );
    }

    /**
     * Map from an array of object into an array of ComicChapterMediaResponseItem.
     *
     * @param {ChapterImageApiResponseItem[]} objectArray An array of object to map from.
     */
    static mapArray(objectArray) {
        const result = [];

        for (const item of objectArray) {
            const mediaItem = EditableChapterImageItem.mapFrom(item);

            result.push(mediaItem);
        }

        return result;
    }

    /**
     * Return the value that can be used to marked item as deleted.
     * @returns {Number} Return (value = -1).
     */
    static DELETED_POSITION() {
        return -1;
    }
}

export { EditableChapterImageItem };
