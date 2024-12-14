<template>
    <div class="input-container" :class="isReply ?'reply' : ''">
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
import PostCommentApiHandler from "src/api.handlers/UserPostHandler/PostCommentApiHandler";
import EmojiPickerBoard from "../../artwork/Common/EmojiPickerBoard.vue";
import { useAuthStore } from "src/stores/common/AuthStore.js";
import PopupLoginRequired from "../../others/PopupLoginRequired.vue";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { useRoute } from "vue-router";

const route = useRoute();

// define apis
const createPostCommentApi = PostCommentApiHandler.CreatePostCommentAsync;
const updatePostCommentApi = PostCommentApiHandler.UpdatePostCommentAsync;

const authStore = useAuthStore();

const isDirectlyComment = ref(true);
const props = defineProps({
    postId: {
        type: Number,
        default: 1232131232
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
                const response = await updatePostCommentApi(
                    comment.value,
                    props.commentId
                )
                if (response.isSuccess) {
                    emit("editComment", comment.value);
                }

            } else {
                if (props.isReply) {
                    isDirectlyComment.value = false;
                    emit("replyComment", comment.value);
                } else {
                    if (route.path.includes("/post") || route.path.includes("/social")) {
                        const response = await createPostCommentApi(
                            comment.value,
                            props.postId
                        )
                        if (response.responseBody.commentId != -1) {
                            NotificationHelper.notifySuccess("Tạo bình luận thành công")
                            comment.value = "";
                            emit("createComment");
                        } else NotificationHelper.notifyError("Đã có lỗi xảy ra!")
                    }
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

.reply {
    margin: 0 0 0 30px;
}
</style>
