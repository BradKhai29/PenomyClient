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
import { ref } from 'vue';

const stats = ref([
    { icon: 'visibility', value: '100K' },
    { icon: 'ion-heart', value: '100K' },
    { icon: 'star', value: '4.8' },
    { icon: 'add_box', value: '3.6M' },
    { icon: 'info', value: 'Khác' }
]);
</script>
