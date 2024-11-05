<template>
    <comment-input-field :artworkId="props.artworkId" @createComment="onCreateComment" />
    <h5 class="no-comment" v-if="comments.length === 0">No comments</h5>
    <UserComment v-for="comment in comments" :key="comment.id" :comment="comment" @deleteComment='onCommentDelete'
        @replyComment='onReplyCommentCreate' @replyCommentDelete='onReplyCommentDelete' />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import UserComment from "./UserComment.vue";
import CommentInputField from "./CommentInputField.vue";
import { useArtwork3Store } from 'src/stores/pages/artwork3/Artwork3Store';
import { useAuthStore } from "src/stores/common/AuthStore";

var comments = ref([]);
const apiUrl = `${BaseWebApiUrl}/g10/ArtworkComment/get`;
const store = useArtwork3Store();
const authStore = useAuthStore();

var props = defineProps({
    artworkId: {
        type: String,
        required: true
    }
});
onMounted(() => {
    getComments()
})

watch(() => store.target, () => {
    console.log("store change")
    comments.value.filter((comment) => comment.id == store.commentId).totalReplies = store.getTotalReply
})

async function getComments() {
    if (authStore.isAuth) {
        await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                artworkId: props.artworkId,
            },
            headers: {
                Authorization: authStore.bearerAccessToken
            }
        })
            .then((response) => {
                comments.value = response.data.body.commentList;
            });
    } else {
        apiUrl.concat(`/anonymous`);
        await axios({
            url: apiUrl.concat(`/anonymous`),
            method: HttpMethod.GET,
            params: {
                artworkId: props.artworkId,
            },
        })
            .then((response) => {
                comments.value = response.data.body.commentList;
            });
    }
}
function onCommentDelete(id) {
    comments.value = comments.value.filter((comment) => comment.id !== id)
}

function onCreateComment() {
    getComments()
}

function onReplyCommentCreate(parentCommentId) {
    comments.value.find((comment) => comment.id == parentCommentId).totalReplies += 1;
}

function onReplyCommentDelete(parentCommentId) {
    comments.value.find((comment) => comment.id == parentCommentId).totalReplies -= 1;
}
</script>

<style scoped>
.no-comment {
    margin-left: 260px;
}
</style>