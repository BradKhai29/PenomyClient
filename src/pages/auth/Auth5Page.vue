<template>
    <q-page v-if="isLoading" class="row justify-center">
        <LoadingPlaceholder
            :error="invalidToken"
            :errorMessage="invalidToken ? 'Link đăng ký không hợp lệ' : null"
        />
    </q-page>
    <q-page v-if="!isLoading && !invalidToken" class="row justify-center">
        <section
            class="q-ma-sm bg-light auth-form shadow-1 text-dark-500 text-subtitle1"
        >
            <div class="row justify-center auth-input-margin-bottom">
                <span
                    class="border-radius-sm col-md-auto bg-primary-700 text-primary q-px-sm"
                >
                    Đặt lại mật khẩu
                </span>
            </div>
            <div id="input-section">
                <div class="q-mb-md text-center">
                    Đặt mật khẩu mới cho tài khoản
                </div>
                <q-input
                    class="bg-light-300 q-mb-md text-subtitle1"
                    v-model="email"
                    disable
                    outlined
                    color="green"
                />

                <PasswordInput
                    v-model="password"
                    label="Mật khẩu mới"
                    :strictValidation="true"
                    :minLength="8"
                    @verifyInput="setPasswordInputCallback"
                    class="q-mb-md"
                />

                <PasswordInput
                    v-model="againPassword"
                    label="Nhập lại mật khẩu"
                    :error="hasErrorAgainPassword"
                />

                <div class="column">
                    <q-btn
                        class="border-radius-md bg-primary text-dark text-subtitle1 text-bold q-py-sm"
                        @click="confirmResetPassword"
                        :loading="isProcessing"
                        :disable="isProcessing"
                        no-caps
                    >
                        Xác nhận đổi
                    </q-btn>
                </div>
            </div>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { JwtTokenHelper } from "src/helpers/JwtTokenHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import PasswordInput from "src/components/common/auth/PasswordInput.vue";
import LoadingPlaceholder from "src/components/common/auth/LoadingPlaceholder.vue";
import { Auth5ApiHandler } from "src/api.handlers/auth/auth5Page/Auth5ApiHandler";

export default {
    components: {
        LoadingPlaceholder,
        PasswordInput,
    },
    data() {
        return {
            isLoading: true,
            invalidToken: false,
            isProcessing: false,
            email: "",
            password: "",
            againPassword: "",
            passwordInput: null,
            showPassword: false,
            hasErrorAgainPassword: false,
            resetPasswordToken: null,
        };
    },
    beforeMount() {
        // Pre-validate the value of the token before getting into the mounted hook.
        // If token is empty, then notify error to user.
        this.resetPasswordToken = this.$route.query.token;

        if (!this.resetPasswordToken) {
            this.invalidToken = true;
            return;
        }

        // Try to decode the payload before send to api, if failed then notify error.
        const decodedPayload = JwtTokenHelper.decodeJwt(
            this.resetPasswordToken
        );

        if (!decodedPayload) {
            this.invalidToken = true;
        }
    },
    async mounted() {
        // Check if the token is valid or not.
        const result = await Auth5ApiHandler.verifyResetPasswordTokenAsync(
            this.resetPasswordToken
        );

        // If the token is invalid, then notify error to user.
        if (!result.isValid) {
            this.invalidToken = true;

            return;
        }

        // Turn off isLoading flag to display input for user.
        this.email = result.email;
        this.isLoading = false;
    },
    methods: {
        setPasswordInputCallback(callbackItem) {
            // Get the input component reference.
            this.passwordInput = callbackItem;
        },
        verifyAgainPassword() {
            // Return false of again password is empty.
            if (!this.againPassword) {
                this.hasErrorAgainPassword = true;

                return false;
            }

            this.hasErrorAgainPassword = this.againPassword != this.password;

            return !this.hasErrorAgainPassword;
        },
        verifyInput() {
            let isValid = true;

            isValid &= this.passwordInput.verifyInput();
            isValid &= this.verifyAgainPassword();

            return isValid;
        },
        async confirmResetPassword() {
            // Prevent user to click the button when the api is processing.
            if (this.isProcessing) {
                return;
            }

            // If verify input return false, then notify user to input required fields.
            if (!this.verifyInput()) {
                NotificationHelper.notifyError(
                    "Mật khẩu không hợp lệ hoặc không trùng khớp"
                );

                return;
            }

            // Turn on is processing flag while the api is handling the request.
            this.isProcessing = true;

            const result = await Auth5ApiHandler.confirmResetPasswordAsync(
                this.resetPasswordToken,
                this.againPassword
            );

            // Turn off the flag after handling the request.
            this.isProcessing = false;

            if (result) {
                NotificationHelper.notifySuccess("Đặt lại mật khẩu thành công");

                this.$router.push("/auth/login");
                return;
            }

            NotificationHelper.notifyError("Có lỗi xảy ra");
        },
    },
    watch: {
        againPassword() {
            this.verifyAgainPassword();
        },
    },
};
</script>
