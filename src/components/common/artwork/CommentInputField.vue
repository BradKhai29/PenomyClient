<template>
    <div class="input-container">
        <q-input autogrow class="q-pa-md" v-model="comment" borderless="" dense="dense"
            @keyup.enter="sendComment(user)" />
        <q-item tag="div">
            <q-item-section>
                <div>
                    <q-btn flat round dense icon="image" size=".9rem" />
                    <q-btn flat round dense icon="image" size=".9rem" />
                    <q-btn flat round dense icon="image" size=".9rem" />
                </div>
            </q-item-section>
            <q-btn round dense icon="send" size=".5rem" color="primary" padding=".6rem" @click="sendComment(user)" />
        </q-item>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { BaseWebApiUrl } from 'src/api.common/BaseWebApiUrl';
import { HttpMethod } from 'src/api.common/HttpMethod';
const isDirectlyComment = ref(true);
const props = defineProps({
    artworkId: {
        type: String,
        required: true,
        default: "2336253634727936",
    },
    chapterId: {
        type: String,
        required: false,
        default: "0",
    }
})
const apiUrl = `${BaseWebApiUrl}/g52/comment/create`;
const comment = ref('');

async function sendComment(user) {
    await axios({
        url: apiUrl,
        method: HttpMethod.POST,
        data: {
            artworkId: props.artworkId,
            chapterId: props.chapterId,
            isDirectlyComment: isDirectlyComment.value,
            commentContent: comment.value,
            userId: 123
        },
    })
        .then((response) => {
            comment.value = '';
            console.log(response);
        });
    console.log(123);
}

</script>
<style scoped>
.input-container {
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border: 1px solid #120e36;
    border-radius: 7px;
    margin: 1%;
}
</style>