import { DateTimeHelper } from "src/helpers/DateTimeHelper";

class UserProfileResponseDto {
    /**
     * @param {String} userId Id of the current user.
     * @param {String} nickname Nickname of the current user.
     * @param {String} avatarUrl AvatarURL of the current user.
     * @param {Boolean} isCreator Flag to indicate current user has registered as a creator or not.
     * @param {String} aboutMe About me section describe about the current user.
     * @param {Number} totalFollowedCreators Total creators that current user has followed.
     * @param {String} lastActiveAt The last active time of current user.
     * @param {String} registeredAt The time the current user registered successfully to the platform.
     * @param {Number} totalFollowers Total followers of current user.
     * @param {Number} totalArtworks Total artworks that created by current user.
     * @param {String} becomeCreatorAt The time the current user become a creator.
     */
    constructor(
        userId,
        nickname,
        avatarUrl,
        isCreator,
        aboutMe,
        totalFollowedCreators,
        lastActiveAt,
        registeredAt,
        totalFollowers,
        totalArtworks,
        becomeCreatorAt
    ) {
        this.userId = userId;
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.isCreator = isCreator;
        this.aboutMe = aboutMe;
        this.totalFollowedCreators = totalFollowedCreators;
        this.lastActiveAt = DateTimeHelper.formatISODate(lastActiveAt);
        this.registeredAt = DateTimeHelper.formatISODate(
            registeredAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
        // Creator profile section.
        this.totalArtworks = totalArtworks;
        this.totalFollowers = totalFollowers;
        this.becomeCreatorAt = DateTimeHelper.formatISODate(
            becomeCreatorAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
    }

    clear() {
        this.userId = null;
        this.nickname = null;
        this.avatarUrl = null;
        this.isCreator = false;
        this.aboutMe = null;
        this.totalFollowedCreators = null;
        this.lastActiveAt = null;
        this.registeredAt = null;
        // Creator profile section.
        this.totalFollowers = null;
        this.totalArtworks = null;
        this.becomeCreatorAt = null;
    }

    /**
     * Map the input api response body into UserProfileResponseDto instance.
     *
     * @param {UserProfileResponseDto} apiResponse The response body to map from.
     */
    static mapFrom(apiResponse) {
        return new UserProfileResponseDto(
            apiResponse.userId,
            apiResponse.nickname,
            apiResponse.avatarUrl,
            apiResponse.isCreator ?? false,
            apiResponse.aboutMe,
            apiResponse.totalFollowedCreators,
            apiResponse.lastActiveAt,
            apiResponse.registeredAt,
            apiResponse.totalFollowers,
            apiResponse.totalArtworks,
            apiResponse.becomeCreatorAt
        );
    }
}

export { UserProfileResponseDto };
