import { defineStore } from "pinia";
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";

const nicknameKeyName = "user:nickname";
const avatarUrlKeyName = "user:avatar_url";
const isCreatorKeyName = "user:is_creator";

/**
 * Load the cached user profile from the local storage.
 *
 * @returns {UserProfileResponseDto} The user profile that contains user information.
 */
function internalLoadUserProfile() {
    const nickname = localStorage.getItem(nicknameKeyName);
    const avatarUrl = localStorage.getItem(avatarUrlKeyName);
    const isCreatorValue = String(localStorage.getItem(isCreatorKeyName));
    let isCreator = false;

    if (isCreatorValue != "true") {
        isCreator = false;
    } else {
        isCreator = true;
    }

    return new UserProfileResponseDto(null, nickname, avatarUrl, isCreator);
}

/**
 * Persist the user profile to the local storage.
 *
 * @param {UserProfileResponseDto} userProfile Contains the detail to persist
 */
function persistToLocalStorage(userProfile) {
    localStorage.setItem(nicknameKeyName, userProfile.nickname);
    localStorage.setItem(avatarUrlKeyName, userProfile.avatarUrl);
    localStorage.setItem(isCreatorKeyName, userProfile.isCreator);
}

const useUserProfileStore = defineStore("userProfileStore", {
    state: () => ({
        userProfile: new UserProfileResponseDto(null, null, null, false),
    }),

    getters: {
        /**
         * Get the current user's id managed by this store.
         *
         * @returns {String} Value of the ID of the current user.
         */
        currentUserId() {
            return this.userProfile.userId;
        },
        /**
         * Get the current user's avatarURL managed by this store.
         *
         * @returns {String} AvatarUrl of the current user.
         */
        currentAvatarUrl() {
            return this.userProfile.avatarUrl;
        },
    },

    actions: {
        /**
         * Load the cached profile from the local storage.
         */
        setUp() {
            const cachedUserProfile = internalLoadUserProfile();

            this.userProfile.nickname = cachedUserProfile.nickname;
            this.userProfile.avatarUrl = cachedUserProfile.avatarUrl;
            this.userProfile.isCreator = cachedUserProfile.isCreator ?? false;
        },

        /**
         * Update the user profile with the detail provided in the input updateUserProfile.
         *
         * @param {UserProfileResponseDto} updateUserProfile Contains detail to update the profile.
         */
        updateUserProfile(updateUserProfile) {
            if (updateUserProfile.userId) {
                this.userProfile.userId = updateUserProfile.userId;
            }

            if (updateUserProfile.nickname) {
                this.userProfile.nickname = updateUserProfile.nickname;
            }

            if (updateUserProfile.avatarUrl) {
                this.userProfile.avatarUrl = updateUserProfile.avatarUrl;
            }

            if (updateUserProfile.isCreator) {
                this.userProfile.isCreator =
                    updateUserProfile.isCreator ?? false;
            }

            if (updateUserProfile.aboutMe) {
                this.userProfile.aboutMe = updateUserProfile.aboutMe;
            }

            // Persist to local storage after updating.
            persistToLocalStorage(this.userProfile);
        },
        clearProfile() {
            this.userProfile.clear();

            localStorage.removeItem(nicknameKeyName);
            localStorage.removeItem(avatarUrlKeyName);
            localStorage.removeItem(isCreatorKeyName);
            localStorage.removeItem("page1");
            localStorage.removeItem("page2");
            localStorage.removeItem("page3");
            localStorage.removeItem("comic");
            localStorage.removeItem("animation");
            localStorage.removeItem("series");
        },
    },
});

export { useUserProfileStore };
