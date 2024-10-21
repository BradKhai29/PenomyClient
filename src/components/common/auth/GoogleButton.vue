<template>
    <q-btn
        @click="loginWithGoogle"
        no-caps
        class="q-py-sm border-radius-md"
        :loading="isProcessing"
        :disable="isLoading || isProcessing || loadingMode"
    >
        <img
            id="google-icon"
            src="/public/icons8-google.svg"
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
            loadingMode: true,
        };
    },
    mounted() {
        GoogleHelper.loadClientLibrary(() => {
            this.loadingMode = false;
        });
    },
    methods: {
        loginWithGoogle() {
            // Prevent user to click the button when is processing or being load.
            if (this.isProcessing || this.isLoading || this.loadingMode) {
                return;
            }

            this.loadingMode = true;
            GoogleHelper.loginWithGoogle(
                "my_state",
                this.handleLoginWithGoogle
            );
        },
        /**
         * Resolve the response from the google after user accept the consent screen.
         * @param {GoogleConsentResponse} response The response that received from google after
         * user accept the consent screen.
         */
        handleLoginWithGoogle(response) {
            console.log("Google response", response);

            this.loadingMode = false;
            this.isProcessing = true;
            this.emitEvent();
            setTimeout(() => {
                this.isProcessing = false;
                this.emitEvent();
            }, 2000);
        },
        emitEvent() {
            this.$emit("update:modelValue", this.isProcessing);
        },
    },
};
</script>
