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
            <textarea
                rows="8"
                :value="modelValue"
                @input="onInput"
                placeholder="Nhập phần giới thiệu tại đây"
            />
        </div>
        <div class="input-footer">{{ footerCaption }}</div>
    </div>
</template>

<script>
import { ref, watch } from "vue";

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
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const hasError = ref(false);

        const verifyInput = () => {
            hasError.value = false;

            if (props.required && !props.modelValue) {
                hasError.value = true;
            }

            return !hasError.value;
        };

        const onInput = (event) => {
            const inputValue = event.target.value + "";

            if (inputValue.length <= props.maxLength) {
                emit("update:modelValue", inputValue);

                return;
            }

            // If the input value is exceed the max length, then prevent user to input.
            const inputElement = event.target;
            inputElement.value = props.modelValue;
        };

        // Watch the input value and automatically verify input
        watch(
            () => props.modelValue,
            () => verifyInput()
        );

        return {
            hasError,
            onInput,
            verifyInput,
        };
    },
};
</script>

<style scoped>
textarea {
    resize: vertical;
    min-height: 200px;
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
