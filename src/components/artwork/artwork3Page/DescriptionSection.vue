<template>
    <q-card>
        <div class="row">
            <div class="text-title">{{ title }}</div>
            <q-icon class="text-center q-py-sm q-px-sm rotate-135" name="ion-link"
                :style="{ boxShadow: '0 0 5px 2px #F9FAFC', borderRadius: '50%' }"></q-icon>
        </div>
        <div class="description q-py-xs q-pt-sm">
            <div class="row text-description">
                <div class="text-country col-6 q-pt-xs">
                    <strong>Quốc gia:</strong> {{ country }}
                </div>
                <div class="text-status col-6 ">
                    <strong>Trạng thái: </strong> {{ status }}
                    <q-icon class="q-px-xs" color="green" name="ion-checkmark-circle"></q-icon>
                </div>
            </div>
            <div class="row text-description">
                <div class="text-subtitle col-6 q-pt-xs">
                    <strong>Tác giả: </strong> {{ author }}
                </div>
                <div class="text-series col-6">
                    <strong>Series: </strong> {{ series }}
                </div>
            </div>
            <div class="row q-py-xs">
                <q-badge v-for="(button, index) in buttons" :key="index" unelevated :style="{
                    backgroundColor: '#120E36', // Dark blue color
                    color: 'white', // Make text bold
                    fontSize: '1rem', // Decrease font size
                    padding: '0.4rem 0.3rem' // Adjust padding for a smaller badge
                }" :label="button.label" class="q-mr-sm justify-center"></q-badge>
            </div>
            <div class="row absolute-bottom q-pb-md">
                <q-btn class="col-2 q-mr-sm" unelevated rounded no-caps
                    :style="{ fontSize: '0.7rem', backgroundColor: '#120E36', color: 'white', fontWeight: 'bold' }">
                    <q-icon name="ion-arrow-dropright" class=" q-mr-xs" />
                    Xem tiếp
                </q-btn>
                <q-btn class="col-2 q-mr-sm" unelevated rounded no-caps
                    :style="{ fontSize: '0.7rem', backgroundColor: '#120E36', color: 'white', fontWeight: 'bold' }">
                    Xem từ đầu
                </q-btn>
                <q-btn class="col-2 q-mr-sm" unelevated rounded no-caps
                    :style="{ fontSize: '0.7rem', backgroundColor: '#EEEEEE', color: '#120E36', fontWeight: 'bold' }">
                    <q-icon :color="'#120E36'" name="ion-heart" class="q-mr-xs" />
                    Yêu thích
                </q-btn>
                <q-btn class="col-3 q-mr-sm" unelevated rounded no-caps
                    :style="{ fontSize: '0.7rem', backgroundColor: '#EEEEEE', color: '#120E36', fontWeight: 'bold' }">
                    <q-icon :color="'#120E36'" name="ion-alert" class="q-mr-xs" />
                    Báo cáo vi phạm
                </q-btn>
            </div>
        </div>
    </q-card>
</template>

<script setup>
import { ref } from 'vue'

// Define reactive properties using `ref`
const title = ref('Học viện Anh Hùng mùa 1')
const author = ref('Horikoshi Kohei')
const country = ref('Nhật Bản')
const status = ref('Hoàn thành')
const series = ref('Học viện Anh Hùng')
const buttons = ref([
    { label: 'Hành động' },
    { label: 'Phiêu lưu' },
    { label: 'Viễn tưởng' },
    { label: 'Hài hước' },
    { label: 'Đời thường' }
])
</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif;
}

.text-title {
    font-size: 1.5rem;
    font-weight: bold;
}



.text-description {
    font-size: 0.8rem;
}
</style>
