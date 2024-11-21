<template>
    <q-page class="row justify-center">
        <section
            class="q-ma-sm bg-light shadow-1 auth-form text-dark-500 text-subtitle1"
        >
            <div class="row justify-center auth-input-margin-bottom">
                <span
                    class="border-radius-sm col-md-auto bg-primary-700 text-primary q-px-sm"
                >
                    Đăng nhập
                </span>
            </div>
            <div id="input-section">
                <EmailInput v-model="email" ref="emailInput" />

                <PasswordInput
                    v-model="password"
                    :error="hasErrorPassword"
                    ref="passwordInput"
                />

                <div class="row justify-between q-mb-md">
                    <q-btn
                        no-caps
                        dense
                        padding="xs"
                        unelevated
                        class="flex items-center"
                        @click="rememberLogin = !rememberLogin"
                    >
                        <q-icon
                            v-if="rememberLogin"
                            name="check"
                            :size="
                                $q.screen.lt.sm
                                    ? iconMobileSize
                                    : iconDesktopSize
                            "
                            class="bg-primary text-dark border-md-invisible border-radius-rounded q-pa-xs"
                        />
                        <q-icon
                            v-else
                            name="check"
                            :size="
                                $q.screen.lt.sm
                                    ? iconMobileSize
                                    : iconDesktopSize
                            "
                            class="border-radius-rounded border-md-dark-500 q-pa-xs"
                        />
                        <span class="q-ml-xs">Giữ đăng nhập</span>
                    </q-btn>
                    <router-link to="/auth/forgot-password">
                        <q-btn dense unelevated no-caps class="text-dark-500">
                            Quên mật khẩu?
                        </q-btn>
                    </router-link>
                </div>
                <div class="column">
                    <q-btn
                        class="border-radius-md bg-primary text-subtitle1 text-dark text-bold q-py-sm"
                        type="submit"
                        no-caps
                        :loading="isProcessing"
                        :disable="isProcessing"
                        @click="login"
                    >
                        Đăng nhập</q-btn
                    >
                    <div class="q-my-md text-center">Hoặc đăng nhập với</div>

                    <GoogleButton
                        :isLoading="isProcessing"
                        v-model="isProcessing"
                    />
                </div>
            </div>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { LoginApiHandler } from "src/api.handlers/auth/auth1Page/LoginApiHandler";
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { JwtTokenHelper } from "src/helpers/JwtTokenHelper";
import { UserProfile1ApiHandler } from "src/api.handlers/userProfile/userProfile1Page/UserProfile1ApiHandler";

// Import components section.
import EmailInput from "src/components/common/auth/EmailInput.vue";
import PasswordInput from "src/components/common/auth/PasswordInput.vue";
import GoogleButton from "src/components/common/auth/GoogleButton.vue";

export default {
    components: {
        EmailInput,
        PasswordInput,
        GoogleButton,
    },
    data() {
        return {
            iconDesktopSize: "14px",
            iconMobileSize: "12px",
            rememberLogin: false,
            showPassword: false,
            isProcessing: false,
            hasErrorPassword: false,
            email: "",
            password: "",
            emailInput: null,
            passwordInput: null,
        };
    },
    mounted() {
        // Get the all input component references.
        this.emailInput = this.$refs.emailInput;
        this.passwordInput = this.$refs.passwordInput;
    },
    methods: {
        verifyInput() {
            let isValid = true;

            isValid &= this.emailInput.verifyInput();
            isValid &= this.passwordInput.verifyInput();

            return isValid;
        },
        async login() {
            // Prevent user to click the button when the api is processing.
            if (this.isProcessing) {
                return;
            }

            // If verify input return false, then notify user to input required fields.
            if (!this.verifyInput()) {
                NotificationHelper.notifyError("Thông tin không hợp lệ");

                return;
            }

            // Turn on the isProcessing flag.
            this.isProcessing = true;

            const result = await LoginApiHandler.loginAsync(
                this.email,
                this.password
            );

            // Turn of the is processing flag after handling the request.
            this.isProcessing = false;

            if (!result.isSuccess) {
                NotificationHelper.notifyError(result.errorMessage);

                return;
            }

            // Store the related information to authStore.
            const authStore = useAuthStore();
            const userProfileStore = useUserProfileStore();

            // Get the user profile from the provided access-token.
            const userId = JwtTokenHelper.decodeJwt(result.accessToken).sub;

            const userProfile =
                await UserProfile1ApiHandler.getUserProfileAsync(
                    result.accessToken,
                    userId
                );

            authStore.signIn(result.accessToken, result.refreshToken);
            userProfileStore.signIn(userProfile);

            // Redirect back to homepage.
            this.$router.push("/");
            NotificationHelper.notifySuccess("Đăng nhập thành công");
        },
    },
    watch: {
        password() {
            this.hasErrorPassword = this.password == "";
        },
    },
};
</script>
