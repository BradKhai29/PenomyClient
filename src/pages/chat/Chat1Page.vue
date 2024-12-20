<template>
    <q-page v-if="!isLoading">
        <div class="row" style="height: 94vh">
            <div class="col-3 left-side">
                <FriendList />
            </div>

            <div class="col right-side">
                <ChatField :messageSent="messageSent" />

                <div class="input-container">
                    <q-input
                        placeholder="Aa"
                        autofocus
                        autogrow
                        class="q-pa-md"
                        v-model="comment"
                        rounded
                        outlined
                        bg-color="grey-2"
                        dense="dense"
                    >
                        <template v-slot:append>
                            <q-btn
                                flat
                                round
                                dense
                                icon="emoji_emotions"
                                size="1rem"
                            >
                                <q-menu>
                                    <emoji-picker-board
                                        @onIconSelected="onEmojiSelected"
                                    />
                                </q-menu>
                            </q-btn>
                        </template>
                        <template v-slot:after>
                            <div class="after-container">
                                <q-btn
                                    round
                                    dense
                                    icon="send"
                                    size=".5rem"
                                    color="primary"
                                    @click="sendMessage"
                                    padding=".6rem"
                                ></q-btn>
                                <!-- Your template here -->
                                <template>
                                    <!-- Template content -->
                                </template>
                            </div>
                        </template>
                    </q-input>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import FriendList from "src/components/pages/chat/chat1Page/FriendList.vue";
import ChatField from "src/components/pages/chat/chat1Page/ChatField.vue";
import EmojiPickerBoard from "src/components/common/artwork/Common/EmojiPickerBoard.vue";
import GetGroupsApiHandler from "src/api.handlers/chat/ChatApiHandler";
import { useRoute } from "vue-router";
import {
    ChatHubApiHandler,
    clientMethods,
} from "src/api.handlers/chat/ChatHubApiHandler";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";

import { ReceivedMessageResponseDto } from "src/api.handlers/chat/models/ReceivedMessageResponseDto.js";
const userProfileStore = useUserProfileStore();

const route = useRoute();
const comment = ref("");
const messageSent = ref(1);
const isLoading = ref(true);
const sendMessageApi = GetGroupsApiHandler.SendMessageAsync;

function onEmojiSelected(emoji) {
    comment.value += emoji;
}

onMounted(async () => {
    await userProfileStore.setUp();
    await ChatHubApiHandler.connectChatHubAsync();

    ChatHubApiHandler.addConnectionHandleMethods(
        clientMethods.receiveMessage,
        displayMessage
    );

    isLoading.value = false;
});

async function sendMessage() {
    if (comment.value.match(/^\s*$/) == null) {
        comment.value = comment.value.trim();
        const groupId = route.params.groupChatId;

        try {
            // const res = await sendMessageApi(route.params.groupChatId, comment.value);

            const result = await ChatHubApiHandler.sendMessageAsync(
                groupId,
                userProfileStore.currentUserId,
                comment.value
            );

            if (result) {
                comment.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * @param {ReceivedMessageResponseDto} messageDetail Detail of message.
 */
async function displayMessage(messageDetail) {
    messageSent.value++;
}
</script>

<style scoped>
.left-side,
.right-side {
    border: 1px solid #cacaca;
    overflow: auto;
    height: 100%;
}

.right-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.input-container {
    background-color: rgba(196, 196, 196, 0.255);
}

.after-container {
    position: relative;
    height: 100%;
}

.after-container > *:last-child {
    position: absolute;
    bottom: 0;
}
</style>
