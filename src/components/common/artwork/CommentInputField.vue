<template>
    <div class="input-container">
        <q-input autogrow class="q-pa-md" v-model="comment" borderless="" dense="dense" label="comment"/>
        <q-item tag="div">
            <q-item-section>
                <div>
                    <q-btn flat round dense icon="image" size=".9rem" />
                    <q-btn flat round dense icon="image" size=".9rem" />
                    <q-btn flat round dense icon="image" size=".9rem" />
                </div>
            </q-item-section>

            <q-btn round dense icon="send" size=".5rem" color="primary" padding="sm"/>
        </q-item>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { BaseWebApiUrl } from 'src/api.common/BaseWebApiUrl';
import { HttpMethod } from 'src/api.common/HttpMethod';
const props = defineProps({
    artworkId: {
        type: Number,
        required: false
    }
})
const apiUrl = `${BaseWebApiUrl}/g52/ArtworkComment/create`;
const comment = ref('');

// async function sendComment(user) {
//     await axios({
//         url: apiUrl,
//         method: HttpMethod.POST,
//         data: {
//             comment: artworkComment.value

//         },
//     })
//         .then((response) => {
//             comments.value = response.data.body;
//         });
// }

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