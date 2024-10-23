<template>
    <div class="column">
        <div
            class="flex items-center justify-between input-header"
            :class="{ error: hasError }"
        >
            <label class="text-weight-bold">
                <span>{{ label }}</span>
                <span v-if="required" class="asterisk">*</span>
                <span v-else class="text-weight-regular q-ml-xs"
                    >(Có thể để trống)</span
                >
            </label>

            <span v-if="!hasError">
                {{ modelValue.length }}/{{ maxLength }}
            </span>
            <span v-if="hasError" class="error">{{ errorMessage }}</span>
        </div>
        <div class="input-wrapper" :class="{ error: hasError }">
            <textarea
                :rows="rows"
                :value="modelValue"
                @input="onInput"
                placeholder="Nhập phần giới thiệu tại đây"
                :style="textareaStyle"
            />
        </div>
        <div class="input-footer">{{ footerCaption }}</div>
    </div>
</template>

<script>
import { StringHelper } from "src/helpers/StringHelper";

const inputName = "introduction";
const minHeightInPixel = 200;

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
            required: true,
            default: "",
        },
        maxLength: {
            type: Number,
            required: true,
            default: 0,
        },
        rows: {
            type: Number,
            default: 8,
        },
        footerCaption: {
            type: String,
            required: true,
            default: "",
        },
        errorMessage: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            hasError: false,
            artworkOldIntro: null,
            textareaStyle: {
                "min-height": `${minHeightInPixel}px`,
            },
        };
    },
    mounted() {
        // Emit verify input event including this instance.
        this.$emit("verifyInput", this);

        // If the model value is not null, that means this artwork intro input
        // is used in update page, then set value for the artwork old intro.
        if (this.modelValue) {
            this.artworkOldIntro = this.modelValue;
        }

        if (this.rows) {
            const defaultRows = 8;
            const newMinHeight =
                minHeightInPixel * (this.rows / (defaultRows * 1.0));

            this.textareaStyle["min-height"] = `${newMinHeight}px`;
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

            if (this.required && !this.modelValue) {
                this.hasError = true;
            }

            return !this.hasError;
        },
    },
    watch: {
        modelValue() {
            // First verify the input when model value is changed.
            this.verifyInput();

            let hasChange = this.modelValue != StringHelper.emptyString();

            if (this.artworkOldIntro) {
                hasChange &= this.modelValue != this.artworkOldIntro;
            }

            this.$emit("hasChange", inputName, hasChange);
        },
    },
};
</script>

<style scoped>
textarea {
    resize: vertical;
}

.input-wrapper textarea {
    --dark: #120e36;

    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--dark);
    border-radius: 6.8px;
    font-size: 16px;
    background-color: transparent;
}

.input-wrapper textarea:focus {
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

.input-wrapper.error textarea {
    border-color: #dc5834;
    outline-color: #dc5834;
}
</style>
