<template>
    <q-page v-if="!isLoading">
        <GuestProfileCard />

        <section id="preference-section" class="q-mt-md">
            <div
                v-if="showSignInAlert"
                class="q-mx-lg q-px-md q-py-sm shadow-1 border-radius-sm text-subtitle1 bg-light-100 flex items-center"
            >
                <span>
                    Nếu bạn chưa
                    <router-link
                        to="/auth/login"
                        class="text-decoration-none text-weight-bold text-dark"
                        >đăng nhập</router-link
                    >
                    và không truy cập sau
                    <strong class="text-primary">14 ngày</strong>, hệ thống sẽ
                    tự động <strong>xóa lịch sử xem</strong> của bạn
                </span>
                <q-btn
                    dense
                    round
                    class="q-ml-auto bg-dark"
                    @click="showSignInAlert = false"
                >
                    <q-icon name="close" class="text-primary" />
                </q-btn>
            </div>

            <GuestHistorySection v-if="!isLoading" :guestId="guestId" />
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { useGuestStore } from "src/stores/common/GuestStore";

// Import components section.
import GuestProfileCard from "src/components/pages/guest/GuestProfileCard.vue";
import GuestHistorySection from "src/components/pages/guest/GuestHistorySection.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();
const guestStore = useGuestStore();

export default {
    name: "GuestViewHistoryPage",
    components: {
        GuestProfileCard,
        GuestHistorySection,
    },
    data() {
        return {
            showSignInAlert: true,
            isLoading: true,
        };
    },
    computed: {
        guestId() {
            return guestStore.currentGuestId;
        },
    },
    beforeMount() {
        if (authStore.isAuth) {
            // Redirect user to user profile page instead of guest page.
            this.$router.push(`/user/${userProfileStore.currentUserId}`);
        }
    },
    async mounted() {
        await guestStore.waitForSetUp();

        this.isLoading = false;
    },
};
</script>
