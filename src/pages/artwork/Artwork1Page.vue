<template>
    <q-page class="">
        <RecentlyUpdated />
        <ComicByCategory />
        <anime-by-category></anime-by-category>
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
