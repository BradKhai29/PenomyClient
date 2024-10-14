<template>
    <q-page class="">
        <RecentlyUpdated />
        <RecommendArtworkByCategory />
        <CommentInputField />
        <UserComment />
        <comment-loader artworkId = '2336253634727936'/>
        <span class="text-h1">{{ emoji }}</span>
    </q-page>
</template>

<script setup>
import CommentInputField from "src/components/common/artwork/CommentInputField.vue";
import UserComment from "src/components/common/artwork/UserComment.vue";
import RecentlyUpdated from "src/components/common/artwork/comic/RecentlyUpdated.vue";
import RecommendArtworkByCategory from "src/components/common/artwork/comic/ArtworkByCategory.vue";
import CommentLoader from "src/components/common/artwork/CommentLoader.vue";
import { useAuthStore } from "src/stores/common/AuthStore";
import { ref } from "vue";
const authStore = useAuthStore();

const emoji = ref("😭");

const counterInitValue = 0;
const counter = ref(counterInitValue);

function clickMe() {
    authStore.increment();
    counter.value = authStore.counter;
}

defineOptions({
    name: "IndexPage",
});
</script>
