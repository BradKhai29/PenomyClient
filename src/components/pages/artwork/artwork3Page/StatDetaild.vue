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
function formatCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 100000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count;
}
const stats = computed(() => [
    { icon: 'visibility', value: `${formatCount(props.viewCount)}` },
    { icon: 'ion-heart', value: `${formatCount(props.favoriteCount)}` },
    { icon: 'star', value: `${formatCount(props.commentCount)}` },
    { icon: 'add_box', value: `${formatCount(props.starRates)}` },
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
