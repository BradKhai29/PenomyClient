<template>
    <q-btn
        @click="loginWithGoogle"
        no-caps
        class="q-py-sm border-radius-md bg-light-100 shadow-1"
        :loading="isProcessing"
        :disable="isLoading || isProcessing || isDisabled"
    >
        <img
            id="google-icon"
            src="https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729522629/penomy_assets/google.svg"
            alt="google-icon"
            origin="https://icons8.com/icon/V5cGWnc9R4xj/google"
            :style="googleIconStyle"
        />
        <!-- <a target="_blank" href="https://icons8.com">Icon by Icons8</a> -->
        <span class="q-ml-xs text-weight-bold text-subtitle1">Google</span>
    </q-btn>
</template>

<script>
import { GoogleConsentResponse, GoogleHelper } from "src/helpers/GoogleHelper";

export default {
    name: "GoogleButton",
    emits: ["update:modelValue"],
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            googleIconStyle: {
                width: "28px",
                height: "28px",
            },
            isProcessing: false,
            isDisabled: true,
        };
    },
    mounted() {
        GoogleHelper.loadClientLibrary(this.enableButton);
    },
    methods: {
        loginWithGoogle() {
            // Prevent user to click the button when is processing or being load.
            if (this.isProcessing || this.isLoading || this.isDisabled) {
                return;
            }

            // Disable the button to wait for handling the request.
            this.disableButton();

            GoogleHelper.loginWithGoogle(
                "my_state",
                this.handleLoginWithGoogle,
                this.handleError
            );
        },
        /**
         * Resolve the response from the google after user accept the consent screen.
         * @param {GoogleConsentResponse} response The response that received from google after
         * user accept the consent screen.
         */
        handleLoginWithGoogle(response) {
            console.log("Google response", response);

            this.isProcessing = true;
            this.emitEvent();
            setTimeout(() => {
                this.enableButton();
                this.emitEvent();
            }, 2000);
        },
        handleError(error) {
            this.enableButton();
            console.log("Error", error);
        },
        disableButton() {
            this.isDisabled = true;
            this.isProcessing = false;
        },
        enableButton() {
            this.isDisabled = false;
            this.isProcessing = false;
        },
        emitEvent() {
            this.$emit("update:modelValue", this.isProcessing);
        },
    },
};
</script>
