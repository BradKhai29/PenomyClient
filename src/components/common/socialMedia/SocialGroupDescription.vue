<template>
    <div class="group-header">
        <q-img :src="groupInfo.coverPhotoUrl" width="100%" height="29rem" style="border-radius: 0 0 5px 5px"/>
        <div class="q-pa-md">
            <p v-if="groupInfo.groupName != ''" class="text-bold text-h4">{{
                groupInfo.name }}
            </p>
            <span v-if="groupInfo.isPublic">
                <q-icon name="public" size="1rem" />
                Nhóm công khai . </span>
            <span v-if="!groupInfo.isPublic">
                <q-icon name="lock" size="1rem" />
                Nhóm riêng tư . </span>
            <span class="preview-content-1 text-weight-bold">{{ groupInfo.totalMembers }} thành viên</span>
            <q-separator class="q-mt-lg" />
            <q-btn v-for="button in tabButtons" :key="button" class="q-mt-md q-mr-md preview-content-1 text-weight-bold"
                flat disable no-caps :label="button" />
        </div>
        <div class="preview-bg">
            <div class="q-pa-lg row q-gutter-md">
                <div class="col-7 q-pq-md">
                    <q-item tag="div" class=" preview-post-bg" style="padding-left: 0px;">
                        <q-avatar icon="account_circle" size="4.5rem" />
                        <q-item-section><q-input disable dense rounded outlined v-model="emptyProps" bg-color="grey-4"
                                label="Bạn đang nghĩ gì?" /></q-item-section>
                    </q-item>
                </div>
                <div class="col" style="background-color: white; border-radius: 5px;">
                    <p style="margin: 0;" class="text-subtitle1 q-pl-md q-pt-md">Giới thiệu</p>
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
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import GetGroupDescriptionApiHandler from 'src/api.handlers/social/social3Page/GetGroupDescriptionApiHandler';
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { useRoute } from "vue-router";

const getGroupApi = GetGroupDescriptionApiHandler.GetGroupDescription;
const route = useRoute();

const props = defineProps({
    groupId: {
        type: String,
        required: true
    }
})

const emptyProps = ref('');
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
    console.log(groupInfo.value);
}
</script>

<style scoped>
.text-small {
    font-size: 0.75rem;
}

.group-header {
    background-color: white;
    padding: 0 12rem;
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
    /* border-radius: 5px; */
}

.preview-content-1 {
    color: rgb(121, 118, 118);
}

.preview-post-bg {
    background-color: rgb(249, 249, 249);
    border-radius: 5px;
}

.preview-bg {
    background-color: rgb(242, 244, 247);
}
</style>