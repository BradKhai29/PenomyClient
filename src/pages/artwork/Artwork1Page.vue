<template>
    <q-page class="">
        <RecentlyUpdated />
        <RecommendArtworkByCategory />
        <CommentInputField />
        <UserComment />
        <artwork-allow-comment-input />
    </q-page>
</template>

<script setup>
import ArtworkAllowCommentInput from "src/components/common/creatorStudio/ArtworkAllowCommentInput.vue";
import UserComment from "src/components/common/artwork/UserComment.vue";
import RecentlyUpdated from "src/components/common/artwork/RecentlyUpdated.vue";
import RecommendArtworkByCategory from "src/components/common/artwork/RecommendArtworkByCategory.vue";
import { useAuthStore } from "src/stores/common/AuthStore";
import { ref } from "vue";
const authStore = useAuthStore();

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
