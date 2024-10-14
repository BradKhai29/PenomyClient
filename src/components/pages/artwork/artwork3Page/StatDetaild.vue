<template>
    <div class="row stats">
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
import { ref, computed } from 'vue';
import { defineProps } from 'vue'

const props = defineProps({
    viewCount: {
        type: Number,
        required: true,
    },
    favoriteCount: {
        type: Number,
        required: true,
    },
    commentCount: {
        type: Number,
        required: true,
    },
    starRates: {
        type: Number,
        required: true,
    },
});

// Destructure into computed properties
const viewCount = computed(() => `${props.viewCount}k`);
const favoriteCount = computed(() => `${props.favoriteCount}k`);
const commentCount = computed(() => `${props.commentCount}k`);
const starRates = computed(() => `${props.starRates}`);

// Use computed properties in the stats array
const stats = computed(() => [
    { icon: 'visibility', value: viewCount.value },
    { icon: 'ion-heart', value: favoriteCount.value },
    { icon: 'star', value: starRates.value },
    { icon: 'add_box', value: commentCount.value },
    { icon: 'info', value: 'Khác' }
]);

// const stats = ref([
//     { icon: 'visibility', value: '100k' },
//     { icon: 'ion-heart', value: '100k' },
//     { icon: 'star', value: 4.8 },
//     { icon: 'add_box', value: '100M' },
//     { icon: 'info', value: 'Khác' }
// ]);
</script>
