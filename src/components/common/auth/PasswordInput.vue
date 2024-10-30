<template>
    <section id="password-input">
        <q-input
            :placeholder="label"
            class="text-subtitle1 bg-white"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :color="hasError || error ? 'negative' : 'green'"
            outlined
            :error="false"
        >
            <template v-slot:append>
                <q-btn dense flat @click="showPassword = !showPassword">
                    <q-icon
                        v-if="hasError || error"
                        name="info"
                        color="negative"
                    />
                    <q-icon
                        v-else
                        :name="showPassword ? 'visibility_off' : 'visibility'"
                    />
                </q-btn>
            </template>
        </q-input>
        <div
            v-if="strictValidation"
            id="password-criteria"
            class="q-gutter-sm"
            style="margin-top: -16px"
        >
            <div id="min-length-8" class="flex items-center">
                <PasswordCriteria
                    label="Tối thiểu 8 ký tự"
                    :isPassed="validMinLength"
                />
            </div>
            <div id="required-letters" class="flex items-center">
                <PasswordCriteria
                    label="Có chứa chữ số"
                    :isPassed="hasNumber"
                />
            </div>
            <div id="required-numbers" class="flex items-center">
                <PasswordCriteria
                    label="Có chữ hoa và thường"
                    :isPassed="hasUpperAndLower"
                />
            </div>
        </div>
    </section>
</template>

<script>
import { InputHelper } from "src/helpers/InputHelper";
import PasswordCriteria from "./PasswordCriteria.vue";

export default {
    emits: ["update:modelValue", "verifyInput"],
    components: {
        PasswordCriteria,
    },
    props: {
        modelValue: {
            type: String,
            required: true,
        },
        error: {
            type: Boolean,
            default: false,
        },
        strictValidation: {
            type: Boolean,
            default: false,
        },
        minLength: {
            type: Number,
            default: 1,
        },
        label: {
            type: String,
            default: "Nhập mật khẩu",
        },
    },
    data() {
        return {
            showPassword: false,
            hasError: false,
            password: "",
            validMinLength: false,
            hasUpperAndLower: false,
            hasNumber: false,
        };
    },
    mounted() {
        // Emit this component instance to parent component
        // for later verify input callback.
        this.$emit("verifyInput", this);
    },
    methods: {
        verifyInput() {
            if (this.strictValidation) {
                return this.strictVerifyInput();
            }

            // If no strict validation, then check if not empty.
            this.hasError = this.password == "";

            return !this.hasError;
        },
        /**
         * Strictly verify the value of the input password
         * based on the predefined criterias.
         */
        strictVerifyInput() {
            // First check if it is empty or not.
            this.hasError = this.password == "";

            if (this.hasError) {
                this.validMinLength = false;
                this.hasNumber = false;
                this.hasUpperAndLower = false;

                return false;
            }

            // Check each criteria for the validation.
            this.validMinLength = this.password.length >= this.minLength;
            this.hasNumber = InputHelper.containsNumber(this.password);
            this.hasUpperAndLower = InputHelper.containsUpperAndLower(
                this.password
            );

            return (
                this.validMinLength && this.hasNumber && this.hasUpperAndLower
            );
        },
    },
    watch: {
        password() {
            this.verifyInput();

            this.$emit("update:modelValue", this.password);
        },
    },
};
</script>
