<template>
    <div class="q-pa-md row justify-center">
        <div style="width: 100%">
            <ChatMessage />
            <ChatMessage :is-me="true" />

        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import ChatMessage from './ChatMessage.vue';

const props = defineProps({
    messages: {
        type: Array,
        default: null
    },
});
</script>