<template>
    <div class="row card items-center q-mb-md">
        <div class="col-2">
            <q-avatar size="5rem">
                <q-img src="https://cdn.quasar.dev/img/avatar.png" width="5rem" height="5rem" />
            </q-avatar>
        </div>
        <div class="col">
            <q-item tag="div">
                <q-item-section class="cursor-pointer">
                    <div>{{ friendInfo.nickName }}</div>
                    <div>{{ friendInfo.aboutMe }}</div>
                    <div>ten user</div>
                </q-item-section>
                <div class="row items-center q-gutter-sm">
                    <q-btn no-caps v-if="!friendInfo.hasSentFriendRequest" icon="person_add" label="Thêm bạn" size="1rem" color="primary" text-color="white"
                        @click="AddFriend" />
                    <q-btn no-caps v-if="friendInfo.hasSentFriendRequest" icon="remove" label="Hủy yêu cầu" size="1rem" color="grey-5" text-color="white"
                        @click="RemoveFriend" />
                    <q-btn no-caps v-if="friendInfo.isFriend" icon="remove" label="Hủy bạn" size="1rem" color="primary" text-color="white"
                        @click="RemoveFriend" />
                </div>
            </q-item>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import FriendApiHandler from 'src/api.handlers/social/social4Page/FriendApiHandler';
import { NotificationHelper } from 'src/helpers/NotificationHelper';

const props = defineProps({
    friendInfo: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['sendFriendRequest', 'cancelFriendRequest']);
const addFriendApi = FriendApiHandler.AddFriendAsync;
const removeFriendApi = FriendApiHandler.RemoveFriendAsync;

async function AddFriend() {
    try {
        const response = await addFriendApi(props.friendInfo.userId);
        if (response.isSuccess) {
            NotificationHelper.notifySuccess("Đã kết bạn!");
            emit('sendFriendRequest', props.friendInfo.userId);
        }
    } catch (error) {
        NotificationHelper.notifyError("Có gì đó không ổn...")
    }
}

async function RemoveFriend() {
    try {
        const res = await removeFriendApi(props.friendInfo.userId);
        if (res.isSuccess) {
            NotificationHelper.notifySuccess("Đã hủy kết bạn!");
            emit('cancelFriendRequest', props.friendInfo.userId);
        }
    }
    catch {
        NotificationHelper.notifyError("Có gì đó không ổn...");
    }
}

</script>

<style scoped>
.card {
    border: 1px solid #cacaca;
    border-radius: 6px;
}
</style>