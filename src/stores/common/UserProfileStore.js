import { defineStore } from "pinia";
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";
import { UserProfile1ApiHandler } from "src/api.handlers/userProfile/userProfile1Page/UserProfile1ApiHandler";

// Support constants.
const nicknameKeyName = "user:nickname";
const avatarUrlKeyName = "user:avatar_url";

/**
 * Load the cached user profile from the local storage.
 *
 * @returns {UserProfileResponseDto} The user profile that contains user information.
 */
function internalLoadUserProfile() {
    const nickname = localStorage.getItem(nicknameKeyName);
    const avatarUrl = localStorage.getItem(avatarUrlKeyName);

    return new UserProfileResponseDto(null, nickname, avatarUrl, false);
}

/**
 * Persist the user profile to the local storage.
 *
 * @param {UserProfileResponseDto} userProfile Contains the detail to persist
 */
function persistToLocalStorage(userProfile) {
    localStorage.setItem(nicknameKeyName, userProfile.nickname);
    localStorage.setItem(avatarUrlKeyName, userProfile.avatarUrl);
}

const useUserProfileStore = defineStore("userProfileStore", {
    state: () => ({
        userProfile: new UserProfileResponseDto(null, null, null, false),
        isProcessing: true,
        hasSetUp: false,
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
        isCreator() {
            return this.userProfile.isCreator;
        },
    },

    actions: {
        /**
         * Asynchronously set up the user profile store before the application run.
         */
        async setUp(isAuth, accessToken, userId) {
            if (this.hasSetUp || !isAuth) {
                return;
            }

            const cachedUserProfile = internalLoadUserProfile();

            this.userProfile.nickname = cachedUserProfile.nickname;
            this.userProfile.avatarUrl = cachedUserProfile.avatarUrl;

            if (isAuth) {
                await this.internalLoadUserProfileAsync(accessToken, userId);

                return;
            }

            // If the current user is not authenticated, then no need to process.
            this.isProcessing = false;
        },
        /**
         * @param {String} accessToken The access token that will be used to fetch user profile.
         * @param {String} userId The userId belonged to the current user to get the profile
         */
        async internalLoadUserProfileAsync(accessToken, userId) {
            const loadedUserProfile =
                await UserProfile1ApiHandler.getUserProfileAsync(
                    accessToken,
                    userId
                );

            this.signIn(loadedUserProfile);

            // Set the related flags, prevent to set up again multiple times.
            this.hasSetUp = true;
            this.isProcessing = false;
        },
        /**
         * Set the profile detail when user has signed in successfully.
         *
         * @param {UserProfileResponseDto} signedInUserProfile Contains detail to set the profile.
         */
        signIn(signedInUserProfile) {
            this.userProfile.userId = signedInUserProfile.userId;
            this.userProfile.nickname = signedInUserProfile.nickname;
            this.userProfile.avatarUrl = signedInUserProfile.avatarUrl;
            this.userProfile.isCreator = signedInUserProfile.isCreator ?? false;
            this.userProfile.aboutMe = signedInUserProfile.aboutMe;
            this.userProfile.lastActiveAt = signedInUserProfile.lastActiveAt;
            this.userProfile.registeredAt = signedInUserProfile.registeredAt;
            this.userProfile.totalFollowedCreators =
                signedInUserProfile.totalFollowedCreators;

            // Creator profile section.
            this.userProfile.totalArtworks = signedInUserProfile.totalArtworks;
            this.userProfile.becomeCreatorAt =
                signedInUserProfile.becomeCreatorAt;
            this.userProfile.totalFollowers =
                signedInUserProfile.totalFollowers;

            // Persist to local storage some information for later loading.
            persistToLocalStorage(this.userProfile);
        },
        /**
         * Set the user's new nickname.
         *
         * @param {String} nickname Nick name to set new.
         */
        setNickname(nickname) {
            this.userProfile.nickname = nickname;
            persistToLocalStorage(this.userProfile);
        },
        /**
         * Set the user's new avatar url.
         *
         * @param {String} avatarUrl Avatar URL to set new.
         */
        setAvatarUrl(avatarUrl) {
            this.userProfile.avatarUrl = avatarUrl;
            persistToLocalStorage(this.userProfile);
        },
        setAboutMe(aboutMe) {
            this.userProfile.aboutMe = aboutMe;
        },
        becomeCreator() {
            this.userProfile.isCreator = true;
        },
        setBecomeCreatorAt(becomeCreatorAt) {
            this.userProfile.becomeCreatorAt = becomeCreatorAt;
        },
        setTotalFollowedCreators(totalFollowedCreators) {
            this.userProfile.totalFollowedCreators = totalFollowedCreators;
        },
        increaseTotalArtworks() {
            this.userProfile.totalArtworks++;
        },
        decreaseTotalArtworks() {
            this.userProfile.totalArtworks--;
        },
        clearProfile() {
            this.userProfile.clear();

            localStorage.removeItem(nicknameKeyName);
            localStorage.removeItem(avatarUrlKeyName);
            localStorage.removeItem("page1");
            localStorage.removeItem("page2");
            localStorage.removeItem("page3");
            localStorage.removeItem("comic");
            localStorage.removeItem("animation");
            localStorage.removeItem("series");
        },
        /**
         * Internal wait to load the profile if the operation is not complete.
         *
         * @returns {Promise<void>} The Promise of the operation.
         */
        waitToLoadOwnerProfile() {
            if (!this.isProcessing) {
                return new Promise((resolve) => {
                    resolve("COMPLETED");
                });
            }

            // Check the isProcessing flag every 50 ms
            const CHECKING_INTERVAL_TIMEOUT = 50;

            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (!this.isProcessing) {
                        // Stop checking once it's false
                        clearInterval(intervalId);

                        resolve("COMPLETED");
                    }
                }, CHECKING_INTERVAL_TIMEOUT);
            });
        },
    },
});

export { useUserProfileStore };
