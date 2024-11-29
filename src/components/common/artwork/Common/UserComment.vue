<template>
    <div :class="!isReplyComment ? 'comment-container' : ''">
        <q-item tag="div" class="user-infor q-pa-md">
            <q-avatar size="3em">
                <img :src="comment.avatar" alt="" />
                <q-badge floating color="teal" class="circle">
                    <q-icon name="check" size="0.5rem" />
                </q-badge>
            </q-avatar>
            <div bold class="user-name">{{ comment.username }}</div>
            <div class="post-time">({{ comment.postDate }})</div>
            <q-btn v-if="comment.isAuthor" color="red" dense size=".7rem"
                >Tác giả</q-btn
            >
            <q-space></q-space>

            <q-icon
                v-if="comment.isCommentAuthor"
                name="more_vert"
                class="cursor-pointer"
            >
                <q-menu label="123" icon="more_vert" dropdown-icon="null"
                    ><q-list>
                        <q-item
                            clickable
                            v-close-popup
                            @click="isEdit = !isEdit"
                        >
                            <q-item-section>
                                <q-item-label>Edit</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item
                            clickable
                            v-close-popup
                            @click="isDelete = !isDelete"
                        >
                            <q-item-section>
                                <q-item-label>Remove</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-icon>
        </q-item>

        <q-item v-show="!isEdit" tag="div" id="content" align="left">
            {{ editCommentProps.oldComment }}
        </q-item>
        <div v-if="isEdit" @keydown="handleKeydown">
            <comment-input-field
                :commentId="props.comment.id"
                :isUpdate="editCommentProps.isUpdate"
                :oldComment="editCommentProps.oldComment"
                @editComment="editCommentHandler"
            />
        </div>

        <q-item tag="div">
            <q-item-label class="reply-container" v-if="!isReplyComment">
                <a class="cursor-pointer" @click="isReply = !isReply"
                    ><q-icon name="chat_bubble" /> Phản hồi</a
                >
                <a
                    class="cursor-pointer"
                    @click="isShowReplyComment = !isShowReplyComment"
                >
                    {{ comment.totalReplies }} phản hồi<q-icon
                        name="arrow_drop_down_circle"
                    />
                </a>
            </q-item-label>
            <q-space></q-space>
            <q-item-label>
                <q-btn
                    v-if="!isLike"
                    color="grey-10"
                    size=".7rem"
                    dense
                    icon="thumb_up"
                    @click="likeComment()"
                >
                    {{ likeCount }}
                </q-btn>
                <q-btn
                    v-if="isLike"
                    color="primary"
                    size=".7rem"
                    dense
                    icon="thumb_up"
                    @click="unlikeComment()"
                >
                    {{ likeCount }}
                </q-btn>
            </q-item-label>
        </q-item>
        <q-separator />
        <div class="q-pr-xl q-pl-xl q-pt-md" v-if="isReply">
            <comment-input-field
                :isReply="editCommentProps.isReply"
                :parent-comment-id="props.comment.id"
                @replyComment="onReplyCommentCreate"
            />
        </div>
        <div class="q-pr-xl q-pl-xl q-pt-md" v-show="isShowReplyComment">
            <child-comment-loader
                :key="reloadKey"
                :parentCommentId="props.comment.id"
                @removeReplyComment="onReplyCommentDelete"
            />
        </div>
    </div>
    <popup-login-required :open="openLoginPopup" />
    <confirm-popup
        v-if="isDelete"
        message="You want to delete this comment?"
        @popupClick="popupClickHandler"
    />
</template>

<script setup>
import { ref } from "vue";
import CommentInputField from "./CommentInputField.vue";
import ChildCommentLoader from "./ChildCommentLoader.vue";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import ConfirmPopup from "./ConfirmPopup.vue";
import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { useAuthStore } from "src/stores/common/AuthStore";
import PopupLoginRequired from "../../others/PopupLoginRequired.vue";

var props = defineProps({
    comment: {
        type: Object,
        default: () => {
            return {
                id: {
                    type: string,
                },
                avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
                username: "username",
                postDime: "today",
                content:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus maiores repellat sit, ad fuga nihil fugiat adipisci voluptate aliquid eum corrupti reiciendis, nam explicabo accusantium vitae voluptatum dolore asperiores?",
                likeCount: 0,
                totalReplies: 0,
                isArtworkAuthor: false,
                isCommentAuthor: false,
                isLiked: false,
            };
        },
    },
    isReplyComment: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits([
    "deleteComment",
    "replyComment",
    "replyCommentDelete",
]);
const isShowReplyComment = ref(false);
const isReply = ref(false);
const isEdit = ref(false);
const isDelete = ref(false);
const isLike = ref(props.comment.isLiked);
const deleteUrl = `${BaseWebApiUrl}/g54/ArtworkComment/delete/${props.comment.id}`;
const likeUrl = `${BaseWebApiUrl}/g56/ArtworkComment/like/`;
const unlikeUrl = `${BaseWebApiUrl}/g57/comment/unlike/`;
const likeCount = ref(props.comment.likeCount);
const reloadKey = ref(0);
const openLoginPopup = ref(false);
const store = useAuthStore();

var editCommentProps = {
    isUpdate: true,
    isReply: true,
    oldComment: props.comment.content,
};

function handleKeydown(event) {
    if (event.key === "Escape") {
        isEdit.value = false;
    }
}

function popupClickHandler(isDeleteClicked) {
    if (isDeleteClicked) {
        deleteComment();
    } else {
        isDelete.value = false;
    }
}
async function deleteComment() {
    await axios({
        url: deleteUrl,
        method: HttpMethod.DELETE,
    }).then(() => {
        isDelete.value = false;
        emit("deleteComment", props.comment.id);
    });
}

async function likeComment() {
    if (!store.isAuth) openLoginPopup.value = true;
    else {
        await axios({
            url: likeUrl,
            method: HttpMethod.POST,
            data: {
                commentId: `${props.comment.id}`,
            },
            headers: {
                Authorization: store.bearerAccessToken(),
            },
        }).then(() => {
            likeCount.value += 1;
            isLike.value = true;
            console.log(store.accessToken);
        });
    }
}
async function unlikeComment() {
    if (!store.isAuth) openLoginPopup.value = true;
    else {
        await axios({
            url: unlikeUrl,
            method: HttpMethod.POST,
            data: {
                commentId: `${props.comment.id}`,
            },
            headers: {
                Authorization: store.bearerAccessToken(),
            },
        }).then(() => {
            likeCount.value -= 1;
            isLike.value = false;
        });
    }
}

function editCommentHandler(newComment) {
    isEdit.value = false;
    editCommentProps.oldComment = newComment;
}

function onReplyCommentCreate(parentCommentId) {
    reloadKey.value += 1;
    emit("replyComment", parentCommentId);
}

function onReplyCommentDelete(parentCommentId) {
    emit("replyCommentDelete", parentCommentId);
}
</script>
<script>
export default {
    name: "artworkComment",
};
</script>
<style scoped>
.comment-container {
    margin: 0 260px;
}

.user-infor {
    display: flex;
    align-items: center;
    column-gap: 0.4rem;
}

#content {
    color: var(--comment-color);
    font-size: 1vw;
}

a {
    color: var(--primary-color);
    font-weight: bold;
}

.reply-container {
    display: flex;
    gap: 1rem;
}

.circle {
    border-radius: 1000px;
    padding: 0.2rem;
}

.confirm-popup {
    width: 10vw !important;
}
</style>
