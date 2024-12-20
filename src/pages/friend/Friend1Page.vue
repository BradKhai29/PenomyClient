<template>
    <div class="row justify-center q-pa-md">
        <div class="text-bold text-subtitle1 q-pa-md container">
            Bạn bè
            <FriendCard v-for="friend in allfriends" :key="friend.userId" :friend-info="friend" class="q-pa-md q-mt-md"
                @send-friend-request="onSendFriendRequest" @cancel-friend-request="onSendFriendRequest"
                @updateFriendInfo="onFriendRequestUpdated" @Unfriend="onFriendRequestUpdated" />
        </div>
        <div class="text-bold text-subtitle1 q-pa-md container">
            Mọi người
            <FriendCard v-for="friend in people" :key="friend.userId" :friend-info="friend" class="q-pa-md q-mt-md"
                @send-friend-request="onSendFriendRequest" @cancel-friend-request="onSendFriendRequest"
                @updateFriendInfo="onFriendRequestUpdated" @Unfriend="onFriendRequestUpdated" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NotificationHelper } from 'src/helpers/NotificationHelper';
import FriendCard from 'src/components/common/socialMedia/Common/FriendCard.vue';
import FriendApiHandler from 'src/api.handlers/social/social4Page/FriendApiHandler';

const getFriendsApi = FriendApiHandler.GetFriendsAsync;

const people = ref([]);
const allfriends = ref([]);

onMounted(async () => {
    await fetchUserInfo();
});

async function fetchUserInfo() {
    try {

        const res = (await getFriendsApi()).responseBody;
        people.value = res.users.filter(user => user.isFriend == false);
        allfriends.value = res.friendLists;
        console.log(res.friendLists);
    } catch (error) {
        console.error('Error fetching friends:', error);
        NotificationHelper.notifyError("Có gì đó không ổn...");
    }
}

function onSendFriendRequest(userId) {
    people.value.find(friend => friend.userId == userId).hasSentByMeFriendRequest = !people.value.find(friend => friend.userId == userId).hasSentByMeFriendRequest
}
async function onFriendRequestUpdated() {
    await fetchUserInfo()
}

</script>

<style scoped>
.container {
    width: 60%;
}
</style>
