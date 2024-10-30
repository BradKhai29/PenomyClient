<template>
    <div class="title-section">
        <div class="text-h6 q-pa-sm title">{{ categoryName }}</div>
    </div>
    <div>
        <q-btn
            flat
            dense
            text-color="black"
            icon="arrow_left"
            @click="
                $refs.carousel.previous();
                calculatePage('previous');
            "
        />
        {{ page }} / {{ carouselSlides.length }}
        <q-btn
            flat
            dense
            text-color="black"
            icon="arrow_right"
            @click="
                $refs.carousel.next();
                calculatePage('next');
            "
        />
    </div>
    <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        v-model="slide"
        ref="carousel"
        height="450px"
    >
        <q-carousel-slide
            v-for="slide in carouselSlides"
            :key="slide.index"
            :name="slide.index"
            class="q-pa-sm"
        >
            <div class="row q-col-gutter-md">
                <div v-for="item in slide" class="col-2" :key="item">
                    <artwork-card :artwork="item" />
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>
</template>

<script setup>
import ArtworkCard from "src/components/common/artwork/comic/ComicByCategoryCard.vue";
import { ref, computed, onMounted } from "vue";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import axios from "axios";
const apiUrl = `${BaseWebApiUrl}/g4/ComicsByCategory/get`;
const slide = ref(0);
var categoryName = ref("");
var artworks = ref([]);
const page = ref(1);

function calculatePage(operation) {
    if (operation === "next") {
        page.value++;
        if (page.value > carouselSlides.value.length) {
            page.value = 1;
        }
    }
    if (operation === "previous") {
        page.value--;
        if (page.value < 1) {
            page.value = carouselSlides.value.length;
        }
    }
}
const carouselSlides = computed(() => {
    const itemsPerSlide = 6; // Adjust this value as needed
    return artworks.value.reduce((acc, item, index) => {
        const slideIndex = Math.floor(index / itemsPerSlide);
        if (!acc[slideIndex]) {
            acc[slideIndex] = [];
        }
        acc[slideIndex].index = slideIndex;
        acc[slideIndex].push(item);
        return acc;
    }, []);
});

onMounted(async () => {
    // get data from api
    await axios({
        url: apiUrl,
        method: HttpMethod.GET,
        params: {
            categoryId: "123456789012345685",
        },
    }).then((response) => {
        if (response.data.body.artworkList.length > 0) {
            artworks.value = response.data.body.artworkList;
            categoryName.value = response.data.body.category;
        }
    });
});
</script>

<style lang="css" scoped>
.title-section {
    display: flex;
    justify-content: space-between;
}

.title {
    padding-bottom: 0.1rem;
    border-bottom: 4px solid green;
    width: max-content;
}

div:has(> .title) {
    margin: 0 0.5rem;
    width: 99%;
    border-bottom: solid 0.1px grey;
}
</style>
