<template>
    <q-page class="">
        <RecentlyUpdatedAnime />
        <anime-by-category></anime-by-category>
    </q-page>
</template>

<script setup>
import AnimeByCategory from "src/components/common/artwork/anime/AnimeByCategory.vue";
import RecentlyUpdatedAnime from "src/components/common/artwork/anime/RecentlyUpdated.vue";
// import { ref } from "vue";

function clickMe() {
    authStore.increment();
    counter.value = authStore.counter;
}

defineOptions({
    name: "IndexPage",
});
</script>
