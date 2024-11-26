<template>
    <comment-input-field v-if="isAllowComment" :artworkId="props.artworkId" @createComment="onCreateComment" />
    <q-tabs v-model="commentSection" class="text-primary text-h6 navigation q-pl-lg" no-caps inline-label dense
        max-width="300px" indicator-color="dark">
        <q-tab name="1" @click="getComments()">
            <div>
                <q-icon name="comment" size="sm" class="text-primary" />
                <span class="text-black">
                    Bình luận ({{ comments.length }})</span>
            </div>
        </q-tab>
        <!-- <div v-if="isAllowComment"> -->
            <q-tab v-if="isAllowComment" name="2" @click="getComments()">
                <span class="text-black">Top</span>
            </q-tab>
            <q-tab v-if="isAllowComment" name="3" @click="getComments()">
                <span class="text-black">Mới nhất</span>
            </q-tab>
        <!-- </div> -->
        <q-space />
    </q-tabs>
    <div v-if="!isAllowComment" class="flex items-center justify-center"
        style="background-color: #f2f2f2; margin: 2rem 260px; height: 10rem; border-radius: 3px; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);">
        <h6>Phần bình luận đã bị tắt !</h6>
    </div>
    <div v-if="isAllowComment">
        <h5 class="no-comment" v-if="comments.length === 0">No comments</h5>
        <UserComment v-for="comment in comments" :key="comment.id" :comment="comment" @deleteComment="onCommentDelete"
            @replyComment="onReplyCommentCreate" @replyCommentDelete="onReplyCommentDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import UserComment from "./UserComment.vue";
import CommentInputField from "./CommentInputField.vue";
import { useAuthStore } from "src/stores/common/AuthStore";

var comments = ref([]);
const apiUrl = `${BaseWebApiUrl}/g10/ArtworkComment/get`;
const authStore = useAuthStore();
const commentSection = ref("1");

var props = defineProps({
    artworkId: {
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
    // console.log(props.isAllowComment.value);
});

async function getComments() {
    if (authStore.isAuth) {
        await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                artworkId: props.artworkId,
                commentSection: commentSection.value,
            },
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        }).then((response) => {
            comments.value = response.data.body.commentList;
        });
    } else {
        await axios({
            url: apiUrl.concat(`/anonymous`),
            method: HttpMethod.GET,
            params: {
                artworkId: props.artworkId,
                commentSection: commentSection.value,
            },
        }).then((response) => {
            comments.value = response.data.body.commentList;
        });
    }
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
    margin-left: 260px;
}

.navigation {
    align-self: center;
    border-bottom: solid 0.1px grey;
    margin: 2rem 260px 0 260px;
}
</style>
