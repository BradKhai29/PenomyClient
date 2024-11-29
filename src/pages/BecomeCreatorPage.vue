<template>
    <section v-if="!isLoading">
        <section id="header-section" class="flex justify-center">
            <div
                class="q-py-md flex items-center justify-between text-dark-500 become-creator-section border-md-bottom-light-500"
            >
                <q-btn :to="userProfileLink" dense flat padding="none">
                    <q-icon
                        name="chevron_right"
                        size="md"
                        style="transform: rotate(180deg)"
                    />
                </q-btn>
                <div
                    class="col-grow text-dark-500 text-weight-bold text-h6 text-center"
                >
                    <span v-if="!isCreator"
                        >Đăng ký trở thành nhà sáng tạo nội dung</span
                    >
                    <span v-else-if="isCreator">Bạn đã đăng ký thành công</span>
                </div>
                <q-btn dense flat padding="none" style="color: transparent">
                    <q-icon name="chevron_right" size="md" />
                </q-btn>
            </div>

            <div class="become-creator-section flex justify-center q-my-lg">
                <q-btn to="#" flat no-caps no-wrap dense>
                    <q-avatar size="64px">
                        <img
                            src="https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729522677/penomy_assets/penomy.png"
                        />
                    </q-avatar>
                    <span class="q-pl-sm text-weight-bold text-h5 text-dark">
                        <span v-if="isCreator" class="underline-primary">
                            Xin chào nhà sáng tạo {{ userNickname }}
                        </span>
                        <span v-else-if="!isCreator" class="underline-primary">
                            Xin chào {{ userNickname }}
                        </span>
                    </span>
                </q-btn>
            </div>
        </section>

        <section id="main-section" class="flex justify-center q-mt-sm">
            <!-- Requirement 1 section -->
            <div
                id="requirement-1"
                class="text-subtitle1 text-dark-500 become-creator-section"
            >
                <router-link
                    to="#requirement-1"
                    class="text-h5 text-dark text-weight-bold underline-none"
                >
                    Chi tiết về việc đăng ký trở thành nhà sáng tạo nội dung
                </router-link>
                <p class="q-mt-md">
                    1. Khi bạn đã xác nhận đăng ký trở thành nhà sáng tạo nội
                    dung trên nền tảng Penomy đồng nghĩa với việc bạn đã đồng ý
                    và tuân thủ với
                    <a
                        :href="communityPolicyLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline-none text-weight-bold text-primary"
                        >quy tắc cộng đồng
                    </a>
                    và
                    <a
                        :href="contentPolicyLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline-none text-weight-bold text-primary"
                        >quy tắc nội dung
                    </a>
                    do Penomy quy định.
                </p>
                <p>
                    2. Nếu bạn bị phát hiện vi phạm quy tắc khi đăng tải nội
                    dung trên nền tảng, Penomy yêu cầu bạn hợp tác gỡ bỏ các nội
                    dung này khỏi nền tảng. Trong trường hợp vi phạm nghiêm
                    trọng, nền tảng
                    <strong>có quyền chủ động gỡ bỏ</strong> các nội dung này mà
                    không cần thông báo trước.
                </p>
                <p>
                    3. Nếu bạn tiếp tục vi phạm sau khi đã được nhắc nhở hoặc cố
                    tình không tuân thủ quy tắc cộng đồng, Penomy có quyền áp
                    dụng các biện pháp xử lý nghiêm khắc hơn. Điều này bao gồm,
                    nhưng không giới hạn, việc
                    <a
                        :href="contentPolicyLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline-none text-weight-bold text-dark-500"
                    >
                        cấm tạm thời hoặc vĩnh viễn tài khoản của bạn
                    </a>
                    để đảm bảo môi trường sáng tác an toàn và lành mạnh cho cộng
                    đồng.
                </p>
            </div>
            <!-- Requirement 1 section -->

            <!-- Requirement 2 section -->
            <div
                id="requirement-2"
                class="text-subtitle1 text-dark-500 become-creator-section q-mt-lg"
            >
                <router-link
                    to="#requirement-2"
                    class="text-h5 text-dark text-weight-bold underline-none"
                >
                    Quy tắc nội dung khi đăng tải
                </router-link>
                <p class="q-mt-md">
                    1. Nội dung do bạn đăng tải phải do chính bạn tạo ra và có
                    bản quyền toàn diện đối với những nội dung này, nền tảng
                    nghiêm cấm các trường hợp sao chép hoặc đăng tải các nội
                    dung vi phạm quyền sở hữu trí tuệ của bên thứ ba.
                </p>
                <p>
                    2. Nghiêm cấm nội dung liên quan đến các quan điểm chính trị
                    gây tranh cãi, kích động, hoặc các vấn đề tôn giáo mang tính
                    xúc phạm, phân biệt đối xử, các nội dung lừa đảo, xuyên tạc,
                    hoặc cổ vũ hành vi phạm pháp. Nghiêm cấm tuyệt đối các nội
                    dung kích động bạo lực, phân biệt chủng tộc, kỳ thị giới
                    tính, hoặc bất kỳ hình thức thù ghét nào.
                </p>
                <p>
                    3. Để xem chi tiết, vui lòng truy cập vào trang
                    <a
                        :href="contentPolicyLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline-none text-weight-bold text-primary"
                        >quy tắc nội dung
                    </a>
                    của Penomy.
                </p>
            </div>
            <!-- Requirement 2 section -->

            <!-- Creator Benefits section -->
            <div
                id="creator-benefits"
                class="text-subtitle1 text-dark-500 become-creator-section q-mt-lg"
            >
                <router-link
                    to="#creator-benefits"
                    class="text-h5 text-dark text-weight-bold underline-none"
                >
                    Quyền lợi của nhà sáng tạo
                </router-link>
                <p class="q-mt-md">
                    1. <strong>Chia sẻ doanh thu</strong>: Nhà sáng tạo có quyền
                    nhận phần chia sẻ doanh thu từ nội dung của mình dựa trên
                    lượt xem và sự ủng hộ từ phía người dùng.
                </p>
                <p>
                    2. <strong>Hỗ trợ cá nhân hóa</strong>: Nhà sáng tạo có
                    quyền tùy chỉnh hồ sơ, trang cá nhân, và xây dựng thương
                    hiệu riêng trên nền tảng.
                </p>
                <p>
                    3. Để xem chi tiết, vui lòng truy cập vào trang
                    <a
                        :href="creatorBenefitsLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline-none text-weight-bold text-primary"
                        >quyền lợi cho nhà sáng tạo
                    </a>
                    của Penomy.
                </p>
            </div>
            <!-- Creator Benefits section -->

            <!-- Confirm policy section -->
            <div
                class="q-mt-md become-creator-section row q-pa-md bg-light-100 shadow-1 border-radius-md"
            >
                <div v-if="isCreator" class="policy-confirm-checkbox col-grow">
                    <span class="wrapper q-mr-xs">
                        <q-icon name="check" class="checked"></q-icon>
                    </span>
                    <span class="text-subtitle1">
                        Tôi xác nhận rằng mình đã đọc, hiểu rõ và cam kết tuân
                        thủ đầy đủ các quy tắc và điều khoản sử dụng của nền
                        tảng.
                    </span>
                </div>
                <div
                    v-else-if="!isCreator"
                    @click="confirmPolicy"
                    class="policy-confirm-checkbox col-grow"
                >
                    <span class="wrapper q-mr-xs">
                        <q-icon
                            name="check"
                            :class="{ checked: hasConfirmedPolicy }"
                        ></q-icon>
                    </span>
                    <span class="text-subtitle1">
                        Tôi xác nhận rằng mình đã đọc, hiểu rõ và cam kết tuân
                        thủ đầy đủ các quy tắc và điều khoản sử dụng của nền
                        tảng.
                    </span>
                </div>

                <q-btn
                    v-if="!isCreator"
                    @click="becomeCreator"
                    dense
                    no-caps
                    class="q-mt-md col-grow bg-primary text-dark text-subtitle1 text-weight-bold"
                    :disable="!hasConfirmedPolicy || isProcessing"
                    :loading="isProcessing"
                >
                    Xác nhận đăng ký
                </q-btn>
            </div>
            <!-- Confirm policy section -->
        </section>

        <section
            id="footer-section"
            class="flex justify-center q-mt-lg bg-light-300"
        >
            <div
                class="text-dark-500 text-subtitle1 q-py-md become-creator-section flex items-center"
            >
                <router-link
                    :to="userProfileLink"
                    class="underline-none text-weight-bold text-dark-500"
                >
                    {{ userNickname }}
                </router-link>
                <q-icon name="chevron_right" size="sm" />
                <span>Đăng ký sáng tác</span>
            </div>
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { UserProfile1RouteNames } from "src/router/userProfile/UserProfile1PageRoute";
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { BecomeCreatorApiHandler } from "src/api.handlers/become_creator/BecomeCreatorApiHandler";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "BecomeCreatorPage",
    data() {
        return {
            isLoading: true,
            isProcessing: false,
            hasConfirmedPolicy: false,
        };
    },
    computed: {
        isCreator() {
            return userProfileStore.isCreator;
        },
        userProfileLink() {
            return {
                name: UserProfile1RouteNames.profileDetail,
                params: {
                    userId: userProfileStore.currentUserId,
                },
            };
        },
        userNickname() {
            return (
                userProfileStore.userProfile.nickname ??
                "Nickname của người dùng"
            );
        },
        communityPolicyLink() {
            return "/terms/community-policy";
        },
        contentPolicyLink() {
            return "/terms/content-policy";
        },
        creatorBenefitsLink() {
            return "/terms/creator-benefits";
        },
    },
    async mounted() {
        await authStore.setUp();
        await userProfileStore.setUp(
            authStore.isAuth,
            authStore.accessToken(),
            authStore.userId
        );

        if (!authStore.isAuth) {
            // If current user is not authenticated,
            // then redirect to the login page
            this.$router.push("/auth/login");

            NotificationHelper.notifyError(
                "Vui lòng đăng nhập để truy cập trang"
            );

            return;
        }

        // Set the flag when the current user is already signed in.
        this.isLoading = false;
    },
    methods: {
        confirmPolicy() {
            this.hasConfirmedPolicy = !this.hasConfirmedPolicy;
        },
        async becomeCreator() {
            if (this.isProcessing) {
                return;
            }

            // Turn on the isProcessing flag.
            this.isProcessing = true;

            const result = await BecomeCreatorApiHandler.registerAsync(
                authStore.bearerAccessToken()
            );

            // Display success message when user register as creator success.
            if (result) {
                NotificationHelper.notifySuccess(
                    "Bạn đã đăng ký sáng tác thành công"
                );

                // Update the store state for the current user profile.
                userProfileStore.becomeCreator();
                this.$router.push(this.userProfileLink);
                return;
            }

            NotificationHelper.notifyError(
                "Đã có lỗi xảy ra khi thực hiện đăng ký"
            );

            // Turn off the isProcessing flag after operation is done.
            this.isProcessing = false;
        },
    },
};
</script>

<style scoped>
.become-creator-section {
    --max-width: 960px;

    width: 100% !important;
    max-width: var(--max-width) !important;
}

.policy-confirm-checkbox {
    --dark: #120e36;
    --dark-700: #78847e;
    --primary-700: #53bf94;

    display: inline flex;
    align-items: center;
}

.policy-confirm-checkbox:hover {
    cursor: pointer;
}

.policy-confirm-checkbox .q-icon {
    padding: 4px;
    color: var(--dark-700);
    border: 1.6px solid var(--dark-700);
    border-radius: 100%;
    font-weight: bold;
}

.policy-confirm-checkbox .q-icon.checked {
    border-color: transparent;
    background-color: var(--primary-700);
    color: var(--dark);
}
</style>
