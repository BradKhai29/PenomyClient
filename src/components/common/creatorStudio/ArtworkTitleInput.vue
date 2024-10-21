<template>
    <div class="column">
        <div
            class="flex items-center justify-between input-header"
            :class="{ error: hasError }"
        >
            <label class="text-weight-bold">
                <span>{{ label }}</span>
                <span class="asterisk">*</span>
            </label>

            <span v-if="!hasError">
                {{ modelValue.length }}/{{ maxLength }}
            </span>
            <span v-if="hasError" class="error">{{ errorMessage }}</span>
        </div>
        <div class="input-wrapper" :class="{ error: hasError }">
            <input @input="onInput" :value="modelValue" />
        </div>
        <div class="input-footer">{{ footerCaption }}</div>
    </div>
</template>

<script>
import { StringHelper } from "src/helpers/StringHelper";
const inputName = "title";

export default {
    name: "CreateArtworkInput",
    props: {
        modelValue: {
            type: String,
            required: true,
            default: "",
        },
        required: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: "Tiêu đề",
        },
        maxLength: {
            type: Number,
            default: 0,
        },
        footerCaption: {
            type: String,
            default: "",
        },
        errorMessage: {
            type: String,
            default: "Không để trống",
        },
    },
    data() {
        return {
            hasError: false,
            artworkOldTitle: null,
        };
    },
    mounted() {
        // Emit verify input event including this instance.
        this.$emit("verifyInput", this);

        // If the model value is not null, that means this artwork title input
        // is used in update page, then set value for the artwork old title.
        if (this.modelValue) {
            this.artworkOldTitle = this.modelValue;
        }
    },
    emits: ["update:modelValue", "verifyInput", "hasChange"],
    methods: {
        /**
         * @param {InputEvent} event The event instance.
         */
        onInput(event) {
            const inputValue = event.target.value + "";

            if (inputValue.length <= this.maxLength) {
                this.$emit("update:modelValue", inputValue);

                return;
            }

            // If the input value is exceed the max length, then prevent user to input.
            const inputElement = event.target;
            inputElement.value = this.modelValue;
        },
        verifyInput() {
            this.hasError = false;

            if (this.required && this.modelValue == "") {
                this.hasError = true;
            }

            // If hasError is (false) then no error found, return (true).
            return !this.hasError;
        },
    },
    watch: {
        modelValue() {
            // First verify the input when model value is changed.
            this.verifyInput();

            let hasChange = this.modelValue != StringHelper.emptyString();

            // If artwork old title is not null, then check if the new input
            // value is similar to the artwork old title or not.
            if (this.artworkOldTitle) {
                hasChange &= this.modelValue != this.artworkOldTitle;
            }

            this.$emit("hasChange", inputName, hasChange);
        },
    },
};
</script>

<style scoped>
.input-wrapper input {
    --dark: #120e36;

    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--dark);
    border-radius: 6.8px;
    font-size: 16px;
    background-color: transparent;
}

.input-wrapper input:focus {
    outline: rgb(41, 121, 255) solid 1px;
}

.input-header {
    padding: 4px 0 6px 0;
}

.input-footer {
    padding: 4px 0px;
}

.asterisk {
    color: #dc5834;
    font-weight: bold;
}

/* Error section */
.input-header.error {
    color: #dc5834;
}

.input-wrapper.error input {
    border-color: #dc5834;
    outline-color: #dc5834;
}
</style>
