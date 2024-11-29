<template>
    <q-tabs
        v-model="tab"
        class="text-primary text-h6 navigation q-pl-lg"
        no-caps
        inline-label
        dense
        max-width="300px"
    >
        <q-tab name="artwork" @click="curArtworkType = 1">
            <div>
                <q-icon name="palette" size="sm" class="text-primary" />
                <span class="text-black">Sáng tác</span>
            </div>
        </q-tab>
        <q-tab name="series" @click="curArtworkType = 3">
            <span class="text-black">Series đã tạo</span>
        </q-tab>
        <q-space />
    </q-tabs>

    <q-tab-panels
        v-model="tab"
        animated
        transition-next="fade"
        transition-prev="fade"
        transition-duration="500"
    >
        <q-tab-panel name="artwork">
            <q-tabs
                v-model="artworkType"
                active-color="white"
                active-bg-color="dark"
                class="text-black text-subtitle1"
                no-caps
                indicator-color="transparent"
                inline-label
                dense
                max-width="100px"
            >
                <q-tab
                    name="comic"
                    class="artwork-badge"
                    @click="curArtworkType = 1"
                >
                    Truyện tranh ({{ totalComic }})
                </q-tab>
                <q-tab
                    name="animation"
                    class="artwork-badge"
                    @click="curArtworkType = 2"
                >
                    Hoạt hình ({{ totalAnimation }})
                </q-tab>
                <q-space />
            </q-tabs>

            <q-tab-panels
                v-model="artworkType"
                animated
                transition-next="slide-right"
                transition-prev="slide-left"
                transition-duration="500"
            >
                <q-tab-panel name="comic">
                    <div
                        class="row q-col-gutter-md artwork-conainer"
                        height="50px"
                    >
                        <div v-for="item in artworks" class="col-3" :key="item">
                            <ComicCard :artwork="item" />
                        </div>
                    </div>
                    <AppPagination
                        class="justify-center flex q-mt-md"
                        :max="comicPages"
                        :model-value="1"
                        @update:model-value="getArtworkByPage"
                    />
                </q-tab-panel>

                <q-tab-panel name="animation">
                    <div class="row q-col-gutter-md q-pa-sm artwork-conainer">
                        <div v-for="item in artworks" class="col-3" :key="item">
                            <AnimeCard :artwork="item" />
                        </div>
                    </div>
                    <AppPagination
                        class="justify-center flex"
                        :max="animePages"
                        :model-value="1"
                        @update:model-value="getArtworkByPage"
                    />
                </q-tab-panel>
            </q-tab-panels>
        </q-tab-panel>

        <q-tab-panel name="series">
            <q-badge
                unelevated
                :style="{
                    backgroundColor: '#120E36', // Dark blue color
                    color: 'white', // Make text bold
                    fontSize: '16px', // Decrease font size
                    padding: '9.6px 10px',
                    marginLeft: '14px', // Adjust padding for a smaller badge
                    marginTop: '0px',
                }"
                label="Đã tạo"
                class="q-ml-md q-mt-xs justify-center cursor-pointer"
            >
                ({{ totalSeries }})</q-badge
            >
            <div class="row q-col-gutter-md q-pa-sm artwork-conainer">
                <div v-for="n in 8" :key="n" class="col-3">{{ n }} b</div>
            </div>
            <AppPagination
                class="justify-center flex"
                :max="seriesPages"
                :model-value="1"
                @update:model-value="getArtworkByPage"
            />
        </q-tab-panel>
    </q-tab-panels>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import ComicCard from "src/components/common/artwork/comic/RecentlyUpdatedArtworkCard.vue";
import AnimeCard from "src/components/common/artwork/anime/RecentlyUpdatedArtworkCard.vue";
import AppPagination from "src/components/common/others/AppPagination.vue";
import { useProfileStore } from "src/stores/pages/userProfile/UserProfile1PageStore";
import { GetArtworksByType } from "src/api.handlers/userProfile/UserProfile1Page";
import { useAuthStore } from "src/stores/common/AuthStore";

const profileStore = useProfileStore();
const authStore = useAuthStore();

const tab = ref("artwork");
const artworkType = ref("comic");
const artworks = ref([]);
const curArtworkType = ref(1);

// Artwork total page
const comicPages = ref(localStorage.getItem("page1"));
const animePages = ref(localStorage.getItem("page2"));
const seriesPages = ref(localStorage.getItem("page3"));

const totalComic = ref(localStorage.getItem("comic"));
const totalAnimation = ref(localStorage.getItem("animation"));
const totalSeries = ref(localStorage.getItem("series"));

// api
const getArtworkApi = GetArtworksByType;

onMounted(() => {
    if (authStore.isAuth) getArtworkByPage(1);
});
watch(
    () => curArtworkType.value,
    () => {
        if (authStore.isAuth) getArtworkByPage(1);
    }
);

async function getArtworkByPage(page) {
    artworks.value = profileStore.findArtworkByPage(curArtworkType.value, page);
    if (artworks.value.length == 0) {
        artworks.value = await getArtworkApi(curArtworkType.value, page);
        profileStore.setArtworksByType(curArtworkType.value, artworks.value);
    }
    console.log(artworks.value);
}
</script>

<style scoped>
.navigation {
    /* margin: 0.5rem; */
    width: 99%;
    border-bottom: solid 0.1px grey;
}

.artwork-badge {
    background-color: var(--light-300);
    border-radius: 5px;
    padding: 0 7px;
    margin: 0 0.8rem;
}

.artwork-conainer {
    height: 417px;
}
</style>
