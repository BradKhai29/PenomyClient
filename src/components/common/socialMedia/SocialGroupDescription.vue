<template>
    <div class="group-header">
        <div>
            <q-img :src="groupInfo.coverPhotoUrl" width="100%" height="29rem" style="border-radius: 0 0 5px 5px">
                <div v-if="groupInfo.isManager" class="absolute-bottom-right text-subtitle2 q-mb-lg q-mr-md" style="padding: 0;">
                    <q-btn @click="console.log(123123)" color="grey" icon="edit" label="Chỉnh sửa" />
                </div>
            </q-img>
        </div>
        <div class="q-pa-md">
            <p v-if="groupInfo.groupName != ''" class="text-bold text-h4">{{
                groupInfo.name }}
            </p>
            <div class="row justify-between items-center">
                <div>
                    <span v-if="groupInfo.isPublic">
                        <q-icon name="public" size="1rem" />
                        Nhóm công khai . </span>
                    <span v-if="!groupInfo.isPublic">
                        <q-icon name="lock" size="1rem" />
                        Nhóm riêng tư . </span>
                    <span class="preview-content-1 text-weight-bold">{{ groupInfo.totalMembers }} thành viên</span>
                </div>

                <!-- Group Button -->
                <div class="row q-gutter-md">
                    <q-btn v-if="!groupInfo.hasJoin" color="primary">Tham gia</q-btn>
                    <q-btn v-if="!groupInfo.isManager && groupInfo.hasJoin" icon="how_to_reg"
                        icon-right="keyboard_arrow_down" color="primary" label="Đã tham gia" />
                    <q-btn v-if="groupInfo.isManager" color="primary" icon="add" label="Mời" />
                    <q-btn color="grey-4" text-color="black" icon="keyboard_arrow_down" />
                </div>
            </div>

            <q-separator class="q-mt-lg" />

            <q-btn v-for="button in tabButtons" :key="button" class="q-mt-md q-mr-md preview-content-1 text-weight-bold"
                flat no-caps :label="button" />
        </div>
    </div>

    <div class="group-body">
        <div class="q-pa-lg row q-gutter-md justify-center"
            :class="groupInfo.isPublic || groupInfo.hasJoin ? 'group-body-padding' : ''">

            <!-- Post -->
            <div v-if="groupInfo.isPublic || groupInfo.hasJoin" class="col-7 q-pq-md">
                <q-item tag="div" class="post-bg" style="">
                    <div style="height: 6rem;" class="row items-center">
                        <q-avatar size="2.5rem" class="q-mr-md row items-center">
                            <img :src="userProfileStore.userProfile.avatarUrl" />
                        </q-avatar>
                    </div>
                    <q-item-section>
                        <q-input dense rounded outlined v-model="postContent" bg-color="grey-3"
                            label="Bạn đang nghĩ gì?" />
                    </q-item-section>
                </q-item>
            </div>

            <!-- Description -->
            <div class="col-4" style="background-color: white; border-radius: 5px;">
                <p style="margin: 0;" class="text-subtitle1 q-pl-md q-pt-md">Giới thiệu</p>
                <q-item v-if="groupInfo.description != ''" tag="div">
                    {{ groupInfo.description }}
                </q-item>
                <q-item style="padding-top: 0;" tag="div">
                    <q-icon class="q-mr-sm" :name="groupInfo.isPublic ? 'public' : 'lock'" size="1.5rem" />
                    <q-item-section>
                        <p class="text-bold" style="margin: 0;">
                            {{ groupInfo.isPublic ? 'Công khai' : 'Riêng tư' }}</p>

                        <span v-if="!groupInfo.isPublic">Chỉ thành viên
                            mới nhìn thấy mọi người trong nhóm và những gì họ đăng.</span>
                        <span v-if="groupInfo.isPublic">Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm
                            và những gì họ đăng.</span>
                    </q-item-section>
                </q-item>
                <q-item tag="div">
                    <q-icon class="q-mr-sm" name="visibility" size="1.5rem" />
                    <q-item-section>
                        <p class="text-bold" style="margin: 0;">Chế độ xem</p>
                        Ai cũng có thể tìm thấy nhóm này.
                    </q-item-section>
                </q-item>

                <q-item v-if="!groupInfo.isPublic && !groupInfo.hasJoin" tag="div">
                    <q-icon class="q-mr-sm" name="groups" size="1.5rem" />
                    <q-item-section>
                        <p class="text-bold" style="margin: 0;">Thành viên</p>
                        {{ groupInfo.totalMembers }} người
                    </q-item-section>
                </q-item>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import GetGroupDescriptionApiHandler from 'src/api.handlers/social/social3Page/GetGroupDescriptionApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { useUserProfileStore } from 'src/stores/common/UserProfileStore';
import { useRoute } from "vue-router";

const getGroupApi = GetGroupDescriptionApiHandler.GetGroupDescription;
const route = useRoute();
const userProfileStore = useUserProfileStore();

const props = defineProps({
    groupId: {
        type: String,
        required: true
    }
})

const postContent = ref('');
const groupInfo = ref({
    groupName: '',
    groupDescription: '',
    isPublic: '',
    postMode: {
        label: "Tự do",
        value: false
    },
    coverImage: null
});

const tabButtons = ref([
    "Giới thiệu", "Bài viết", "Thành viên", "Sự kiện"
])

onMounted(() => {
    getGroupDescription();
})

watch(
    () => route.path,
    () => {
        getGroupDescription();
    }
);
async function getGroupDescription() {
    // Get group description.
    const result = await getGroupApi(
        props.groupId
    );

    if (result.isSuccess) {
        groupInfo.value = result.responseBody;
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra khi tạo"
        );
    }
}
</script>

<style scoped>
.text-small {
    font-size: 0.75rem;
}

.group-header {
    background-color: white;
    padding: 0 12rem;
}

.preview-content-1 {
    color: rgb(121, 118, 118);
}

.post-bg {
    background-color: rgb(249, 249, 249);
    border-radius: 5px;
    height: 7rem;
}

.group-body {
    background-color: rgb(242, 244, 247);
    width: 100%;
}

.group-body-padding {
    padding: 0 12rem;
}
</style>