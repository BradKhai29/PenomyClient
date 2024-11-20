<template>
    <q-page v-if="isLoading" class="row justify-center">
        <LoadingPlaceholder
            :routeToLogin="true"
            :error="invalidToken"
            :errorMessage="invalidToken ? 'Link đăng nhập không hợp lệ' : null"
        />
    </q-page>
</template>

<script>
// Import dependencies section.
import { JwtTokenHelper } from "src/helpers/JwtTokenHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { Auth6ApiHandler } from "src/api.handlers/auth/auth6Page/Auth6ApiHandler";
import { UserProfile1ApiHandler } from "src/api.handlers/userProfile/userProfile1Page/UserProfile1ApiHandler";
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

// Import components section.
import LoadingPlaceholder from "src/components/common/auth/LoadingPlaceholder.vue";

export default {
    name: "Auth6Page",
    components: {
        LoadingPlaceholder,
    },
    data() {
        return {
            isLoading: true,
            invalidToken: false,
            accessToken: null,
            refreshToken: null,
            appCode: null,
        };
    },
    beforeMount() {
        // Get the access-token, refresh-token extracted from the URL.
        this.accessToken = this.$route.query.access_token;
        this.refreshToken = this.$route.query.refresh_token;
        this.appCode = this.$route.query.app_code;

        // Clear the path after extracting for cleaner url.
        this.$router.replace(this.$router.path);

        // Check if contains any null params when extracting from URL.
        const containNullParams =
            !this.accessToken || !this.refreshToken || !this.appCode;

        if (containNullParams) {
            this.redirectToLoginPageWithErrors();
            return;
        }

        // Check if the extracted app code is valid or not.
        const VALID_APP_CODE = "SUCCESS";
        const isValidAppCode = this.appCode == VALID_APP_CODE;

        if (!isValidAppCode) {
            this.redirectToLoginPageWithErrors();
            return;
        }

        // Validate the input access-token.
        const isValidAccessToken = JwtTokenHelper.validateAccessTokenPayload(
            this.accessToken
        );

        if (!isValidAccessToken) {
            this.redirectToLoginPageWithErrors();
            return;
        }

        // Decode the refresh-token from the extracted url.
        this.decodeRefreshTokenFromBase64();
    },
    async mounted() {
        if (this.invalidToken) {
            return;
        }

        // Check if extracted tokens are valid or not.
        const result = await Auth6ApiHandler.verifyTokenAsync(
            this.accessToken,
            this.refreshToken
        );

        if (!result) {
            this.redirectToLoginPageWithErrors();
        }

        // Get the user profile from the provided access-token.
        const userId = JwtTokenHelper.decodeJwt(this.accessToken).sub;

        const userProfile = await UserProfile1ApiHandler.getUserProfileAsync(
            this.accessToken,
            userId
        );

        // Save the access token and refresh token to auth store.
        const authStore = useAuthStore();
        const userProfileStore = useUserProfileStore();

        authStore.signIn(this.accessToken, this.refreshToken);
        userProfileStore.signIn(userProfile);

        // Redirect user back to homepage.
        this.$router.push("/");
    },
    methods: {
        redirectToLoginPageWithErrors() {
            this.isLoading = false;
            this.invalidToken = true;

            NotificationHelper.notifyError("Link đăng nhập không hợp lệ");
            this.$router.push("/auth/login");
        },
        decodeRefreshTokenFromBase64() {
            const decodedRefreshToken = atob(
                this.refreshToken.replace(/-/g, "+").replace(/_/g, "/")
            );

            // Re-assign again the token after decoding.
            this.refreshToken = decodedRefreshToken;
        },
    },
};
</script>
