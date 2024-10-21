<template>
    <q-btn
        dense
        no-caps
        unelevated
        class="shadow-1"
        @click="toggleTag"
        :class="{ 'bg-dark text-light': isSelected }"
    >
        {{ props.label }}
    </q-btn>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    originId: {
        type: Number,
        required: true,
        default: 0,
    },
    label: {
        type: String,
        required: true,
        default: "default",
    },
});

const emit = (["changeState"]);

const isSelected = ref(false);

function toggleTag() {
    isSelected.value = !isSelected.value;
    emit("changeState", props.originId, isSelected.value);
}
</script>
