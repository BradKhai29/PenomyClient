<template>
    <q-page style="background-color: rgb(249, 249, 249);">

        <!-- Description section -->
        <div v-if="route.path.indexOf('manage') == -1">
            <SocialGroupDescription :groupInfo="groupInfo" @updateCoverImage="updateGroupCoverImage" />
        </div>

        <!-- Edit section -->
        <div v-if="route.path.indexOf('manage') != -1" class="q-pt-md">
            <EditGroup :groupInfo="groupInfo" />
            <join-request :groupInfo="groupInfo" @approve-request="getGroupDescription" />
            <GroupMemberSection :is-group-manager="groupInfo.isManager" :group-member-count="groupInfo.totalMembers"
                @remove-member="getGroupDescription" />
        </div>

    </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import SocialGroupDescription from 'src/components/common/socialMedia/SocialGroupDescription.vue';
import GetGroupDescriptionApiHandler from 'src/api.handlers/social/social3Page/GetGroupDescriptionApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import EditGroup from 'src/components/common/socialMedia/EditGroup.vue';
import JoinRequest from 'src/components/common/socialMedia/JoinRequest.vue';
import GroupMemberSection from 'src/components/common/socialMedia/GroupMemberSection.vue';
import { useRoute } from "vue-router";

const getGroupApi = GetGroupDescriptionApiHandler.GetGroupDescription;
const route = useRoute();

// object variables
const groupInfo = ref({
    Object
});
const newGroupInfo = ref({
    id: route.params.id,
    name: "",
    description: "",
    postMode: {
        label: "Tự do",
        value: false
    },
})

onMounted(() => {
    getGroupDescription();
})

watch(
    () => route.path,
    () => {
        resetValue();
        getGroupDescription();
    }
);

function updateGroupCoverImage() {
    groupInfo.value = newGroupInfo;
}

async function getGroupDescription() {
    // Get group description.
    const result = await getGroupApi(
        route.params.id
    );

    if (result.isSuccess) {
        groupInfo.value = result.responseBody;
        groupInfo.value.id = route.params.id
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra khi tạo"
        );
    }
    resetValue();
}

function resetValue() {
    newGroupInfo.value = {
        id: route.params.id,
        name: groupInfo.value.name,
        description: groupInfo.value.description,
        postMode: {
            label: groupInfo.value.requireApprovedWhenPost ? "Yêu cầu phê duyệt" : "Tự do",
            value: groupInfo.value.requireApprovedWhenPost
        }
    }
}
</script>

<style scoped>
.text-small {
    font-size: 0.75rem;
}

.edit-section {
    margin: 1rem 18rem 0 18rem;
    background-color: white;
    border: 1px solid rgba(180, 180, 180, 0.599);
    border-radius: 8px;
}

.group-link {
    --primary: #53bf94;
    --primary-700: #e5f3ef;
    --light: #f9fafc;
    --light-500: #dddddd;
    --dark: #120e36;

    color: var(--dark);
    border-radius: 4px;
    background-color: white;
    margin-top: 2rem;
}

.group-name {
    font-size: 1rem;
}
</style>