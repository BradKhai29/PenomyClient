class UserProfileResponseDto {
    /**
     *
     * @param {String} userId Id of the current user.
     * @param {String} nickname Nickname of the current user.
     * @param {String} avatarUrl AvatarURL of the current user.
     * @param {String} aboutMe About me section describe about the current user.
     * @param {Boolean} isCreator Flag to indicate current user has registered as a creator or not.
     * @param {Number} totalFollowedCreators Total creators that current user has followed.
     * @param {Number} totalFollowers Total followers of current user.
     * @param {Number} totalArtworks Total artworks that created by current user.
     * @param {String} lastActiveAt The last active time of current user.
     * @param {String} registeredAt The time the current user registered successfully to the platform.
     * @param {String} becomeCreatorAt The time the current user become a creator.
     * @param {String} updatedAt The last time the current user profile was updated.
     */
    constructor(
        userId,
        nickname,
        avatarUrl,
        aboutMe,
        isCreator,
        totalFollowedCreators,
        totalFollowers,
        totalArtworks,
        lastActiveAt,
        registeredAt,
        becomeCreatorAt,
        updatedAt
    ) {
        this.userId = userId;
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.aboutMe = aboutMe;
        this.isCreator = isCreator;
        this.totalFollowedCreators = totalFollowedCreators;
        this.totalFollowers = totalFollowers;
        this.totalArtworks = totalArtworks;
        this.lastActiveAt = lastActiveAt;
        this.registeredAt = registeredAt;
        this.becomeCreatorAt = becomeCreatorAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Map the input api response body into UserProfileResponseDto instance.
     *
     * @param {UserProfileResponseDto} apiResponseBody The response body to map from.
     */
    static mapFrom(apiResponseBody) {
        return new UserProfileResponseDto(
            apiResponseBody.userId,
            apiResponseBody.nickName,
            apiResponseBody.avatarUrl,
            apiResponseBody.aboutMe,
            apiResponseBody.isCreator,
            apiResponseBody.totalFollowedCreators,
            apiResponseBody.totalFollowers,
            apiResponseBody.totalArtworks,
            apiResponseBody.lastActiveAt,
            apiResponseBody.registeredAt,
            apiResponseBody.becomeCreatorAt,
            apiResponseBody.updatedAt
        );
    }
}

export { UserProfileResponseDto };
