const VALID_IMAGE_FILE_EXTENSIONS = ["jpg", "jpeg", "png"];
const VALID_IMAGE_FILE_MIME_TYPE = "image";
const EMPTY_STRING = "";
/**
 * The maximum size of an image file to upload to server.
 */
const MAXIMUM_IMAGE_FILE_SIZE = 2 * 1024 * 1024;

/**
 * Get the extension of the input file.
 * @param {File} file The file to get the extension.
 * @returns {String} The extension of the file that excluding the final dot.
 */
function getFileExtension(file) {
    if (!file) {
        return EMPTY_STRING;
    }

    // The mime type will look like: image/png, then split the "/"
    // we take the last item in the split result.
    const mimeTypeSplit = file.type.split("/");
    const fileExtension = mimeTypeSplit[mimeTypeSplit.length - 1];

    return fileExtension;
}

/**
 * Check if the input file is image file or not.
 * @param {File} file The input file to check.
 * @returns {Boolean} The result (bool) after checking.
 */
function isImageFile(file) {
    if (!file) {
        return false;
    }

    // Get the mime type of the file and check.
    const mimeType = file.type;

    if (!mimeType.includes(VALID_IMAGE_FILE_MIME_TYPE)) {
        return false;
    }

    const fileExtension = getFileExtension(file);

    if (VALID_IMAGE_FILE_EXTENSIONS.includes(fileExtension)) {
        return true;
    }

    return false;
}

/**
 * Check if the input image file is exceed the maximum size or not.
 * The default maximum file size is 2MB if the input file size is not defined.
 * @param {File} imageFile The image file to check the size.
 * @param {Number} maximumFileSize The maximum file size to check.
 */
function isImageFileExceedMaximumSize(imageFile, maximumFileSize) {
    if (maximumFileSize) {
        return imageFile.size > maximumFileSize;
    }

    return imageFile.size > MAXIMUM_IMAGE_FILE_SIZE;
}

/**
 *
 * @param {*} file The input to convert as file.
 * @returns {File} The file after force to convert.
 */
function asFile(file) {
    return file;
}

/**
 *
 * @param {*} file The input to convert as file.
 * @returns {File[]} The list of file after force to convert.
 */
function asFiles(files) {
    return files;
}

const FileHelper = {
    getFileExtension: getFileExtension,
    isImageFile: isImageFile,
    isImageFileExceedMaximumSize: isImageFileExceedMaximumSize,
    asFile: asFile,
    asFiles: asFiles,
};

export { FileHelper };
