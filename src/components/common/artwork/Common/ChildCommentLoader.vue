<template>
    <h5 class="no-comment" v-if="comments.length === 0">No comments</h5>
    <UserComment v-for="comment in comments" :key="comment.id" :comment="comment" @deleteComment='onCommentDelete'
        @replyComment='onReplyCommentCreate' :isReplyComment='true' />
</template>
<script setup>
import { ref, onMounted, defineEmits } from "vue";
import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import UserComment from "./UserComment.vue";
import { useAuthStore } from "src/stores/common/AuthStore";

var comments = ref([]);
const apiUrl = `${BaseWebApiUrl}/g59/replycomment/get`;
const authStore = useAuthStore();

const emit = defineEmits(['removeReplyComment']);
var props = defineProps({
    parentCommentId: {
        type: String,
        required: true
    },

});
onMounted(() => {
    getComments()
})

async function getComments() {
    if (authStore.isAuth) {
        await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                parentCommentId: props.parentCommentId,
            },
            headers: {
                Authorization: authStore.bearerAccessToken()
            }
        })
            .then((response) => {
                comments.value = response.data.body.commentList;
            });
    } else {
        await axios({
            url: apiUrl.concat(`/anonymous`),
            method: HttpMethod.GET,
            params: {
                parentCommentId: props.parentCommentId,
            },
        })
            .then((response) => {
                comments.value = response.data.body.commentList;
            });
    }
}

function onCommentDelete(id) {
    comments.value = comments.value.filter((comment) => comment.id !== id)
    emit('removeReplyComment', props.parentCommentId)
}

function onReplyCommentCreate() {
    getComments()
}
</script>

<style scoped>
.no-comment {
    margin-left: 260px;
}
</style>