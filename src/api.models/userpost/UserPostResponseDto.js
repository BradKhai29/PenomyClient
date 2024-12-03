import { DateTimeHelper } from "src/helpers/DateTimeHelper";

class UserPostResponseDto {
    /**
     * Constructs the UserPostResponseDto from an API response.
     * @param {Object} response - The API response object.
     * @param {Array<Object>} response.userPosts - The list of user posts.
     */
    constructor({ userPosts = [] }) {
        // Default to an empty array if userPosts is undefined
        this.userPosts = userPosts.map((post) => new UserPostDto(post)); // Safely map user posts
    }
}

/**
 * Represents an attached media item.
 * @class AttachMediaDto
 */
class AttachMediaDto {
    /**
     * @param {Object} params - The parameters for the attached media.
     * @param {string} params.fileName - The name of the file.
     * @param {string} params.mediaType - The type of the media (e.g., image, video).
     * @param {string} params.storageUrl - The URL where the media is stored.
     * @param {number} params.uploadOrder - The order in which the media was uploaded.
     */
    constructor({ fileName, mediaType, storageUrl, uploadOrder }) {
        this.fileName = fileName;
        this.mediaType = mediaType;
        this.storageUrl = storageUrl;
        this.uploadOrder = uploadOrder;
    }
}

/**
 * Represents a user post data transfer object.
 * @class UserPostDto
 */
class UserPostDto {
    /**
     * @param {Object} params - The parameters for the user post.
     * @param {string} params.id - The unique identifier of the post.
     * @param {string} params.content - The content of the post.
     * @param {string} params.createdBy - The user who created the post.
     * @param {string} params.createdAt - The date and time when the post was created.
     * @param {boolean} params.allowComment - Indicates if comments are allowed on the post.
     * @param {string} params.publicLevel - The visibility level of the post.
     * @param {number} params.totalLikes - The total number of likes the post has received.
     * @param {Array<Object>} params.attachedMedias - The media files attached to the post.
     */
    constructor({
        id,
        content,
        createdBy,
        createdAt,
        allowComment,
        publicLevel,
        totalLikes,
        attachedMedias = [], // Default to an empty array if attachedMedias is undefined
    }) {
        this.id = id;
        this.content = content;
        this.createdBy = createdBy;
        this.createdAt = DateTimeHelper.formatISODate(createdAt); // Format date using helper
        this.allowComment = allowComment;
        this.publicLevel = publicLevel;
        this.totalLikes = totalLikes;
        this.attachedMedias = attachedMedias.map(
            (media) => new AttachMediaDto(media)
        ); // Safely map attached media
    }
}

export { UserPostResponseDto, UserPostDto, AttachMediaDto };
