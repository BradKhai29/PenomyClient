<template>
    <q-card>
        <div class="row">
            <div class="text-title">{{ title }}</div>
            <q-icon class="text-center q-py-sm q-px-sm rotate-135 rounded" name="link"
                :style="{ boxShadow: '0 0 5px 2px #F9FAFC', borderRadius: '50%', fontSize: '16px' }"></q-icon>
        </div>
        <div class="description ">
            <div class="row text-description">
                <div class="text-country col-6 q-pt-xs">
                    <strong>Quốc gia:</strong> {{ country }}
                </div>
                <div class="text-status col-6 ">
                    <strong>Trạng thái: </strong> {{ status }}
                    <q-icon class="q-px-xs" color="green" name="check_circle"></q-icon>
                </div>
            </div>
            <div class="row text-description">
                <div class="text-subtitle col-6 q-pt-xs">
                    <strong>Tác giả: </strong> {{ author }}
                </div>
                <div class="text-series col-6">
                    <strong>Series: </strong>
                    <span v-if="hasSeries">{{ seriesName }}</span>
                    <span v-else>No Series</span>
                </div>
            </div>
            <div class="row q-py-xs">
                <q-badge v-for="(button, index) in buttons" :key="index" unelevated :style="{
                    backgroundColor: '#120E36', // Dark blue color
                    color: 'white', // Make text bold
                    fontSize: '16px', // Decrease font size
                    padding: '8px 8px',
                    marginRight: '8px' // Adjust padding for a smaller badge
                }" :label="button.label" class="q-mr-sm justify-center"></q-badge>
            </div>
            <div class="row absolute-bottom q-pb-md">
                <q-btn class="col-2 action-btn" unelevated rounded no-caps
                    :style="{ fontSize: '16px', backgroundColor: '#120E36', color: 'white' }">
                    <q-icon name="arrow_right" class=" q-mr-xs" :style="{
                        fontSize: '32px'
                    }" />
                    Xem tiếp
                </q-btn>
                <q-btn class=" col-2 q-mr-sm action-btn" unelevated rounded no-caps
                    :style="{ fontSize: '16px', backgroundColor: '#120E36', color: 'white', }">
                    Xem từ đầu
                </q-btn>
                <q-btn class="col-2 q-mr-sm action-btn" unelevated rounded no-caps
                    :style="{ fontSize: '16px', backgroundColor: '#EEEEEE', color: '#120E36', }">
                    <q-icon name="ion-heart" class="q-mr-xs" />
                    Yêu thích
                </q-btn>
                <q-btn class="col-3 q-mr-sm action-btn" unelevated rounded no-caps
                    :style="{ fontSize: '16px', backgroundColor: '#EEEEEE', color: '#120E36', }">
                    <q-icon name="ion-alert" class="q-mr-xs" />
                    Báo cáo vi phạm
                </q-btn>
            </div>
        </div>
    </q-card>
</template>

<script setup>
import { ref } from 'vue'

// Define reactive properties using `ref`
import { defineProps } from 'vue'

// Define props for dynamic data
const props = defineProps({
    title: String,
    author: String,
    country: String,
    status: String,
    seriesName: String,
    buttons: {
        type: Array,
    },
    hasSeries: Boolean
})
</script>

<style scoped>
.action-btn {
    font-weight: bold;
    margin-right: 10px;
    padding: 8px 16px 8px 16px;
}

.description {
    padding-top: 4px;
    padding-bottom: 4px;
}

.text-title {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 32px;
    font-weight: bold;
    margin-right: 16px;
}



.text-description {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
}
</style>
