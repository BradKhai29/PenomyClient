<template>
    <q-item tag="div">
        <span class="text-weight-bold text-h5">Đoạn chat</span>
        <q-item-section>
        </q-item-section>
        <q-btn icon="edit_square" dense rounded unelevated color="grey-3" text-color="black" padding="sm" size="sm">
            <q-tooltip>Soạn tin</q-tooltip>
        </q-btn>
    </q-item>
    <q-input rounded outlined bg-color="grey-4" dense v-model="searchString" label="Tìm kiếm"
        class="q-pa-md">
        <template v-slot:prepend>
            <q-icon name="search" />
        </template>
    </q-input>

    <q-item tag="div" @click="selectFriend" clickable class="items-center rounded-borders q-gutter-md q-mr-lg q-ml-xs chat-card">
        <q-avatar size="3.5em" class="shadow-1">
            <q-img src="https://cdn.quasar.dev/img/avatar2.jpg" width="100%" height="100%" />
        </q-avatar>

        <q-item-section>
            <q-item-label class="text-weight-bold text-subtitle1">Nguyen Van A</q-item-label>
            <q-item-label class="text-subtitle2">Nguyen Van A</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script setup>
import { ref, onBeforeMount, watch, defineEmits } from 'vue';
const searchString = ref("");

const emit = defineEmits(['friendSelected']);
watch(
    () => searchString.value,
    () => {
        searchFriend();
    }
)
function searchFriend() {
    console.log(searchString.value);
}

function selectFriend() {
    emit('friendSelected',123);
}
</script>

<style scoped>
.left-side {
    border: 1px solid #cacaca;
    overflow: auto;
}

.chat-card {
    padding: 8px 0 0 8px;

}
</style>