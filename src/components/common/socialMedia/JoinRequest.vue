<template>
    <div class="edit-section q-pa-sm">
        <q-expansion-item>
            <template v-slot:header>
                <q-item-section style="margin-left: -13px !important;">
                    <p class="text-h6 text-bold q-ml-sm">Yêu cầu tham gia</p>
                </q-item-section>
            </template>

            <q-card v-if="requests.length > 0">
                <q-item v-for="request in requests" :key="request.userId" tag="div" class="q-mb-sm">
                    <q-item-section avatar>
                        <q-avatar>
                            <img :src="request.userAvatar" />
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <div class="q-pl-md">
                            <div class="text-bold group-name">
                                {{ request.userName }}
                            </div>
                            <span>
                                Ngày tạo: {{ request.createdAt }}
                            </span>
                        </div>
                    </q-item-section>
                    <q-item-section side>
                        <div v-if="!request.isRunApi">
                            <q-btn title="Từ chối" class="text-bold q-mr-sm" size="sm" color="red" no-caps icon="close"
                                @click="rejectJoinRequestAsync(request.userId)">
                                <q-tooltip>Từ chối</q-tooltip>
                            </q-btn>
                            <q-btn title="Phê duyệt" class="text-bold" size="sm" color="primary" no-caps icon="done"
                                @click="acceptJoinRequestAsync(request.userId)">
                                <q-tooltip>Phê duyệt</q-tooltip>
                            </q-btn>
                        </div>
                        <q-inner-loading :showing="request.isRunApi" />
                    </q-item-section>
                </q-item>
            </q-card>

            <q-card v-else>
                <q-item>
                    <q-item-section>
                        <div class="text-center">Không có yêu cầu tham gia</div>
                    </q-item-section>
                </q-item>
            </q-card>
        </q-expansion-item>

    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { useRoute } from "vue-router";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import JoinRequestApiHandler from 'src/api.handlers/social/social3Page/JoinRequestApiHandler';

// import
const route = useRoute();

// define apis
const getJoinRequestApi = JoinRequestApiHandler.GetJoinRequestAsync;
const acceptRequestApi = JoinRequestApiHandler.AcceptJoinRequestAsync;
const rejectRequestApi = JoinRequestApiHandler.RejectJoinRequestAsync;

const requests = ref([]);

const emit = defineEmits(['approveRequest'])
// Boolean variables


onMounted(() => {
    getJoinRequestAsync();
})

// funtions
async function getJoinRequestAsync() {
    const result = await getJoinRequestApi(
        route.params.id
    );

    if (result.isSuccess) {
        requests.value = result.responseBody.requestList
        for (let i = 0; i < requests.value.length; i++) {
            requests.value[i].isRunApi = false
        }
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra khi tạo"
        );
    }
}

async function acceptJoinRequestAsync(memberId) {
    requests.value.find(request => request.userId == memberId).isRunApi = true
    const result = await acceptRequestApi(
        route.params.id,
        memberId
    );

    if (result.isSuccess) {
        // requests.value = result.responseBody.isSuccess
        NotificationHelper.notifySuccess(
            result.message ?? "Chào mừng thành viên mới"
        );
        requests.value = requests.value.filter(request => request.userId != memberId)
        emit('approveRequest')
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra"
        );
    }
}

async function rejectJoinRequestAsync(memberId) {
    requests.value.find(request => request.userId == memberId).isRunApi = true
    const result = await rejectRequestApi(
        route.params.id,
        memberId
    );

    if (result.responseBody.isSuccess) {
        // requests.value = result.responseBody.isSuccess
        NotificationHelper.notifySuccess(
            result.message ?? "Thao tác thành công"
        );
        requests.value = requests.value.filter(request => request.userId != memberId)
    } else {
        NotificationHelper.notifyError(
            result.message ?? "Có lỗi xảy ra"
        );
    }
}
</script>

<style scoped>
.edit-section {
    margin: 1rem 18rem 0 18rem;
    background-color: white;
    border: 1px solid rgba(180, 180, 180, 0.599);
    border-radius: 8px;
}
</style>