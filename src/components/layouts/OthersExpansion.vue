<template>
    <q-expansion-item
        default-opened
        label="Khác"
        class="others-section-expansion"
    >
        <SettingLink />
        <SupportLink />
        <SendFeedbackLink />
    </q-expansion-item>
</template>

<script setup>
import SettingLink from "components/layouts/SettingLink.vue";
import SupportLink from "components/layouts/SupportLink.vue";
import SendFeedbackLink from "components/layouts/SendFeedbackLink.vue";
</script>

<style scoped>
.others-section-expansion {
    border-radius: 4px;
    background-color: #f9fafc !important;
    font-weight: bold !important;
}
</style>
