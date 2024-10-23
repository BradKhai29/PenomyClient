<template>
    <q-input
        placeholder="Email"
        class="text-subtitle1 bg-white border-radius-md"
        v-model="email"
        :error="hasError"
        outlined
        color="green"
    />
</template>

<script>
import { InputHelper } from "src/helpers/InputHelper";

export default {
    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            hasError: false,
            email: "",
        };
    },
    methods: {
        verifyInput() {
            this.hasError = !InputHelper.validateEmail(this.email);

            return !this.hasError;
        },
    },
    watch: {
        email() {
            this.verifyInput();

            this.$emit("update:modelValue", this.email);
        },
    },
};
</script>
