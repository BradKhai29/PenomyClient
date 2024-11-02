<template>
    <q-tabs v-model="tab" class="text-primary text-h6 navigation q-pl-lg" no-caps inline-label dense max-width="300px">
        <q-tab name="artwork">
            <div>
                <q-icon name="palette" size="sm" class="text-primary" />
                <span class="text-black">Sáng tác</span>
            </div>
        </q-tab>
        <q-tab name="series">
            <span class="text-black">Series đã tạo</span>
        </q-tab>
        <q-space />
    </q-tabs>

    <q-tab-panels v-model="tab" animated transition-next="fade" transition-prev="fade" transition-duration="500">
        <q-tab-panel name="artwork">
            <q-tabs v-model="artworkType" active-color="white" active-bg-color="dark" class="text-black text-subtitle1 "
                no-caps indicator-color="transparent" inline-label dense max-width="100px">
                <q-tab name="comic" class="artwork-badge">
                    Truyện tranh ({{ 4 }})
                </q-tab>
                <q-tab name="animation" class="artwork-badge">
                    Hoạt hình ({{ 4 }})
                </q-tab>
                <q-space />
            </q-tabs>

            <q-tab-panels v-model="artworkType" animated transition-next="slide-right" transition-prev="slide-left"
                transition-duration="500">
                <q-tab-panel name="comic">
                    <div class="q-pa-md">
                        <div class="row">
                            <div v-for="n in 8" :key="n" class="col-3">
                                {{ n }} a
                            </div>
                        </div>
                    </div>
                    <AppPagination :max="20" />
                </q-tab-panel>

                <q-tab-panel name="animation">
                    <div class="q-pa-md">
                        <div class="row">
                            <div v-for="n in 8" :key="n" class="col-3">
                                {{ n }} a1
                            </div>
                        </div>
                    </div>
                </q-tab-panel>
            </q-tab-panels>



        </q-tab-panel>

        <q-tab-panel name="series">
            <q-badge unelevated :style="{
                backgroundColor: '#120E36', // Dark blue color
                color: 'white', // Make text bold
                fontSize: '16px', // Decrease font size
                padding: '9.6px 10px',
                marginLeft: '14px', // Adjust padding for a smaller badge
                marginTop: '0px'
            }" label="Đã tạo" class="q-ml-md q-mt-xs justify-center cursor-pointer"> ({{ 4 }})</q-badge>
            <div class="q-pa-md">
                <div class="row">
                    <div v-for="n in 8" :key="n" class="col-3">
                        {{ n }} b
                    </div>
                </div>
            </div>
        </q-tab-panel>
    </q-tab-panels>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import ComicCard from 'src/components/common/artwork/comic/RecentlyUpdatedArtworkCard.vue';
import AnimeCard from 'src/components/common/artwork/anime/RecentlyUpdatedArtworkCard.vue';
import { useRouter } from 'vue-router';
import { ArtworkType } from 'src/api.common/ArtworkType';
import { userProfileStore } from 'src/stores/pages/userProfile/UserProfileStore.js';
import AppPagination from 'src/components/common/others/AppPagination.vue';


// const userProfile = userProfileStore();
// const router = useRouter();
const tab = ref('artwork');
const artworkType = ref('comic');
</script>

<style scoped>
.navigation {
    margin: 0.5rem;
    width: 99%;
    border-bottom: solid 0.1px grey;
}

.artwork-badge {
    background-color: var(--light-300);
    border-radius: 5px;
    padding: 0 7px;
    margin: 0 0.8rem;
}
</style>