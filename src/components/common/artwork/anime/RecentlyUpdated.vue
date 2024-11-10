<template>
    <div class="title">
        <div class="text-h6 recently-updated">Cập nhật gần đây</div>
        <div>
            <q-btn flat dense text-color="black" icon="arrow_left"
                @click="$refs.carousel.previous(); calculatePage('previous')" />
            {{ page }} / {{ carouselSlides.length }}
            <q-btn flat dense text-color="black" icon="arrow_right"
                @click="$refs.carousel.next(); calculatePage('next')" />
        </div>
    </div>
    <div v-if="artworks.length === 0" class="row q-col-gutter-md q-pa-sm">
        <div v-for="index in 4" :key="index" class="col-3">
            <artwork1Skeleton />
        </div>
    </div>
    <q-carousel v-if="artworks.length > 0" swipeable transition-prev="slide-right" transition-next="slide-left" animated v-model="slide"
        ref="carousel" infinite height="220px">
        <q-carousel-slide v-for="slide in carouselSlides" :key="slide.index" :name="slide.index">
            <div class="row q-col-gutter-md q-pa-sm">
                <div v-for="item in slide" class="col-3" :key="item">
                    <RecentlyUpdatedArtworkCard :artwork="item" />
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>
</template>
<script setup>

import RecentlyUpdatedArtworkCard from 'src/components/common/artwork/anime/RecentlyUpdatedArtworkCard.vue';
import { ref, computed, onMounted } from 'vue'
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from 'src/api.common/HttpMethod';
import artwork1Skeleton from '../Common/skeleton/artwork1Skeleton.vue';
import axios from 'axios';

const apiUrl = `${BaseWebApiUrl}/g13/RecentlyUpdatedAnimes`;
const slide = ref(0);
const page = ref(1);
var artworks = ref([]);
function calculatePage(operation) {
    if (operation === 'next') {
        page.value++
        if (page.value > carouselSlides.value.length) {
            page.value = 1
        }
    }
    if (operation === 'previous') {
        page.value--
        if (page.value < 1) {
            page.value = carouselSlides.value.length
        }
    }
}
const carouselSlides = computed(() => {
    const itemsPerSlide = 4; // Adjust this value as needed
    return artworks.value.reduce((acc, item, index) => {
        const slideIndex = Math.floor(index / itemsPerSlide);
        if (!acc[slideIndex]) {
            acc[slideIndex] = [];
        }
        acc[slideIndex].index = slideIndex;
        acc[slideIndex].push(item);
        return acc;
    }, []);
})
function calculateDayDifference(startDate) {
    const start = new Date(startDate);
    const end = new Date(new Date());
    const millisecondsDifference = end.getTime() - start.getTime();
    const delta = millisecondsDifference / 86400000;
    if (delta < 30) {
        return `${Math.floor(delta)} ngày trước`;
    } else {
        const months = Math.floor(delta / 30);
        return `${months} tháng trước`;
    }
}

onMounted(async () => {
    // get data from api
    await axios({
        url: apiUrl,
        method: HttpMethod.GET,
        params: {
            empty: true
        },
    }).then((response) => {
        artworks.value = response.data.body.artworkList
        artworks.value.forEach((item) => {
            item.lastUpdateAt = calculateDayDifference(item.lastUpdateAt)
        })
    });
})
</script>

<style scoped>
.title {
    display: flex;
    justify-content: space-between;
}

.recently-updated {
    padding-bottom: .1rem;
    border-bottom: 4px solid var(--primary);
    width: max-content;
}

div:has(> .recently-updated) {
    margin: 0 .5rem;
    width: 99%;
    border-bottom: solid 0.1px grey;
}

.q-carousel__slide {
    padding: 0;
    height: 100px !important;
}
</style>