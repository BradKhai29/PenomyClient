<template>
    <div class="text-h6 q-pa-sm">Các bản phim đáng mà quan tâm</div>
    <q-carousel control-color="black" arrows swipeable transition-prev="slide-right" transition-next="slide-left"
        animated v-model="slide" ref="carousel" height="440px">
        <q-carousel-slide v-for="slide in carouselSlides" :key="slide.index" :name="slide.index" class="q-pa-sm">
            <div class="row q-col-gutter-md">
                <div v-for="item in slide" class="col-2" :key="item">
                    <artwork-card artwork.name="artwork name" />
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>
</template>
<script setup>
import { ref, computed } from 'vue';
// import axios from 'axios';
import ArtworkCard from 'src/components/common/artwork/ArtworkByCategoryCard.vue';
const slide = ref(1);
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
    const itemsPerSlide = 6; // Adjust this value as needed
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