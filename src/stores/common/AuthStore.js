// Import dependencies section.
import { defineStore } from "pinia";
import { authStoreManager } from "./AuthStore.InternalManager";
import { LogoutApiHandler } from "src/api.handlers/auth/common/LogoutApiHandler";
import { useUserProfileStore } from "./UserProfileStore";
import { JwtTokenHelper } from "src/helpers/JwtTokenHelper";

// Init store for later operation.
const userProfileStore = useUserProfileStore();

const useAuthStore = defineStore("authStore", {
    state: () => ({
        userId: null,
        hasSetUp: false,
        userHasAuthenticated: false,
    }),

    getters: {
        /**
         * Get the state of current user is already authenticated or not.
         *
         * @returns {Boolean} True if the user is already authenticated.
         */
        isAuth() {
            return this.userHasAuthenticated;
        },
    },

    actions: {
        /**
         * Asynchronously set up the auth store for the application before starting any function.
         *
         * @remarks This method must be called first to load the access & refresh token.
         */
        async setUp() {
            if (this.hasSetUp) {
                return;
            }

            // Verify the current tokens before any process.
            const verifyResult = await authStoreManager.verifyTokensAsync();

            // If verify success, then set up for this
            // store to refresh the token silently.
            if (verifyResult) {
                // If verify the tokens success, then authenticated for current user.
                this.userHasAuthenticated = true;
                this.userId = JwtTokenHelper.decodeJwt(this.accessToken()).sub;

                authStoreManager.setUpSilentRefreshToken();
            } else {
                // If verify failed, try to refresh the token.
                const refreshResult =
                    await authStoreManager.refreshTokenAsync();

                // Only setup the silent refresh token when operation is success.
                if (refreshResult.isSuccess) {
                    // If refresh the tokens success, then authenticated for current user.
                    this.userHasAuthenticated = true;

                    authStoreManager.setUpSilentRefreshToken();
                }
                // Otherwise, unauthenticate for current user.
                else {
                    this.userHasAuthenticated = false;
                }
            }

            this.hasSetUp = true;
        },
        /**
         * Sign in for the user and save the required credentials.
         *
         * @param {String} accessToken Store the access token of this user.
         * @param {String} refreshToken Store the refresh token of this user.
         */
        signIn(accessToken, refreshToken) {
            authStoreManager.signIn(accessToken, refreshToken);
            // When sign in success, authenticate for current user.
            this.userHasAuthenticated = true;
            this.userId = JwtTokenHelper.decodeJwt(this.accessToken).sub;

            // When sign in success, setup the silent refresh token.
            authStoreManager.setUpSilentRefreshToken();
        },
        /**
         * Sign out the current user and remove all credentials from authStore.
         */
        async signOut() {
            const bearerAccessToken = this.bearerAccessToken();
            await LogoutApiHandler.logoutAsync(bearerAccessToken);

            // Unauthenticate for current user when sign out.
            this.userHasAuthenticated = false;
            this.userId = null;

            // Clear all tokens that stored on this authStore & user machine.
            authStoreManager.signOut();
            userProfileStore.clearProfile();
        },
        /**
         * Execute the refresh token operation.
         */
        async refreshTokenAsync() {
            return authStoreManager.refreshTokenAsync();
        },
        /**
         * Get the refresh token that stored in this auth store.
         *
         * @returns {String} The value of the refresh token.
         */
        refreshToken() {
            return this.manager.getRefreshToken();
        },
        /**
         * Return the access token without bearer prefix that managed by this manager.
         *
         * @returns {String} The value of the access token without bearer prefix.
         */
        accessToken() {
            return authStoreManager.getAccessToken();
        },
        /**
         * Return the access token with bearer prefix that managed by this manager.
         *
         * @returns {String} The value of the access token with bearer prefix.
         */
        bearerAccessToken() {
            return authStoreManager.getBearerAccessToken();
        },
        /**
         * Get the access token asynchronously if the refresh-token operation is not complete.
         *
         * @returns {Promise<String>} Promise contains the access token with bearer prefix.
         */
        getBearerAccessTokenAsync() {
            return authStoreManager.getBearerAccessTokenAsync();
        },
    },
});

export { useAuthStore };
