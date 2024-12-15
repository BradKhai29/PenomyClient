<template>
    <comment-input-field v-if="isAllowComment" :postId="props.postId" @createComment="onCreateComment" />
    <div v-if="isAllowComment">
        <h5 class="no-comment" v-if="comments.length === 0">Chưa có bình luận nào</h5>
        <UserComment v-for="comment in comments" :key="comment.id" :comment="comment" @deleteComment="onCommentDelete"
            @replyComment="onReplyCommentCreate" @replyCommentDelete="onReplyCommentDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserComment from "./UserComment.vue";
import CommentInputField from "./CommentInputField.vue";
import { useAuthStore } from "src/stores/common/AuthStore";
import PostCommentApiHandler from "src/api.handlers/UserPostHandler/PostCommentApiHandler";

var comments = ref([]);

// Init API handler for later operation.
const getPostCommentApiHandler = PostCommentApiHandler.GetPostCommentAsync;

const authStore = useAuthStore();
const commentSection = ref("1");

var props = defineProps({
    postId: {
        type: String,
        required: true,
    },
    isAllowComment: {
        type: Boolean,
        required: false,
    },
});
onMounted(() => {
    getComments();
});

async function getComments() {
    comments.value = (await getPostCommentApiHandler(props.postId)).responseBody.comments;
}
function onCommentDelete(id) {
    comments.value = comments.value.filter((comment) => comment.id !== id);
}

function onCreateComment() {
    getComments();
}

function onReplyCommentCreate(parentCommentId) {
    comments.value.find(
        (comment) => comment.id == parentCommentId
    ).totalReplies += 1;
}

function onReplyCommentDelete(parentCommentId) {
    comments.value.find(
        (comment) => comment.id == parentCommentId
    ).totalReplies -= 1;
}
</script>

<style scoped>
.no-comment {
    display: flex;
    justify-content: center;
}

.navigation {
    align-self: center;
    border-bottom: solid 0.1px grey;
    /* margin: 2rem 260px 0 260px; */
}
</style>
