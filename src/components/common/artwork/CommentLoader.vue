<template>
    <comment-input-field :artworkId="props.artworkId" @createComment="onCreateComment" />
    <h5 class="no-comment" v-if="comments.length === 0">No comments</h5>
    <UserComment v-for="comment in comments" :key="comment.id" :comment="comment" @deleteComment='onCommentDelete' />
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import UserComment from "./UserComment.vue";
import CommentInputField from "./CommentInputField.vue";
var comments = ref([]);
const apiUrl = `${BaseWebApiUrl}/g10/ArtworkComment/get`;

var props = defineProps({
    artworkId: {
        type: String,
        required: true
    }
});
onMounted(() => {
    getComments()
})

async function getComments() {
    await axios({
        url: apiUrl,
        method: HttpMethod.GET,
        params: {
            artworkId: props.artworkId
        },
    })
        .then((response) => {
            comments.value = response.data.body.commentList;
        });
}
function onCommentDelete(id) {
    comments.value = comments.value.filter((comment) => comment.id !== id)
}

function onCreateComment() {
    getComments()
}
</script>

<style scoped>
.no-comment {
    margin-left: 260px;
}
</style>