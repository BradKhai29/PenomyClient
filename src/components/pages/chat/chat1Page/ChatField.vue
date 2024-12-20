<template>
    <div class="q-pa-md row justify-center">
        <div style="width: 100%">
            <ChatMessage v-for="userMessages in userChatMessages" :key="userMessages.id" :message="userMessages" />
        </div>
        <q-btn @click="getGroupChatMessageAsync"></q-btn>
    </div>
</template>

<script>
import { ref, defineProps } from 'vue';
import ChatMessage from './ChatMessage.vue';
import GroupChatApiHandler from "src/api.handlers/chat/GroupChatApiHandler";
import { UserChatResponse } from 'src/api.models/chat/chat1Page/UserChatResponse';

const props = defineProps({
    messages: {
        type: Array,
        default: null
    },
    props: {
        groupId: {
            require: true
        }
    },
    data() {
        return {
            /**
             * The list contains the user's chat messages to be displayed.
             *
             * @type {UserChatResponse[]} The type of this array.
             */
            userChatMessages: [],
            currentPage: 1,
            maxChatMessage: 20
        }
    },
    methods: {
        async getGroupChatMessageAsync() {
            // Turn on loading flag when load the chat messages from api.
            this.isLoading = true;

            const apiResponse =
                await GroupChatApiHandler.GetGroupChatMesssagesAsync(
                    // this.groupId,
                    // this.currentPage,
                    // this.maxChatMessage
                );

            // Clear the display chapter list before populate again.
            const length = this.userChatMessages.length;

            this.userChatMessages.splice(0, length);
            this.userChatMessages.push(...apiResponse.responseBody);

            // Turn off isLoading flag to display the content.
            this.isLoading = false;

            console.log(this.apiResponse);
        }
    },
    components: {
        ChatMessage
    }
});
</script>
