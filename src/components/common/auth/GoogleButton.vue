<template>
    <q-btn
        @click="loginWithGoogle"
        no-caps
        class="q-py-sm border-radius-md bg-light-100 shadow-1"
        :loading="isLoading"
        :disable="isLoading"
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
import { GoogleHelper } from "src/helpers/GoogleHelper";

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
        };
    },
    methods: {
        loginWithGoogle() {
            GoogleHelper.signInWithGoogle();
        },
    },
};
</script>
