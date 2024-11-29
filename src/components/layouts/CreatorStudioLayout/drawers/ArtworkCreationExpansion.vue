<template>
    <q-expansion-item
        default-opened
        label="Đăng tải tác phẩm"
        class="artwork-creation-expansion"
    >
        <GeneralLink />
        <DeletedItemsLink />
    </q-expansion-item>
</template>

<script setup>
import GeneralLink from "./ArtworkCreationGeneralLink.vue";
import DeletedItemsLink from "./ArtworkCreationDeletedItemsLink.vue";
</script>

<style scoped>
.artwork-creation-expansion {
    border-radius: 4px;
    background-color: #f9fafc !important;
    font-weight: bold !important;
}
</style>
