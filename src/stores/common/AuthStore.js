import { defineStore } from "pinia";
import { UserProfile } from "src/api.models/auth/auth1Page/UserProfile";
import { CookieHelper } from "src/helpers/CookieHelper";

const accessTokenKeyName = "user:access_token";
const refreshTokenKeyName = "user:refresh_token";
const isCreatorKeyName = "user:is_creator";
const nicknameKeyName = "user:nickname";
const avatarUrlKeyName = "user:avatar_url";

class TokenBag {
    /**
     * This class is used internally in the AuthStore.
     *
     * @param {String} accessToken The access token that loaded.
     * @param {String} refreshToken The refresh token that loaded.
     */
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    /**
     * Check if the current token bag is empty or not
     * by verify its access & refresh token value.
     *
     * @returns {Boolean} The checking result.
     */
    isEmpty() {
        return this.accessToken == null || this.refreshToken == null;
    }

    /**
     * Clear all tokens that contained in this token bag.
     */
    clear() {
        this.accessToken = null;
        this.refreshToken = null;
    }
}

/**
 * Load all the access tokens and refresh token from the user machine.
 *
 * @returns {TokenBag} The token bag that contains all loaded tokens.
 */
function internalLoadAllTokens() {
    let accessToken = localStorage.getItem(accessTokenKeyName);
    let refreshToken = localStorage.getItem(refreshTokenKeyName);

    // If the loading content is not existed
    // then try to load from the cookies section.
    if (!accessToken) {
        localStorage.removeItem(accessTokenKeyName);
        const accessTokenCookie = CookieHelper.getCookie(accessTokenKeyName);
        accessToken = accessTokenCookie.isExisted
            ? accessTokenCookie.value
            : null;
    }

    if (!refreshToken) {
        localStorage.removeItem(refreshTokenKeyName);
        const refreshTokenCookie = CookieHelper.getCookie(accessTokenKeyName);
        refreshToken = refreshTokenCookie.isExisted
            ? refreshTokenCookie.value
            : null;
    }

    return new TokenBag(accessToken, refreshToken);
}

/**
 * Store the access & refresh token to the local storage for later retrieved.
 *
 * @param {TokenBag} tokenBag The token bag that will be set.
 */
function internalSetTokenBag(tokenBag) {
    localStorage.setItem(accessTokenKeyName, tokenBag.accessToken);
    localStorage.setItem(refreshTokenKeyName, tokenBag.refreshToken);
}

/**
 * Load the cached user profile from the local storage on this machine.
 *
 * @returns {UserProfile} The user profile that contains user information.
 */
function internalLoadUserProfile() {
    const nickname = localStorage.getItem(nicknameKeyName);
    const avatarUrl = localStorage.getItem(avatarUrlKeyName);
    const isCreator = localStorage.getItem(isCreatorKeyName) * 1;

    return new UserProfile(nickname, avatarUrl, isCreator);
}

/**
 * Store the user profile to the local storage for later retrieved.
 *
 * @param {UserProfile} userProfile The user profile contains information to set to local storage.
 */
function internalSetUserProfile(userProfile) {
    localStorage.setItem(nicknameKeyName, userProfile.nickname);
    localStorage.setItem(avatarUrlKeyName, userProfile.avatarUrl);
    localStorage.setItem(isCreatorKeyName, userProfile.isCreator);
}

const useAuthStore = defineStore("authStore", {
    state: () => ({
        /**
         * Used to store the related token for this auth store.
         *
         * @type {TokenBag} The type of this state property.
         */
        tokenBag: new TokenBag(null, null),
        /**
         * Used to store the user profile of current user.
         *
         * @type {UserProfile} The type of this state property.
         */
        userProfile: new UserProfile(null, null, false),
    }),

    getters: {
        /**
         * Get the state of current user is already authenticated or not
         * by verify the value from the access token and refresh token.
         *
         * @returns {Boolean} The checking result.
         */
        isAuth() {
            return !this.tokenBag.isEmpty();
        },
        /**
         * Get the current user profile that stored in that auth store.
         *
         * @returns {UserProfile} The user profile.
         */
        currentUserProfile() {
            return this.userProfile;
        },
        /**
         * Get the access token that stored in this auth store.
         *
         * @returns {String} The value of the access token.
         */
        accessToken() {
            return this.tokenBag.accessToken;
        },
        /**
         * Get the refresh token that stored in this auth store.
         *
         * @returns {String} The value of the refresh token.
         */
        refreshToken() {
            return this.tokenBag.refreshToken;
        },
        /**
         * Get the access token with Bearer prefix that stored in this auth store.
         *
         * @returns {String} The value of the access token.
         */
        bearerAccessToken() {
            return `Bearer ${this.tokenBag.accessToken}`;
        },
    },

    actions: {
        /**
         * Set up the auth store for the application before starting any functions.
         * @remarks This method must be called first to load the access & refresh token.
         */
            setUpAuthStore() {
                this.tokenBag = internalLoadAllTokens();
                this.userProfile = internalLoadUserProfile();
            },
        /**
         * Sign in for the user and save the required credentials.
         *
         * @param {String} accessToken Store the access token of this user.
         * @param {String} refreshToken Store the refresh token of this user.
         * @param {UserProfile} userProfile The user profile provided with the api response.
         */
        signIn(accessToken, refreshToken, userProfile) {
            this.tokenBag.accessToken = accessToken;
            this.tokenBag.refreshToken = refreshToken;
            this.userProfile.nickname = userProfile.nickname;
            this.userProfile.avatarUrl = userProfile.avatarUrl;
            this.userProfile.isCreator = false;

            // Store the information to local storage.
                (this.tokenBag);
            internalSetUserProfile(this.userProfile);
        },
        /**
         * Sign out the current user and remove all credentials from authStore.
         */
        signOut() {
            // Clear all tokens that stored on this authStore & user machine.
            this.tokenBag.clear();
            CookieHelper.removeCookie(accessTokenKeyName);
            CookieHelper.removeCookie(refreshTokenKeyName);
            localStorage.removeItem(accessTokenKeyName);
            localStorage.removeItem(refreshTokenKeyName);

            // Clear all user profile information that stored on this authStore & user machine.
            this.userProfile.clear();
            localStorage.removeItem(nicknameKeyName);
            localStorage.removeItem(avatarUrlKeyName);
            localStorage.removeItem(isCreatorKeyName);
        },
    },
});

export { useAuthStore };
