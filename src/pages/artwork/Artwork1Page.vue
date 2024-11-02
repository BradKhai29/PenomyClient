<template>
    <q-page class="">
        <RecentlyUpdated />
        <ComicByCategory />
        <div class="q-pa-md">
            <q-btn color="primary" label="Handles click">
                <q-popup-proxy>
                    <q-banner>
                        You have lost connection to the internet. This app is
                        offline.
                    </q-banner>
                </q-popup-proxy>
            </q-btn>
            <anime-by-category></anime-by-category>
        </div>
    </q-page>
</template>

<script setup>
import AnimeByCategory from "src/components/common/artwork/anime/AnimeByCategory.vue";
import RecentlyUpdated from "src/components/common/artwork/comic/RecentlyUpdated.vue";
import ComicByCategory from "src/components/common/artwork/comic/ComicByCategory.vue";
import RecentlyUpdatedAnime from "src/components/common/artwork/anime/RecentlyUpdated.vue";
import { ref } from "vue";

function clickMe() {
    authStore.increment();
    counter.value = authStore.counter;
}

defineOptions({
    name: "IndexPage",
});
</script>
