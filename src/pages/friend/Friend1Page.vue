<template>
    <div class="row justify-center q-pa-md">
        <div class="text-bold text-subtitle1 q-pa-md container">
            Mọi người
            <FriendCard v-for="friend in friends" :key="friend.userId" :friend-info="friend" class="q-pa-md q-mt-md"
                @send-friend-request="onSendFriendRequest" @cancel-friend-request="onSendFriendRequest" />
        </div>
        <div class="text-bold text-subtitle1 q-pa-md container">
            Bạn bè
            <FriendCard v-for="friend in alrfriends" :key="friend.userId" :friend-info="friend"
                class="q-pa-md q-mt-md" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NotificationHelper } from 'src/helpers/NotificationHelper';
import FriendCard from 'src/components/common/socialMedia/Common/FriendCard.vue';
import FriendApiHandler from 'src/api.handlers/social/social4Page/FriendApiHandler';

const getFriendsApi = FriendApiHandler.GetFriendsAsync;

const friends = ref([]);
const alrfriends = ref([]);

onMounted(async () => {
    try {
        friends.value = (await getFriendsApi()).responseBody.users;
        alrfriends.value = (await getFriendsApi()).responseBody.friendlists;
    } catch (error) {
        console.error('Error fetching friends:', error);
        NotificationHelper.notifyError("Có gì đó không ổn...");
    }
});

function onSendFriendRequest(userId) {
    friends.value.find(friend => friend.userId == userId).hasSentFriendRequest = !friends.value.find(friend => friend.userId == userId).hasSentFriendRequest
}

</script>

<style scoped>
.container {
    width: 60%;
}
</style>
