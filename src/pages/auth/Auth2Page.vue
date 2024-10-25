<template>
    <q-page class="row justify-center">
        <section
            class="q-ma-sm bg-light auth-form shadow-1 text-dark-500 text-subtitle1"
        >
            <div class="row justify-center auth-input-margin-bottom">
                <span
                    class="border-radius-sm col-md-auto bg-primary-700 text-primary q-px-sm"
                >
                    Đăng ký
                </span>
            </div>
            <div id="input-section">
                <EmailInput v-model="email" ref="emailInput" />

                <div class="column">
                    <q-btn
                        class="border-radius-md bg-primary text-dark text-subtitle1 text-bold q-py-sm"
                        @click="getRegisterLink"
                        :loading="isProcessing"
                        :disable="isProcessing"
                        no-caps
                    >
                        Lấy link đăng ký
                    </q-btn>
                    <div class="q-my-md text-center">Hoặc đăng ký với</div>

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
import { Auth2ApiHandler } from "src/api.handlers/auth/auth2Page/Auth2ApiHandler";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import EmailInput from "src/components/common/auth/EmailInput.vue";
import GoogleButton from "src/components/common/auth/GoogleButton.vue";

export default {
    components: {
        EmailInput,
        GoogleButton,
    },
    data() {
        return {
            email: "",
            emailInput: null,
            isProcessing: false,
        };
    },
    mounted() {
        // Get the input component reference.
        this.emailInput = this.$refs.emailInput;
    },
    methods: {
        /**
         * Verify if the user has input all required fields or not.
         *
         * @returns {Boolean} The result after verifying the inputs.
         */
        verifyInput() {
            return this.emailInput.verifyInput();
        },
        async getRegisterLink() {
            // Prevent user to click the button when the api is processing.
            if (this.isProcessing) {
                return;
            }

            // If verify input return false, then notify user to input required fields.
            if (!this.verifyInput()) {
                this.hasError = true;
                NotificationHelper.notifyError("Thông tin không hợp lệ");

                return;
            }

            // Turn on is processing flag to prevent user spam.
            this.isProcessing = true;

            const result = await Auth2ApiHandler.getRegisterLinkAsync(
                this.email
            );

            // Turn of the is processing flag.
            this.isProcessing = false;

            if (!result.isSuccess) {
                NotificationHelper.notifyError(result.message);

                return;
            }

            NotificationHelper.notifySuccess("Vui lòng kiểm tra email của bạn");
        },
    },
    watch: {
        email() {
            const isValid = this.verifyInput();
            this.hasError = !isValid;
        },
    },
};
</script>
