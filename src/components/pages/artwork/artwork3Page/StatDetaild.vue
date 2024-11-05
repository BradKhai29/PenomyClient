<template>
    <div class="row stats" v-if="!isLoading">
        <div v-for="(stat, index) in stats" :key="index" class="col-2" style="display: flex; align-items: center;">
            <q-icon :name="stat.icon" :style="{ color: '#53BF94', fontSize: '16px', lineHeight: '16px' }" />
            <span class="stats-detail" style="line-height: 16px;">{{ stat.value }}</span>
        </div>
    </div>
</template>

<style scoped>
.stats {
    font-family: Arial, Helvetica, sans-serif;
    padding-bottom: 32px;
}
</style>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { defineProps } from 'vue'
import { NumberHelper } from "src/helpers/NumberHelper";
const isLoading = ref(true);
const props = defineProps({
    viewCount: {
        type: Number,
        required: true,
        default: 0,
    },
    favoriteCount: {
        type: Number,
        required: true,
        default: 0,
    },
    commentCount: {
        type: Number,
        required: true,
        default: 0,
    },
    starRates: {
        type: Number,
        required: true,
        default: 0,
    },
});

const stats = computed(() => [
    { icon: 'visibility', value: NumberHelper.formatNumberShort(props.viewCount, 2) },
    { icon: 'ion-heart', value: NumberHelper.formatNumberShort(props.favoriteCount, 2) },
    { icon: 'star', value: NumberHelper.formatNumberShort(props.commentCount, 2) },
    { icon: 'add_box', value: NumberHelper.formatNumberShort(props.starRates, 2) },
    { icon: 'info', value: 'Khác' }
]);
onBeforeMount(handleBeforeMount)
async function handleBeforeMount() {
    // Turn off is loading flag to display component.
    isLoading.value = false;
}

// const stats = ref([
//     { icon: 'visibility', value: '100k' },
//     { icon: 'ion-heart', value: '100k' },
//     { icon: 'star', value: 4.8 },
//     { icon: 'add_box', value: '100M' },
//     { icon: 'info', value: 'Khác' }
// ]);
</script>
