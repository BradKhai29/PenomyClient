<template>
    <section id="guest_profile_card" class="row items-center q-py-lg q-px-xl">
        <div id="user_avatar" class="q-mr-lg col-auto q-my-sm">
            <q-avatar class="user_avatar shadow-2 relative-position">
                <img
                    src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg"
                />
            </q-avatar>
        </div>
        <div id="guest_detail_section" class="column justify-start col">
            <h5 class="text-weight-bold flex items-center q-ma-none text-dark">
                <span>Chưa đăng nhập</span>
            </h5>
            <div class="flex items-center text-dark-500 text-subtitle1 q-mt-sm">
                <q-btn id="last-active-at" dense no-caps flat padding="none">
                    <q-icon name="schedule" size="sm" />
                    <span class="q-ml-xs text-subtitle1">
                        <span class="q-mr-xs"> Truy cập lần cuối:</span>
                        <span>{{ lastActiveAt }}</span>
                    </span>
                </q-btn>
            </div>
            <div
                id="notify-login-section"
                class="flex text-dark text-subtitle1 q-mt-sm"
            >
                Đăng nhập vào hệ thống để lưu lại lịch sử xem của bạn
            </div>
            <section id="interaction-button-group" class="q-mt-md">
                <!-- Guest view display section -->
                <div class="flex items-center">
                    <!-- Go to login button -->
                    <q-btn
                        to="/auth/login"
                        id="login-button"
                        dense
                        no-caps
                        class="bg-light-300 text-dark border-radius-sm shadow-1 q-px-sm"
                    >
                        <q-icon name="login" />
                        <span class="q-ml-xs text-subtitle1"> Đăng nhập </span>
                    </q-btn>
                    <!-- Go to login button -->

                    <!-- Go to register button -->
                    <q-btn
                        to="/auth/register"
                        id="register-button"
                        dense
                        no-caps
                        class="q-ml-sm bg-dark text-light border-radius-sm shadow-1 q-px-sm"
                    >
                        <span class="text-subtitle1">Đến đăng ký</span>
                    </q-btn>
                    <!-- Go to register button -->
                </div>
                <!-- Guest view display section-->
            </section>
        </div>
    </section>
</template>

<script>
// Import dependencies section.
import { useGuestStore } from "src/stores/common/GuestStore";

// Init store for later operation.
const guestStore = useGuestStore();

export default {
    name: "GuestProfileCard",
    computed: {
        lastActiveAt() {
            return guestStore.normalizedLastActiveAt();
        },
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

.about-me-btn:hover {
    opacity: 0.8;
    cursor: pointer;
}

.extra-info-dialog {
    --min-width: 480px;

    min-width: var(--min-width) !important;
}
</style>
