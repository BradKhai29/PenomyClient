<template>
    <q-item tag="div" class="user-infor q-pa-md">
        <q-avatar size="3em">
            <img :src="comment.avatar" alt="">
            <q-badge floating color="teal" class="circle">
                <q-icon name="check" size="0.5rem" />
            </q-badge>
        </q-avatar>
        <div bold class="user-name">{{ comment.username }}</div>
        <div class="post-time">({{ comment.postDate }})</div>
        <q-btn v-if="comment.isAuthor" color="red" dense size=".7rem">Tác giả</q-btn>
        <q-space></q-space>

        <q-icon name="more_vert" class="cursor-pointer">
            <q-menu label="123" icon="more_vert" dropdown-icon="null"><q-list>
                    <q-item clickable v-close-popup @click="isEdit = !isEdit">
                        <q-item-section>
                            <q-item-label>Edit</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="deleteComment">
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
        <comment-input-field :commentId="editCommentProps.commentId" :isUpdate="editCommentProps.isUpdate"
            :oldComment="editCommentProps.oldComment" @editComment="editCommentHandler" />
    </div>

    <q-item tag="div">
        <q-item-label class="reply-container">
            <a class="cursor-pointer" @click="isReply = !isReply"><q-icon name="chat_bubble" /> Phản hồi</a>
            <a class="cursor-pointer">
                {{ comment.totalReplies }} phản hồi<q-icon name="arrow_drop_down_circle" />
            </a>

        </q-item-label>
        <q-space></q-space>
        <q-item-label>
            <q-btn color="primary" size=".7rem" dense icon="thumb_up">
                {{ comment.likeCount }}k
            </q-btn>
        </q-item-label>
    </q-item>
    <div v-if="isReply" class="q-pa-md"><comment-input-field /></div>
    <q-separator />
</template>

<script setup>
import { computed, ref, defineEmits } from 'vue';
import ChildComment from './ChildComment.vue';
import CommentInputField from './CommentInputField.vue';
import { BaseWebApiUrl } from 'src/api.common/BaseWebApiUrl';
import { HttpMethod } from 'src/api.common/HttpMethod';
import axios from 'axios';

const emit = defineEmits(['deleteComment']);
const isReply = ref(false);
const isEdit = ref(false);
var props = defineProps({
    comment: {
        type: Object,
        default: () => {
            return {
                id: {
                    type: BigInt,
                    default: 0
                },
                avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
                username: "username",
                postDime: "today",
                content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus maiores repellat sit, ad fuga nihil fugiat adipisci voluptate aliquid eum corrupti reiciendis, nam explicabo accusantium vitae voluptatum dolore asperiores?",
                likeCount: 10,
                totalReplies: 20,
                isAuthor: true
            }
        }
    },
    replies: {
        type: Array,
        default: () => []
    }
})
var editCommentProps = {
    commentId: String(props.comment.id),
    isUpdate: true,
    oldComment: props.comment.content
}
const url = `${BaseWebApiUrl}/g54/ArtworkComment/delete/${props.comment.id}`

function handleKeydown(event) {
    if (event.key === 'Escape') {
        isEdit.value = false
    }
}

async function deleteComment() {
    await axios({
        url: url,
        method: HttpMethod.DELETE,
    })
        .then(() => {
            emit('deleteComment', props.comment.id)
        });
}

function editCommentHandler(newComment) {
    isEdit.value = false
    editCommentProps.oldComment = newComment
}
</script>
<script>
export default {
    name: "artworkComment",
};
</script>
<style scoped>
.user-infor {
    display: flex;
    align-items: center;
    column-gap: .4rem;
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
    padding: .2rem;
}
</style>