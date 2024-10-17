<template>
    <q-expansion-item
        default-opened
        label="Dành cho bạn"
        class="for-you-expansion"
    >
        <PersonalProfileLink />
        <UploadArtworkLink />
        <ViewHistoryLink />
        <ReportedLink />
    </q-expansion-item>
</template>

<script setup>
import PersonalProfileLink from "./PersonalProfileLink.vue";
import UploadArtworkLink from "./UploadArtworkLink.vue";
import ViewHistoryLink from "./ViewHistoryLink.vue";
import FavoriteArtworksLink from "./FavoriteArtworksLink.vue";
import FollowedCreatorsLink from "./FollowedCreatorsLink.vue";
import ReportedLink from "./ReportedLink.vue";
</script>

<style scoped>
.for-you-expansion {
    border-radius: 4px;
    background-color: #f9fafc !important;
    font-weight: bold !important;
}
</style>
