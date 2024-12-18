<template>
    <q-page>
        <div class="row" style="height: 94vh;">
            <div class="col-3 left-side ">
                <FriendList @friend-selected="selectFriend" />
            </div>

            <div class="col right-side">
                <ChatField />

                <div class="input-container">
                    <q-input placeholder="Aa" autogrow class="q-pa-md" v-model="comment" rounded outlined
                        bg-color="grey-2" dense="dense">
                        <template v-slot:append>
                            <q-btn flat round dense icon="emoji_emotions" size="1rem">
                                <q-menu>
                                    <emoji-picker-board @onIconSelected="onEmojiSelected" />
                                </q-menu>
                            </q-btn>
                        </template>
                        <template v-slot:after>
                            <div class="after-container">
                                <q-btn round dense icon="send" size=".5rem" color="primary" @click="sendMessage(user)"
                                    padding=".6rem"></q-btn>
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
import { ref } from 'vue';
import FriendList from 'src/components/pages/chat/chat1Page/FriendList.vue';
import ChatField from 'src/components/pages/chat/chat1Page/ChatField.vue';
import EmojiPickerBoard from 'src/components/common/artwork/Common/EmojiPickerBoard.vue';

const comment = ref('');
function selectFriend(friendId) {
    console.log(friendId);
}

function onEmojiSelected(emoji) {
    comment.value += emoji;
}

function sendMessage() {
    if (comment.value.match(/^\s*$/) == null) {
        comment.value = comment.value.trim();
    }
}
</script>

<style scoped>
.left-side,
.right-side {
    border: 1px solid #cacaca;
    overflow: auto;
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

.after-container>*:last-child {
    position: absolute;
    bottom: 0;
}
</style>