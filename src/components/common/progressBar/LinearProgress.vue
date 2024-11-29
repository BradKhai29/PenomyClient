<template>
    <q-linear-progress :value="progress" color="primary"/>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue'

const progress = ref(0.01)

const props = defineProps({
    isDone: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['isDone'])

onMounted(() => {
    progress.value = 0.8
})

watch(
    () => props.isDone,
    () => {
        if (props.isDone.value) {
            progress.value = 1.0
            emit('isDone')
        }
    }
)
</script>