<template>
    <q-page v-if="!isLoading">
        <HeaderHighlight
            label="Chỉnh sửa thông tin cá nhân"
            class="q-mb-lg q-mt-md q-px-md"
        />

        <section class="row text-dark q-px-md">
            <section class="col-md-auto col-grow">
                <div class="border-radius-sm q-pa-md bg-light-100 shadow-1">
                    <p
                        class="text-subtitle1 text-center text-weight-bold q-mb-sm"
                    >
                        Ảnh đại diện
                    </p>

                    <AvatarImageInput
                        :presetImageSrc="avatarUrl"
                        v-model="avatarImageFile"
                    />

                    <div @click="debug" class="q-mt-md text-subtitle1">
                        Cập nhật gần nhất: <strong>{{ updatedAt }}</strong>
                    </div>
                </div>
            </section>
            <section
                class="col-grow"
                :class="$q.screen.lt.md ? 'q-mt-lg' : 'q-ml-lg'"
            >
                <div
                    class="border-radius-sm q-pa-md bg-light-100 shadow-1 text-subtitle1"
                >
                    <div id="nickname-section">
                        <p class="q-mb-xs">
                            Nickname của bạn (Tối đa
                            {{ MAX_NICKNAME_LENGTH }} kí tự)
                        </p>

                        <div class="flex">
                            <input
                                class="col-grow q-pa-sm border-radius-sm border-sm-light-500"
                                :class="nicknameError ? errorClasses : ''"
                                @input="onInputNickName"
                                v-model="nickname"
                                placeholder="Nhập nickname bạn muốn đổi"
                            />
                        </div>
                    </div>
                    <div id="aboutme-section" class="q-mt-md">
                        <p class="q-mb-xs">
                            Mô tả về bạn (Tối đa {{ MAX_ABOUT_ME_LENGTH }} kí
                            tự)
                        </p>

                        <div class="flex">
                            <textarea
                                class="about-me col-grow q-pa-sm border-radius-sm border-sm-light-500"
                                :class="aboutMeError ? errorClasses : ''"
                                @input="onInputAboutMe"
                                v-model="aboutMe"
                                placeholder="Nhập mô tả về bạn"
                                rows="2"
                            />
                        </div>
                    </div>
                    <div id="aboutme-section" class="q-mt-md">
                        <p class="q-mb-xs">
                            <span class="q-mr-xs">Email</span>
                            <strong class="text-primary">(Đã xác minh)</strong>
                        </p>

                        <div class="flex" :class="{ error: aboutMeError }">
                            <span
                                class="col-grow q-pa-sm border-radius-sm text-subtitle1 bg-primary-700 border-sm-primary"
                            >
                                {{ email }}
                            </span>
                        </div>
                    </div>

                    <div class="q-mt-md flex">
                        <q-btn
                            @click="updateProfile"
                            class="col-grow text-subtitle1 bg-primary text-dark text-weight-bold q-pa-xs"
                            no-caps
                            :loading="isProcessing"
                            :disable="isProcessing || disableUpdateButton"
                        >
                            Lưu thay đổi
                        </q-btn>
                    </div>
                </div>
            </section>
        </section>
    </q-page>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { useUserProfileStore } from "src/stores/common/UserProfileStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { EditProfileRouteName } from "src/router/userProfile/UserProfile2PageRoute";
import { UpdateProfileApiHandler } from "src/api.handlers/userProfile/userProfile2Page/UpdateProfileApiHandler";

// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import AvatarImageInput from "src/components/common/userProfile/AvatarImageInput.vue";

// Init store for later operation.
const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

export default {
    name: "UserProfile2Page",
    components: {
        HeaderHighlight,
        AvatarImageInput,
    },
    data() {
        return {
            userId: null,
            isLoading: true,
            isProcessing: false,
            nickname: null,
            nicknameError: false,
            aboutMe: null,
            aboutMeError: false,
            avatarImageFile: null,
        };
    },
    computed: {
        MAX_NICKNAME_LENGTH() {
            return 32;
        },
        MAX_ABOUT_ME_LENGTH() {
            return 2000;
        },
        /**
         * Check if the current user that visit this page is
         * the owner of this profile or not.
         */
        isProfileOwner() {
            return (
                // Check if the current user is already signed-in
                // and the userId is similar to the route param.
                authStore.isAuth &&
                this.userId == userProfileStore.currentUserId
            );
        },
        avatarUrl() {
            return userProfileStore.currentAvatarUrl;
        },
        email() {
            return "duongkhai.dev@gmail.com";
        },
        updatedAt() {
            return userProfileStore.userProfile.lastActiveAt;
        },
        errorClasses() {
            return "bg-secondary border-sm-secondary";
        },
        disableUpdateButton() {
            return this.nicknameError || this.aboutMeError;
        },
    },
    beforeMount() {
        // Get the id from the route params to fetch data.
        this.userId = String(this.$route.params.userId);
    },
    async mounted() {
        // Wait for the store successfully setup when access the page.
        await authStore.setUp();

        if (!authStore.isAuth) {
            // Redirect to login page when current user is not authenticated.
            NotificationHelper.notifyError(
                "Vui lòng đăng nhập để truy cập vào trang này"
            );

            this.$router.push("/auth/login");
            return;
        }

        // Wait for userProfile store to setup success.
        await userProfileStore.setUp(
            true,
            authStore.accessToken(),
            authStore.userId
        );

        // Populate the user profile detail to data:property.
        this.nickname = userProfileStore.userProfile.nickname;
        this.aboutMe = userProfileStore.userProfile.aboutMe;

        if (!this.isProfileOwner) {
            // Redirect to correct path if user modifies the route.
            const routeDetail = {
                name: EditProfileRouteName,
                params: {
                    userId: userProfileStore.currentUserId,
                },
            };

            this.$router.push(routeDetail);
        }

        // Turn off the flag when loading page success.
        this.isLoading = false;
    },
    methods: {
        debug() {
            console.log(this.nickname);
            console.log(this.aboutMe);
            console.log(this.avatarImageFile);
        },
        /**
         * @param {InputEvent} event The event instance.
         */
        onInputNickName(event) {
            const inputElement = event.target;
            const inputValue = inputElement.value + "";

            if (inputValue.length <= this.MAX_NICKNAME_LENGTH) {
                return;
            }

            // If the input value is exceed the max length, then prevent user to input.
            this.nickname = inputValue.slice(0, inputValue.length - 1);
        },
        /**
         * @param {InputEvent} event The event instance.
         */
        onInputAboutMe(event) {
            const inputElement = event.target;
            const inputValue = inputElement.value + "";

            if (inputValue.length <= this.MAX_ABOUT_ME_LENGTH) {
                return;
            }

            // If the input value is exceed the max length, then prevent user to input.
            this.aboutMe = inputValue.slice(0, inputValue.length - 1);
        },
        async updateProfile() {
            this.isProcessing = true;

            const profileDetail = {
                nickname: this.nickname,
                aboutMe: this.aboutMe,
            };

            const updateResult =
                await UpdateProfileApiHandler.updateProfileAsync(
                    profileDetail,
                    this.avatarImageFile,
                    authStore.bearerAccessToken()
                );

            if (updateResult.isSuccess) {
                NotificationHelper.notifySuccess(
                    "Cập nhật thông tin thành công"
                );

                const newAvatarUrl = updateResult.responseBody;

                if (newAvatarUrl) {
                    userProfileStore.setAvatarUrl(newAvatarUrl);
                }
            } else {
                NotificationHelper.notifyError("Có gì đó không ổn...");
            }

            this.isProcessing = false;
        },
    },
    watch: {
        nickname() {
            if (this.nickname == "") {
                this.nicknameError = true;
            } else {
                this.nicknameError = false;
            }
        },
        aboutMe() {
            if (this.aboutMe == "") {
                this.aboutMeError = true;
            } else {
                this.aboutMeError = false;
            }
        },
    },
};
</script>

<style scoped>
.about-me {
    resize: vertical;
    min-height: 64px;
}
</style>
