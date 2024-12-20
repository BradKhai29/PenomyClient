<template>
    <div class="q-pa-md row justify-center fixed-height">
        <div style="width: 100%">
            <ChatMessage
                v-for="userMessage in userChatMessages"
                :key="userMessage"
                :message="userMessage"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from "vue";
import ChatMessage from "./ChatMessage.vue";
import GroupChatApiHandler from "src/api.handlers/chat/GroupChatApiHandler";
import { useRoute } from "vue-router";

const props = defineProps({
    messageSent: Number,
});

const userChatMessages = ref([]);

const currentPage = ref(1);
const maxChatMessage = ref(20);
const isLoading = ref(false);

const route = useRoute();

onMounted(async () => {
    if (route.params.groupChatId != undefined) {
        getGroupChatMessageAsync(route.params.groupChatId);
    }
});

watch(
    () => route.params.groupChatId,
    async () => {
        if (route.params.groupChatId != undefined) {
            getGroupChatMessageAsync(route.params.groupChatId);
        }
    }
);

watch(
    () => props.messageSent,
    async () => {
        if (route.params.groupChatId != undefined) {
            getGroupChatMessageAsync(route.params.groupChatId);
        }
    }
);

async function getGroupChatMessageAsync() {
    // Turn on loading flag when load the chat messages from api.
    isLoading.value = true;
    try {
        const apiResponse =
            await GroupChatApiHandler.GetGroupChatMesssagesAsync(
                route.params.groupChatId,
                currentPage.value,
                maxChatMessage.value
            );

        // Clear the display chapter list before populate again.
        userChatMessages.value = apiResponse.responseBody.userChats;
    } catch (error) {
        console.log(error);
    }

    // Turn off isLoading flag to display the content.
    isLoading.value = false;
}
</script>

<style scoped>
.fixed-height {
    /* height: 80%; */
    overflow: auto;
}
</style>
