<template>
    <div class="custom-radio-input flex items-center">
        <input
            type="radio"
            :name="props.name"
            :id="randomId"
            :value="props.value"
            @change="onChange"
            class="hidden"
            :checked="checked"
        />
        <label class="radio-check" :for="randomId"></label>
        <label class="label-radio-check" :for="randomId">
            {{ props.label }}
        </label>
    </div>
</template>

<script setup>
import { StringHelper } from "src/helpers/StringHelper";

const length = 6;
const randomId = StringHelper.generateSecureRandomString(length);

const props = defineProps({
    modelValue: {
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
        default: "",
    },
    value: {
        required: true,
    },
    checked: {
        type: Boolean,
    },
});

const emit = defineEmits(["update:modelValue"]);

/**
 * @param {InputEvent} event
 */
function onChange(event) {
    const value = event.target.value;

    emit("update:modelValue", value);
}
</script>

<style scoped>
.custom-radio-input {
    --dark: #120e36;
    --primary-700: #53bf94;
    --light: #dddddd;

    position: relative;
}

.radio-check {
    display: block;
    border: 1px solid var(--dark);
    border-radius: 100%;
    margin-right: 8px;
}

.radio-check:hover,
.label-radio-check:hover {
    cursor: pointer;
}

.custom-radio-input:hover .radio-check::before {
    background-color: var(--light);
    border-color: var(--light);
    transition: 0.2s;
}

.radio-check::before {
    display: block;
    content: "";
    background-color: transparent;
    border: 1px solid var(--dark);
    border-radius: 100%;
    height: 16px;
    width: 16px;
    margin: 3.6px;
}

input[type="radio"]:checked ~ .radio-check::before {
    background-color: var(--primary-700);
    border-color: var(--primary-700);
}
</style>

