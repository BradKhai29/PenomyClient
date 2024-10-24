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

                    <q-btn flat round dense icon="image" size=".9rem" />
                    <q-btn flat round dense icon="image" size=".9rem" />
                </div>
            </q-item-section>
            <q-btn round dense icon="send" size=".5rem" color="primary" padding=".6rem" @click="sendComment(user)" />
        </q-item>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import { BaseWebApiUrl } from 'src/api.common/BaseWebApiUrl';
import { HttpMethod } from 'src/api.common/HttpMethod';
import EmojiPickerBoard from './EmojiPickerBoard.vue';
const isDirectlyComment = ref(true);
const props = defineProps({
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

    },
    commentId: {
        type: String,
        required: false,
    },
    isUpdate: {
        type: Boolean,
        required: false,
        default: false
    },
    isReply: {
        type: Boolean,
        required: false,
        default: false
    },
    oldComment: {
        type: String,
        required: false,
        default: ''
    }
})

const emit = defineEmits(['createComment', 'editComment']);
const comment = ref(props.oldComment);

if (props.isUpdate) {
    emit.value = 'editComment';
} else {
    emit.value = 'createComment';
}

function onEmojiSelected(emoji) {
    comment.value += emoji;
}

async function sendComment() {
    if (comment.value.match(/^\n+$/) == null && comment.value !== '') {
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
            })
                .then(() => {
                    emit('editComment', comment.value);
                });

        } else {
            if (props.isReply) {
                isDirectlyComment.value = false
                const apiUrl = `${BaseWebApiUrl}/g??/comment/reply`;
                await axios({
                    url: apiUrl,
                    method: HttpMethod.POST,
                    data: {
                        artworkId: props.artworkId,
                        chapterId: props.chapterId,
                        isDirectlyComment: isDirectlyComment.value,
                        commentContent: comment.value,
                        userId: 123,
                        parentCommentId: props.parentCommentId
                    },
                })
                    .then((response) => {
                        comment.value = '';
                        emit('createComment');
                    });
            }
            else {
                const apiUrl = `${BaseWebApiUrl}/g52/comment/create`;
                await axios({
                    url: apiUrl,
                    method: HttpMethod.POST,
                    data: {
                        artworkId: `${props.artworkId}`,
                        chapterId: `${props.chapterId}`,
                        isDirectlyComment: isDirectlyComment.value,
                        commentContent: `${comment.value}`,
                        userId: 123
                    },
                })
                    .then(() => {
                        comment.value = '';
                        emit('createComment');
                    });
            }
        }
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