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
import { defineExpose } from 'vue'
// import { useArtwork3Store } from "src/stores/pages/artwork3/Artwork3Store";

var comments = ref([]);
const apiUrl = `${BaseWebApiUrl}/g59/replycomment/get`;
// const store = useArtwork3Store();


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
    await axios({
        url: apiUrl,
        method: HttpMethod.GET,
        params: {
            parentCommentId: `${props.parentCommentId}`,
            userId: '1234'
        },
    })
        .then((response) => {
            comments.value = response.data.body.commentList;
        });
}

defineExpose({
    onReplyCommentCreate() {
        getComments()
    }
})

function onCommentDelete(id) {
    comments.value = comments.value.filter((comment) => comment.id !== id)
    // store.setTotalReply(comments.value.length)
    // store.setCommentId(props.parentCommentId)

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