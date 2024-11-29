class PostImageItem {
    /**
     * Initializes a new instance of ChapterImageItem with the given properties.
     *
     * @constructor
     * @param {String} id - A unique identifier for the instance.
     * @param {Number} position - The position of the image, typically with properties like x and y coordinates.
     * @param {String} imageName - The name of the image.
     * @param {String} src - The source URL or path of the image.
     * @param {File} imageFile - The image file object (e.g., from file input or upload).
     */
    constructor(id, position, imageName, src, imageFile) {
        this.id = id;
        this.position = position;
        this.imageName = imageName;
        this.src = src;
        this.imageFile = imageFile;
    }
}

export { PostImageItem };
