<template>
    <q-page class="">
        <RecentlyUpdated />
        <RecommendArtworkByCategory />
        <!-- <CommentInputField /> -->
        <comment-loader artworkId='2336253634727936' />
        <RecentlyUpdatedAnime />
        <anime-by-category/>
        <div class="q-pa-md">
            <q-btn color="primary" label="Handles click">
                <q-popup-proxy>
                    <q-banner>

                        You have lost connection to the internet. This app is offline.
                    </q-banner>
                </q-popup-proxy>
            </q-btn>
        </div>
    </q-page>
</template>

<script setup>
import AnimeByCategory from "src/components/common/artwork/anime/AnimeByCategory.vue";
import CommentInputField from "src/components/common/artwork/CommentInputField.vue";
import UserComment from "src/components/common/artwork/UserComment.vue";
import RecentlyUpdated from "src/components/common/artwork/comic/RecentlyUpdated.vue";
import RecommendArtworkByCategory from "src/components/common/artwork/comic/ComicByCategory.vue";
import CommentLoader from "src/components/common/artwork/CommentLoader.vue";
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
