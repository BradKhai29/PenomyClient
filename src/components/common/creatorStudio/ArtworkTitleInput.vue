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
export default {
    name: "CreateArtworkInput",
    data() {
        return {
            hasError: false,
        };
    },
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
    mounted() {
        this.$emit("verifyInput", this);
    },
    emits: ["update:modelValue", "verifyInput"],
    methods: {
        /**
         * @param {InputEvent} event The event instance.
         */
        onInput(event) {
            const inputValue = event.target.value + "";

            if (inputValue.length <= this.maxLength) {
                this.$emit("update:modelValue", inputValue);
                this.verifyInput();

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
            this.verifyInput();
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
