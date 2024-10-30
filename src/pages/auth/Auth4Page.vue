<template>
    <q-page class="row justify-center">
        <section
            class="q-ma-sm bg-light auth-form shadow-1 text-dark-500 text-subtitle1"
        >
            <div class="row justify-center auth-input-margin-bottom">
                <span
                    class="flex items-center border-radius-sm col-md-auto bg-primary-700 text-primary q-px-sm"
                >
                    <span class="q-mr-xs"> Quên mật khẩu </span>
                    <q-icon name="info" size="xs"> </q-icon>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                    >
                        <strong class="text-subtitle2"
                            >Email phải được đăng ký trước đó</strong
                        >
                    </q-tooltip>
                </span>
            </div>
            <div id="input-section">
                <div class="q-mb-md text-center">
                    Nhập email để lấy lại mật khẩu
                </div>

                <EmailInput v-model="email" ref="emailInput" />

                <div class="column">
                    <q-btn
                        class="bg-primary border-radius-md text-dark text-subtitle1 text-bold q-py-sm"
                        @click="getResetPasswordLink"
                        :loading="isProcessing"
                        :disable="isProcessing"
                        no-caps
                    >
                        Lấy lại mật khẩu
                    </q-btn>
                </div>
            </div>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { Auth4ApiHandler } from "src/api.handlers/auth/auth4Page/Auth4ApiHandler";

// Import components section.
import EmailInput from "src/components/common/auth/EmailInput.vue";

export default {
    components: {
        EmailInput,
    },
    data() {
        return {
            email: "",
            emailInput: null,
            isProcessing: false,
        };
    },
    mounted() {
        // Get the all input component references.
        this.emailInput = this.$refs.emailInput;
    },
    methods: {
        verifyInput() {
            return this.emailInput.verifyInput();
        },
        async getResetPasswordLink() {
            // Prevent user to click the button when the api is processing.
            if (this.isProcessing) {
                return;
            }

            // Verify the input before process the request.
            if (!this.verifyInput()) {
                NotificationHelper.notifyError("Thông tin không hợp lệ");

                return;
            }

            // Turn on the isProcessing flag to resolve the request.
            this.isProcessing = true;

            const result = await Auth4ApiHandler.getResetPasswordLinkAsync(
                this.email
            );

            // Turn off the isProcessing flag after resolving the request.
            this.isProcessing = false;

            // Check the result of getting the reset password link.
            if (!result.isSuccess) {
                NotificationHelper.notifyError(result.message);

                return;
            }

            NotificationHelper.notifySuccess("Vui lòng kiểm tra email của bạn");
        },
    },
};
</script>
