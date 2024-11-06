<template>
    <section id="user_profile_card" class="row items-center q-pa-lg">
        <div id="user_avatar" class="q-mr-lg col-auto">
            <q-avatar class="user_avatar shadow-2">
                <img :src="avatarUrl" />
            </q-avatar>
        </div>
        <div id="user_detail_section" class="column justify-start col">
            <h5 class="text-weight-bold flex items-center q-ma-none text-dark">
                <span>{{ nickname }}</span>
                <span>
                    <q-btn icon="info" round dense flat />
                    <q-tooltip
                        anchor="center right"
                        self="center left"
                        :offset="[4, 10]"
                    >
                        <strong class="text-subtitle2"> Xem chi tiết </strong>
                    </q-tooltip>
                </span>
            </h5>
            <div class="flex text-dark-500 text-subtitle1 q-mt-sm">
                <q-icon name="person_add" size="sm" />
                <span class="q-ml-xs"
                    >Đã theo dõi: <strong>{{ totalFollowedCreators }}</strong>
                </span>
            </div>
            <div class="text-dark text-subtitle1 q-mt-sm">
                {{ aboutMe ?? "Mô tả: Không có" }}
            </div>
            <div class="flex items-center q-mt-sm">
                <q-btn
                    dense
                    no-caps
                    class="bg-light-300 text-dark border-radius-sm shadow-1 q-px-sm"
                >
                    <q-icon name="edit" />
                    <span class="q-ml-xs text-subtitle1">Sửa thông tin</span>
                </q-btn>
                <q-btn
                    dense
                    no-caps
                    class="q-ml-sm bg-dark text-light border-radius-sm shadow-1 q-px-sm"
                >
                    <q-icon name="palette" />
                    <span class="q-ml-xs text-subtitle1"
                        >Trở thành nhà sáng tạo</span
                    >
                </q-btn>
            </div>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from "src/stores/common/AuthStore";

// Init authStore for later operation.
const authStore = useAuthStore();

export default {
    data() {
        return {
            avatarUrl: null,
            nickname: null,
            aboutMe: null,
            isCreator: false,
            totalFollowedCreators: 0,
        };
    },
    async mounted() {
        this.avatarUrl = authStore.currentUserProfile.avatarUrl;
        this.nickname = authStore.currentUserProfile.nickname;
        this.isCreator = authStore.currentUserProfile.isCreator;

        if (authStore.isAuth) {
        }
    },
};
</script>

<style scoped>
.user_avatar {
    --width: 160px;
    --height: var(--width);

    width: var(--width) !important;
    height: var(--height) !important;
}
</style>
