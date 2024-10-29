<template>
    <section id="email-input">
        <q-input
            placeholder="Email"
            class="text-subtitle1 bg-white"
            v-model="email"
            :error="hasError"
            outlined
            color="green"
        />
    </section>
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
