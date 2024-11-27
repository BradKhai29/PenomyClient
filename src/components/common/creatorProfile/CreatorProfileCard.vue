<template>
    <section id="user_profile_card" class="row items-center q-py-lg q-px-xl">
        <div id="user_avatar" class="q-mr-lg col-auto q-my-sm">
            <q-avatar class="user_avatar shadow-2 relative-position">
                <img :src="avatarUrl" />
                <q-btn
                    v-if="!isProfileOwner"
                    round
                    dense
                    padding="sm"
                    class="absolute-bottom-right bg-primary text-dark"
                >
                    <q-icon name="palette" />
                </q-btn>
                <CreatorBadge
                    v-if="isProfileOwner"
                    :isProfileOwner="isProfileOwner"
                    :creatorProfileLink="creatorProfileLink"
                />
            </q-avatar>
        </div>
        <div id="user_detail_section" class="column justify-start col">
            <h5 class="text-weight-bold flex items-center q-ma-none text-dark">
                <span>{{ nickname }}</span>
                <span
                    v-if="inFriendList"
                    class="q-ml-sm q-pa-xs text-subtitle2 text-weight-bold bg-primary-700 text-primary border-radius-sm"
                >
                    Bạn bè

                    <q-tooltip
                        anchor="bottom middle"
                        self="top middle"
                        :offset="tooltipOffset"
                        class="bg-dark text-light"
                    >
                        <strong class="text-subtitle2">
                            Nằm trong danh sách bạn bè
                        </strong>
                    </q-tooltip>
                </span>
                <q-btn
                    @click="showExtraInfo = true"
                    icon="info"
                    round
                    dense
                    flat
                >
                    <q-tooltip
                        anchor="center right"
                        self="center left"
                        :offset="[4, 10]"
                    >
                        <strong class="text-subtitle2"> Xem chi tiết </strong>
                    </q-tooltip>
                </q-btn>
            </h5>
            <div class="flex items-center text-dark-500 text-subtitle1 q-mt-sm">
                <q-btn id="total-follower" dense no-caps flat padding="none">
                    <q-icon name="group_add" size="sm" />
                    <span class="q-ml-sm text-subtitle1">
                        <strong>{{ totalFollowers }}</strong>
                        <span class="q-ml-xs">người theo dõi</span>
                    </span>
                </q-btn>

                <span
                    id="separator"
                    class="border-sm-dark-500 q-py-sm q-mx-sm"
                ></span>

                <span>{{ totalArtworks }} tác phẩm</span>
            </div>
            <div
                id="about-me-section"
                class="flex text-dark text-subtitle1 q-mt-sm"
            >
                <span>
                    {{ aboutMeTrim }}
                    <span
                        class="about-me-btn text-dark text-weight-bold"
                        v-if="displayViewMoreButton"
                        @click="showExtraInfo = true"
                    >
                        ...Xem thêm
                    </span>
                </span>
            </div>
            <section id="interaction-button-group" class="q-mt-md">
                <!-- Guest view display section -->
                <div v-if="!isProfileOwner" class="flex items-center">
                    <!-- Creator follow button -->
                    <CreatorFollowButton :creatorId="creatorId" />
                    <!-- Creator follow button -->

                    <!-- Report profile button -->
                    <ReportProfileButton v-if="isAuth" :userId="creatorId" />
                    <!-- Report profile button -->
                </div>
                <!-- Guest view display section-->

                <!-- Profile Owner display section -->
                <div v-else-if="isProfileOwner" class="flex items-center">
                    <!-- Edit profile button -->
                    <q-btn
                        id="edit-profile-button"
                        dense
                        no-caps
                        class="bg-light-300 text-dark border-radius-sm shadow-1 q-px-sm"
                    >
                        <q-icon name="edit" />
                        <span class="q-ml-xs text-subtitle1">
                            Sửa thông tin
                        </span>
                    </q-btn>
                    <!-- Edit profile button -->

                    <!-- Go to studio button -->
                    <q-btn
                        to="/studio/overview"
                        id="go-to-creator-studio-button"
                        dense
                        no-caps
                        class="q-ml-sm bg-dark text-light border-radius-sm shadow-1 q-px-sm"
                    >
                        <q-icon name="space_dashboard" />
                        <span class="q-ml-xs text-subtitle1">
                            Studio của bạn
                        </span>
                    </q-btn>
                    <!-- Go to studio button -->
                </div>
                <!-- Profile Owner display section -->
            </section>
        </div>

        <!-- Extra information dialog section -->
        <q-dialog v-model="showExtraInfo">
            <q-card class="extra-info-dialog border-radius-md">
                <q-card-section class="flex items-center justify-between">
                    <HeaderHighlight
                        label="Giới thiệu"
                        class="text-h6 text-weight-bold"
                    />
                    <q-btn
                        dense
                        round
                        unelevated
                        flat
                        class="bg-primary-700"
                        @click="showExtraInfo = false"
                    >
                        <q-icon name="close" class="text-dark" />
                    </q-btn>
                </q-card-section>

                <q-card-section
                    style="max-height: 64vh"
                    class="q-pt-none text-subtitle1 scroll penomy-scrollbar"
                >
                    <p v-if="aboutMe" class="about-me-section">
                        {{ aboutMe }}
                    </p>

                    <div class="text-h6 text-weight-bold q-mb-sm">
                        Chi tiết người dùng
                    </div>

                    <section class="other-info-detail q-mb-md">
                        <!-- User profile link section -->
                        <q-btn
                            class="flex items-center"
                            dense
                            padding="none"
                            flat
                            no-caps
                            @mouseleave="isCopyLink = false"
                            @click="copyProfileLink"
                        >
                            <q-tooltip
                                anchor="center right"
                                self="center left"
                                :offset="[4, 10]"
                            >
                                <strong class="text-subtitle2">
                                    {{
                                        isCopyLink ? "Đã lưu link" : "Lấy link"
                                    }}
                                </strong>
                            </q-tooltip>
                            <q-icon
                                name="link"
                                size="sm"
                                style="transform: rotate(-45deg)"
                            />
                            <div class="q-ml-sm text-subtitle1 q-mr-md">
                                <span>
                                    {{ userProfileHref }}
                                </span>
                            </div>
                        </q-btn>
                        <!-- User profile link section -->

                        <!-- User registered date section -->
                        <div
                            class="flex items-center q-mt-sm"
                            style="width: fit-content"
                        >
                            <q-icon name="calendar_month" size="sm" />
                            <div class="q-ml-sm">
                                <span class="text-subtitle1">
                                    Ngày tham gia:
                                </span>
                                <span class="text-weight-bold">
                                    {{ registeredAt }}
                                </span>
                            </div>
                        </div>
                        <!-- User registered date section -->

                        <!-- User last active time section -->
                        <div
                            v-if="isProfileOwner"
                            class="flex items-center q-mt-sm"
                            style="width: fit-content"
                        >
                            <q-icon name="schedule" size="sm" />
                            <div class="q-ml-sm">
                                <span class="text-subtitle1">
                                    Truy cập lần cuối:
                                </span>
                                <span class="text-weight-bold">
                                    {{ lastActiveAt }}
                                </span>
                            </div>
                        </div>
                        <!-- User last active time  section -->
                    </section>

                    <div class="border-md-bottom-light-500"></div>

                    <section class="q-mt-md text-subtitle1">
                        <div class="text-h6 text-weight-bold q-mb-sm">
                            Thông tin thêm
                        </div>

                        <section class="q-mb-md">
                            <!-- Become creator date section -->
                            <div
                                id="become-creator-date-section"
                                class="flex items-center q-mt-sm"
                                style="width: fit-content"
                            >
                                <q-icon name="assignment" size="sm" />
                                <div class="q-ml-sm">
                                    <span class="text-subtitle1">
                                        Đăng ký sáng tác:
                                    </span>
                                    <span class="text-weight-bold">
                                        {{ becomeCreatorAt }}
                                    </span>
                                </div>
                            </div>
                            <!-- Become creator date section -->

                            <!-- Total followers section -->
                            <div
                                id="total-created-artworks-section"
                                class="flex items-center q-mt-sm"
                                style="width: fit-content"
                            >
                                <q-icon name="group_add" size="sm" />
                                <div class="q-ml-sm">
                                    <span class="text-subtitle1">
                                        Số người theo dõi:
                                    </span>
                                    <span class="text-weight-bold">
                                        {{ totalFollowers }}
                                    </span>
                                </div>
                            </div>
                            <!-- Total followers section -->

                            <!-- Total created artworks section -->
                            <div
                                id="total-created-artworks-section"
                                class="flex items-center q-mt-sm"
                                style="width: fit-content"
                            >
                                <q-icon name="palette" size="sm" />
                                <div class="q-ml-sm">
                                    <span class="text-subtitle1">
                                        Đã đăng tải:
                                    </span>
                                    <span class="text-weight-bold">
                                        {{ totalArtworks }} tác phẩm
                                    </span>
                                </div>
                            </div>
                            <!-- Total created artworks section -->
                        </section>
                    </section>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- Extra information dialog section -->
    </section>
</template>

<script>
// Import dependencies section.
import { UrlHelper } from "src/helpers/UrlHelper";
import { useAuthStore } from "src/stores/common/AuthStore";
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";

// Import components section.
import HeaderHighlight from "src/components/common/creatorStudio/HeaderHighlight.vue";
import CreatorFollowButton from "./CreatorProfile.FollowButton.vue";
import ReportProfileButton from "../profile.common/ReportProfileButton.vue";
import CreatorBadge from "../userProfile/CreatorBadge.vue";

// Init store for later operation.
const authStore = useAuthStore();
const LIMIT_ABOUT_ME_SECTION_LENGTH = 250;

export default {
    name: "CreatorProfileCard",
    components: {
        HeaderHighlight,
        CreatorBadge,
        CreatorFollowButton,
        ReportProfileButton,
    },
    props: {
        creatorId: {
            type: String,
            required: true,
        },
        creatorProfile: {
            type: UserProfileResponseDto,
            required: true,
        },
        isProfileOwner: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            inFriendList: false,
            showExtraInfo: false,
            isCopyLink: false,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
        tooltipOffset() {
            return [10, 10];
        },
        userProfileHref() {
            return window.location.href;
        },
        nickname() {
            return this.creatorProfile.nickname;
        },
        avatarUrl() {
            return this.creatorProfile.avatarUrl;
        },
        aboutMe() {
            // return this.creatorProfile.aboutMe;

            return "I dont know what im doing, but that's okay. You probably don't either. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.";
        },
        aboutMeTrim() {
            if (this.aboutMe.length > LIMIT_ABOUT_ME_SECTION_LENGTH) {
                return this.aboutMe.slice(0, LIMIT_ABOUT_ME_SECTION_LENGTH);
            }

            return this.aboutMe;
        },
        displayViewMoreButton() {
            return this.aboutMe.length > LIMIT_ABOUT_ME_SECTION_LENGTH;
        },
        registeredAt() {
            return this.creatorProfile.registeredAt;
        },
        lastActiveAt() {
            return this.creatorProfile.lastActiveAt;
        },
        totalFollowedCreators() {
            return this.creatorProfile.totalFollowedCreators;
        },
        // Creator profile section.
        becomeCreatorAt() {
            return this.creatorProfile.becomeCreatorAt;
        },
        totalFollowers() {
            return this.creatorProfile.totalFollowers;
        },
        totalArtworks() {
            return this.creatorProfile.totalArtworks;
        },
    },
    methods: {
        copyProfileLink() {
            UrlHelper.copyCurrentUrlToClipBoard();

            this.isCopyLink = true;
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
