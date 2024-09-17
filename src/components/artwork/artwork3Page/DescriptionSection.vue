<template>
    <q-card>
        <div class="row">
            <div class="text-title">{{ title }}</div>
            <q-icon class="text-center q-py-sm q-px-sm rotate-135" name="ion-link"></q-icon>
        </div>
        <div class="description q-py-xs q-pt-sm">
            <div class="row">
                <div class="text-country col-6 q-pt-xs">
                    <strong>Quốc gia:</strong> {{ country }}
                </div>
                <div class="text-status col-6">
                    <strong>Trạng thái: </strong> {{ status }}
                    <q-icon class="q-px-xs" color=green name="ion-checkmark-circle"></q-icon>
                </div>
            </div>
            <div class="row">
                <div class="text-subtitle col-6 q-pt-xs">
                    <strong>Tác giả: </strong> {{ author }}
                </div>
                <div class="text-series col-6">
                    <strong>Series: </strong> {{ series }}
                </div>
            </div>
            <div class="row q-py-sm">
                <q-btn v-for="(button, index) in buttons" :key="index" unelevated :style="{
                    backgroundColor: '#1e3a8a',   // Dark blue color
                    color: 'white',
                    // White text
                }" :label="button.label" class="q-mr-md"></q-btn>
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
    { label: 'đời thường' }
])

</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif;
}

.text-title {
    font-size: 1.5em;
    font-weight: bold;
}


.desciption>div {
    font-size: 18px;
}
</style>
