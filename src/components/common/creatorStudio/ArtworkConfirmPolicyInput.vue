<template>
    <div @click="checkPolicy" class="policy-confirm-checkbox">
        <span class="wrapper q-mr-xs">
            <q-icon name="check" :class="{ checked: isChecked }"></q-icon>
        </span>
        <span>
            <span>Tôi xác nhận nội dung đăng tải tuân thủ </span>
            <a
                href="https://quasar.dev/layout/grid/flex-playground"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary text-weight-bold"
                style="text-decoration: none"
                >quy tắc nội dung</a
            >
            <span> của nền tảng <strong>Penomy</strong>.</span>
        </span>
    </div>
</template>

<script setup>
import { inject, ref, watch } from "vue";

const isChecked = ref(false);

const props = defineProps({
    modelValue: {
        required: true,
    },
    disable: {
        type: Boolean,
    },
});

const emit = defineEmits(["update:modelValue"]);

function checkPolicy() {
    // Reverse the check policy when clicking on.
    isChecked.value = !isChecked.value;
}

// Watch the isChecked value if any change happen.
watch(
    () => isChecked.value,
    (newValue, _) => {
        emit("update:modelValue", newValue);
    }
);
</script>

<style scoped>
.policy-confirm-checkbox {
    --dark: #120e36;
    --dark-700: #78847e;
    --primary-700: #53bf94;

    display: inline flex;
    align-items: center;
}

.policy-confirm-checkbox:hover {
    cursor: pointer;
}

.policy-confirm-checkbox .q-icon {
    padding: 4px;
    color: var(--dark-700);
    border: 1.6px solid var(--dark-700);
    border-radius: 100%;
    font-weight: bold;
}

.policy-confirm-checkbox .q-icon.checked {
    border-color: transparent;
    background-color: var(--primary-700);
    color: var(--dark);
}
</style>
