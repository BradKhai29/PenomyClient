<template>
    <q-expansion-item label="Khác" class="others-section-expansion">
        <SettingLink v-if="showSettings" />
        <SupportLink />
        <SendFeedbackLink />
    </q-expansion-item>
</template>

<script setup>
import SettingLink from "components/layouts/SettingLink.vue";
import SupportLink from "components/layouts/SupportLink.vue";
import SendFeedbackLink from "components/layouts/SendFeedbackLink.vue";

const props = defineProps({
    showSettings: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped>
.others-section-expansion {
    border-radius: 4px;
    background-color: #f9fafc !important;
    font-weight: bold !important;
}
</style>
