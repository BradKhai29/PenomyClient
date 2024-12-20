<template>
    <q-item tag="div">
        <span class="text-weight-bold text-h5">Đoạn chat</span>
        <q-item-section>
        </q-item-section>
        <q-btn icon="edit_square" dense rounded unelevated color="grey-3" text-color="black" padding="sm" size="sm">
            <q-tooltip>Soạn tin</q-tooltip>
        </q-btn>
    </q-item>
    <q-input rounded outlined bg-color="grey-4" dense v-model="searchString" label="Tìm kiếm" class="q-pa-md">
        <template v-slot:prepend>
            <q-icon name="search" />
        </template>
    </q-input>
    <div v-if="isLoading">
        <q-item v-for="group in groupList" :key="group.id" tag="div" :to="'/chat/' + group.id" clickable
            class="items-center rounded-borders q-gutter-md q-mr-lg q-ml-xs chat-card">
            <q-avatar size="3.5em" class="shadow-1">
                <q-img :src="group.coverPhotoUrl" width="100%" height="100%" />
            </q-avatar>

            <q-item-section>
                <q-item-label class="text-weight-bold text-subtitle1 group-name">{{ group.groupName }}</q-item-label>
                <q-item-label class="text-subtitle2 lastest-message">{{ group.groupName }}</q-item-label>
                <q-tooltip>{{ group.groupName }}</q-tooltip>
            </q-item-section>
        </q-item>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuthStore } from 'src/stores/common/AuthStore';
import { useUserProfileStore } from 'src/stores/common/UserProfileStore';
import GroupChatApiHandler from 'src/api.handlers/chat/GroupChatApiHandler';
const searchString = ref("");

const getGroupChatsAsync = GroupChatApiHandler.GetGroupChatsAsync;

const groupList = ref([]);
const profileStore = useUserProfileStore();
const authStore = useAuthStore();

const isLoading = ref(false);

onMounted(async () => {
    await authStore.setUp();

    try {
        groupList.value = (await getGroupChatsAsync()).responseBody.groups;
        groupList.value.forEach(group => {
            group.groupName = group.members.find(member => member.memberId != profileStore.userProfile.userId).memberName;
            group.coverPhotoUrl = group.members.find(member => member.memberId != profileStore.userProfile.userId).avatarUrl;
        });
    }
    catch {
        console.log("Error");
    }
    isLoading.value = true;
})

watch(
    () => searchString.value,
    () => {
        searchFriend();
    }
)
function searchFriend() {
    console.log(searchString.value);
}

</script>

<style scoped>
.left-side {
    border: 1px solid #cacaca;
    overflow: auto;
}

.chat-card {
    padding: 8px 0 0 8px;

}

.group-name,
.lastest-message {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>