<template>
    <div class="input-container" :class="isUpdate || isReply ? '' : 'create'">
        <q-input autogrow class="q-pa-md" v-model="comment" borderless="" dense="dense" />
        <q-item tag="div">
            <q-item-section>
                <div>
                    <q-btn flat round dense icon="emoji_emotions" size=".9rem">
                        <q-menu>
                            <emoji-picker-board @onIconSelected="onEmojiSelected" />
                        </q-menu>
                    </q-btn>
                </div>
            </q-item-section>
            <q-btn round dense icon="send" size=".5rem" color="primary" padding=".6rem" @click="sendComment(user)">
            </q-btn>
        </q-item>
    </div>
    <popup-login-required :open="openLoginPopup" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import PostCommentApiHandler from "src/api.handlers/UserPostHandler/PostCommentApiHandler";
import { HttpMethod } from "src/api.common/HttpMethod";
import EmojiPickerBoard from "./EmojiPickerBoard.vue";
import { useAuthStore } from "src/stores/common/AuthStore.js";
import PopupLoginRequired from "../../others/PopupLoginRequired.vue";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { useRoute } from "vue-router";

const route = useRoute();

// define apis
const createPostCommentApi = PostCommentApiHandler.CreatePostCommentAsync;

const authStore = useAuthStore();
const isDirectlyComment = ref(true);
const isCommentEmpty = ref(false);
const props = defineProps({
    postId:{
        type: String,
        default: "1232131232"
    },
    artworkId: {
        type: String,
        required: false,
        default: "2336253634727936",
    },
    chapterId: {
        type: String,
        required: false,
        default: "0",
    },
    parentCommentId: {
        type: String,
        required: false,
        default: "0",
    },
    commentId: {
        type: String,
        required: false,
    },
    isUpdate: {
        type: Boolean,
        required: false,
        default: false,
    },
    isReply: {
        type: Boolean,
        required: false,
        default: false,
    },
    oldComment: {
        type: String,
        required: false,
        default: "",
    },

});

const emit = defineEmits(["createComment", "editComment", "replyComment"]);
const comment = ref(props.oldComment);
const openLoginPopup = ref(false);

function onEmojiSelected(emoji) {
    comment.value += emoji;
}

async function sendComment() {
    if (authStore.isAuth) {
        if (comment.value.match(/^\s*$/) == null) {
            comment.value = comment.value.trim();
            if (props.isUpdate) {

                const apiUrl = `${BaseWebApiUrl}/G53/comment/edit`;
                await axios({
                    url: apiUrl,
                    method: HttpMethod.PUT,
                    data: {
                        newComment: `${comment.value}`,
                        commentId: props.commentId,
                    },
                    headers: {
                        Authorization: authStore.bearerAccessToken(),
                    },
                }).then(() => {
                    emit("editComment", comment.value);
                });
            } else {
                if (props.isReply) {
                    isDirectlyComment.value = false;
                    const apiUrl = `${BaseWebApiUrl}/g58/replycomment/create`;
                    await axios({
                        url: apiUrl,
                        method: HttpMethod.POST,
                        data: {
                            artworkId: `${props.artworkId}`,
                            chapterId: `${props.chapterId}`,
                            commentContent: `${comment.value}`,
                            parentCommentId: `${props.parentCommentId}`,
                        },
                        headers: {
                            Authorization: authStore.bearerAccessToken(),
                        },
                    }).then(() => {
                        comment.value = "";
                        emit("replyComment", props.parentCommentId);
                    });
                } else {
                    if (route.path.includes("/post")) {
                        const response = await createPostCommentApi(
                            comment.value,
                            "23390001362423809"
                        )
                        if(response.responseBody.commentId != -1){
                            NotificationHelper.notifySuccess("Tạo bình luận thành công")
                        } else NotificationHelper.notifyError("Đã có lỗi xảy ra!")
                    }
                    const apiUrl = `${BaseWebApiUrl}/g52/comment/create`;
                    await axios({
                        url: apiUrl,
                        method: HttpMethod.POST,
                        data: {
                            artworkId: `${props.artworkId}`,
                            chapterId: `${props.chapterId}`,
                            isDirectlyComment: isDirectlyComment.value,
                            commentContent: `${comment.value}`,
                        },
                        headers: {
                            Authorization: authStore.bearerAccessToken(),
                        },
                    }).then(() => {
                        comment.value = "";
                        isCommentEmpty.value = false;
                        emit("createComment");
                    });
                }
            }
        }
    } else {
        openLoginPopup.value = !openLoginPopup.value;
    }
}
</script>
<style scoped>
.input-container {
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border: 1px solid #120e36;
    border-radius: 7px;
}

.create {
    margin-left: 260px;
    margin-right: 260px;
}
</style>
