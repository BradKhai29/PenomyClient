<template>
    <div class="row card items-center q-mb-md">
        <div class="col-2">
            <q-avatar size="5rem">
                <q-img :src="friendInfo.avatarUrl" alt="" width="5rem" height="5rem" />
            </q-avatar>
        </div>
        <div class="col">
            <q-item tag="div">
                <q-item-section class="cursor-pointer">
                    <div>{{ localFriendInfo.nickName }}</div>
                    <div>{{ localFriendInfo.aboutMe }}</div>
                </q-item-section>
                <div class="row items-center q-gutter-sm">
                    <q-btn no-caps
                        v-if="!friendInfo.isFriend && !friendInfo.hasSentByMeFriendRequest && !friendInfo.hasSentToMeFriendRequest"
                        icon="person_add" label="Thêm bạn" size="1rem" color="primary" text-color="white"
                        @click="AddFriend" />

                    <q-btn no-caps v-if="friendInfo.hasSentByMeFriendRequest" icon="remove" label="Hủy yêu cầu"
                        size="1rem" color="grey-5" text-color="white" @click="RemoveFriend" />

                    <q-btn no-caps v-if="friendInfo.hasSentToMeFriendRequest" label="Chấp nhận yêu cầu" size="1rem"
                        color="primary" text-color="white" @click="AcceptFriendRequest" />

                    <q-btn no-caps v-if="friendInfo.isFriend" icon="message" label="Nhắn tin" size="1rem"
                        color="primary" text-color="white" :to="'/chat/' + friendInfo.chatGroupId" />

                    <q-btn no-caps v-if="friendInfo.isFriend" icon="remove" label="Hủy bạn" size="1rem" color="red"
                        text-color="white" @click="RemoveFromFriend" />
                </div>
            </q-item>
        </div>
    </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits, watch } from 'vue';
import FriendApiHandler from 'src/api.handlers/social/social4Page/FriendApiHandler';
import { NotificationHelper } from 'src/helpers/NotificationHelper';

const props = defineProps({
    friendInfo: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['updateFriendInfo', 'sendFriendRequest', 'cancelFriendRequest']);

// Create a local reactive copy of friendInfo
const localFriendInfo = reactive({ ...props.friendInfo });

watch(
    () => props.friendInfo,
    (newVal) => {
        Object.assign(localFriendInfo, newVal); // Sync local state when prop changes
    }
);

const addFriendApi = FriendApiHandler.AddFriendAsync;
const removeFriendApi = FriendApiHandler.RemoveFriendAsync;
const unsendRequest = FriendApiHandler.UnsendFriendAsync;
const acceptRequest = FriendApiHandler.AcceptFriendAsync;

async function AddFriend() {
    try {
        const response = await addFriendApi(localFriendInfo.userId);
        if (response.isSuccess) {
            NotificationHelper.notifySuccess("Đã gửi yêu cầu kết bạn!");
            emit('sendFriendRequest', localFriendInfo.userId);
            localFriendInfo.hasSentByMeFriendRequest = true;
        }
    } catch (error) {
        NotificationHelper.notifyError("Không thể gửi yêu cầu kết bạn, vui lòng thử lại.");
    }
}

async function RemoveFriend() {
    try {
        const response = await unsendRequest(localFriendInfo.userId);
        if (response.isSuccess) {
            NotificationHelper.notifySuccess("Đã hủy yêu cầu hoặc hủy kết bạn!");
            emit('cancelFriendRequest', localFriendInfo.userId);

            if (localFriendInfo.hasSentByMeFriendRequest) {
                localFriendInfo.hasSentByMeFriendRequest = false;
            } else if (localFriendInfo.hasSentToMeFriendRequest) {
                localFriendInfo.hasSentToMeFriendRequest = false;
            } else if (localFriendInfo.isFriend) {
                localFriendInfo.isFriend = false;
            }
        }
    } catch (error) {
        NotificationHelper.notifyError("Không thể hủy yêu cầu hoặc kết bạn, vui lòng thử lại.");
    }
}
async function RemoveFromFriend() {
    try {
        const response = await removeFriendApi(localFriendInfo.userId);
        if (response.isSuccess) {
            NotificationHelper.notifySuccess("Đã hủy yêu cầu hoặc hủy kết bạn!");
            emit('Unfriend', localFriendInfo.userId);

            if (localFriendInfo.hasSentByMeFriendRequest) {
                localFriendInfo.hasSentByMeFriendRequest = false;
            } else if (localFriendInfo.hasSentToMeFriendRequest) {
                localFriendInfo.hasSentToMeFriendRequest = false;
            } else if (localFriendInfo.isFriend) {
                localFriendInfo.isFriend = false;
            }
        }
    } catch (error) {
        NotificationHelper.notifyError("Không thể hủy yêu cầu hoặc kết bạn, vui lòng thử lại.");
    }
}

async function AcceptFriendRequest() {
    try {
        const response = await acceptRequest(localFriendInfo.userId);
        if (response.isSuccess) {
            NotificationHelper.notifySuccess("Kết bạn thành công!");
            localFriendInfo.hasSentToMeFriendRequest = false;
            localFriendInfo.isFriend = true;

            emit('updateFriendInfo');
        }
    } catch (error) {
        NotificationHelper.notifyError("Không thể chấp nhận yêu cầu, vui lòng thử lại.");
    }
}
</script>

<style scoped>
.card {
    border: 1px solid #cacaca;
    border-radius: 6px;
}
</style>
