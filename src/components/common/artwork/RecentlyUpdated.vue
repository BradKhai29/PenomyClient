<template>
    <div class="title">
        <div class="text-h6 recently-updated">Cập nhật gần đây</div>
        <div>
            <q-btn flat dense text-color="black" icon="arrow_left"
                @click="$refs.carousel.previous(); calculatePage('previous')" />
            {{ page }} / 5
            <q-btn flat dense text-color="black" icon="arrow_right"
                @click="$refs.carousel.next(); calculatePage('next')" />
        </div>
    </div>
    <q-carousel swipeable transition-prev="slide-right" transition-next="slide-left" animated v-model="slide"
        ref="carousel" infinite height="220px">
        <q-carousel-slide v-for="slide in carouselSlides" :key="slide.index" :name="slide.index">
            <div class="row q-col-gutter-md q-pa-sm">
                <div v-for="item in slide" class="col-3" :key="item">
                    <RecentlyUpdatedArtworkCard />
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>
</template>
<script setup>

import RecentlyUpdatedArtworkCard from 'src/components/common/artwork/RecentlyUpdatedArtworkCard.vue';
import { ref, computed } from 'vue'
const slide = ref(0);
const page = ref(1);

function calculatePage(operation) {
    if (operation === 'next') {
        page.value++
        if (page.value > 5) {
            page.value = 1
        }
    }
    if (operation === 'previous') {
        page.value--
        if (page.value < 1) {
            page.value = 5
        }
    }
}
const items = ref([
    { title: 'Item 1', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 2', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 3', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 4', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 5', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 6', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 7', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 8', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 9', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 10', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 11', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 12', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 13', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 14', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 15', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 16', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 17', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 18', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    { title: 'Item 19', image: 'https://cdn.quasar.dev/img/parallax2.jpg' },
    // ... more items
])

const carouselSlides = computed(() => {
    const itemsPerSlide = 4; // Adjust this value as needed
    return items.value.reduce((acc, item, index) => {
        const slideIndex = Math.floor(index / itemsPerSlide);
        if (!acc[slideIndex]) {
            acc[slideIndex] = [];
        }
        acc[slideIndex].index = slideIndex;
        acc[slideIndex].push(item);
        return acc;
    }, []);
})
</script>
<style scoped>
.title {
    display: flex;
    justify-content: space-between;
}

.recently-updated {
    padding-bottom: .1rem;
    border-bottom: 4px solid green;
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