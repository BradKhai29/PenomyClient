/**
 * Store the information of user profile.
 */
class UserProfile {
    /**
     * @param {String} nickname The nickname of this user profile.
     * @param {String} avatarUrl The avatarUrl of this user profile.
     * @param {Boolean} [isCreator=false] Check if the current user is creator or not (default is false).
     */
    constructor(nickname, avatarUrl, isCreator = false) {
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.isCreator = isCreator;
    }

    /**
     * Check if the current user profile is empty or not
     * by verify its nickname & avatarUrl token value.
     *
     * @returns {Boolean} The checking result.
     */
    isEmpty() {
        return this.nickname == "" || this.avatarUrl == "";
    }

    /**
     * Clear all the information that stored in this profile.
     */
    clear() {
        this.nickname = null;
        this.avatarUrl = null;
        this.isCreator = false;
    }
}

export { UserProfile };
