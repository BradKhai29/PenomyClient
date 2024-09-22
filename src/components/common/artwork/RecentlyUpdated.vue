<template>
    <div class="title">
        <div class="text-h6 recently-updated">Cập nhật gần đây</div>
        <div>
            <q-btn flat dense text-color="black" icon="arrow_left" @click="$refs.carousel.previous(); calculatePage('previous')" />
            {{ page }} / 5
            <q-btn flat dense text-color="black" icon="arrow_right"
                @click="$refs.carousel.next(); calculatePage('next')" />
        </div>
    </div>
    <q-carousel swipeable animated v-model="slide" ref="carousel" infinite height="200px">
        <q-carousel-slide :name="1">
            <div class="row q-col-gutter-md q-pa-sm">
                <div v-for="n in 4" class="col-3" :key="`md-${n}`">
                    <RecentlyUpdatedArtworkCard />
                </div>
            </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2">
            <div class="row q-col-gutter-md q-pa-sm">
                <div v-for="n in 4" class="col-3" :key="`md-${n}`">
                    <RecentlyUpdatedArtworkCard />
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>
    <!-- <div class="row q-col-gutter-md">
        <div v-for="n in 7" class="col-3" :key="`md-${n}`">
            <RecentlyUpdatedArtworkCard />
        </div>
    </div> -->
</template>
<script setup>
import RecentlyUpdatedArtworkCard from 'src/components/common/artwork/RecentlyUpdatedArtworkCard.vue';
import { ref } from 'vue'
const slide = ref(1);
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