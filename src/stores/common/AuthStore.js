import { defineStore } from "pinia";

const useAuthStore = defineStore("authStore", {
    state: () => ({
        isAuth: false,
        isCreator: false,
        username: null,
        avatarUrl: "https://cdn.quasar.dev/img/avatar2.jpg",
        accessToken: null,
        refreshToken: null,
    }),

    getters: {
        checkAuth() {
            return this.isAuth;
        },
        checkCreator() {
            return this.isCreator;
        },
    },

    actions: {
        /**
         * Sign in the user and save the required credentials.
         * @param {String} accessToken Store the access token of this user.
         * @param {String} refreshToken Store the refresh token of this user.
         */
        signInAsUser(accessToken, refreshToken) {
            this.isAuth = true;
            this.isCreator = false;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        },
        /**
         * Sign in the user as creator and save the required credentials.
         * @note This method only called when the user has registered as creator successfully.
         * @param {String} accessToken Store the access token of this user.
         * @param {String} refreshToken Store the refresh token of this user.
         */
        signInAsCreator(accessToken, refreshToken) {
            this.isAuth = true;
            this.isCreator = true;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        },
        /**
         * Sign out the current user and remove all credentials from authStore.
         */
        signOut() {
            this.isAuth = false;
            this.isCreator = false;
            this.accessToken = null;
            this.refreshToken = null;
        },
    },
});

export { useAuthStore };
