<template>
    <UserComment v-for="comment in comments" :key="comment.id" :comment="comment" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import UserComment from "./UserComment.vue";
var comments = ref([]);
const apiUrl = `${BaseWebApiUrl}/g10/ArtworkComment/get`;

var props = defineProps({
    artworkId: {
        type: Number,
        required: true
    }
});
onMounted(async () => {
    await axios({
        url: apiUrl,
        method: HttpMethod.GET,
        params: {
            artworkId: props.artworkId
        },
    })
        .then((response) => {
            comments.value = response.data.body;
        });
})
</script>