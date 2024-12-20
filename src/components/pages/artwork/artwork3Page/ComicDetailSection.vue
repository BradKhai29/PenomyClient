<template>
    <section
        v-if="!isLoading"
        id="artwork-detail-section-wrapper"
        :style="comicDetailCardStyle"
        class="shadow-1"
    >
        <section
            id="artwork-detail-section"
            class="q-py-lg row justify-center bg-dark-blur"
        >
            <section
                id="artwork-detail-card"
                class="row q-mt-md q-pa-md shadow-1 bg-light border-radius-md"
            >
                <q-img
                    class="q-mr-md border-radius-md shadow-1"
                    :src="comicDetail.thumbnailUrl"
                    width="225px"
                    height="280px"
                />
                <div class="col-grow column q-py-xs">
                    <h5
                        class="q-my-none text-weight-bold q-mb-md flex items-center"
                    >
                        <span class="q-mr-sm">
                            {{ comicDetail.title }}
                        </span>
                        <GetLinkButton :darkMode="true" />
                    </h5>
                    <div id="artwork-metadata" class="row">
                        <div id="country-and-author" class="column col-grow">
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold">
                                    Quốc gia:
                                </span>
                                <span>{{ comicDetail.countryName }}</span>
                            </div>
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold"> Tác giả: </span>
                                <span>{{ comicDetail.creatorName }}</span>
                            </div>
                        </div>
                        <div id="status-and-series" class="column col-grow">
                            <div
                                class="q-mb-xs text-subtitle1 row items-center"
                            >
                                <span class="text-weight-bold">
                                    Trạng thái:
                                </span>
                                <span class="q-ml-xs"> Còn cập nhật </span>
                            </div>
                            <div class="q-mb-xs text-subtitle1">
                                <span class="text-weight-bold"> Series: </span>
                                <span>{{
                                    comicDetail.series ?? "Không có"
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div id="artwork-categories" class="q-gutter-sm q-my-sm">
                        <q-btn
                            dense
                            flat
                            no-caps
                            class="shadow-1 text-dark bg-light-100"
                        >
                            <q-icon name="info_outline" />
                            <span
                                class="text-subtitle2 border-radius-sm q-ml-xs text-weight-bold"
                                >Khác</span
                            >
                            <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                            >
                                <strong class="text-subtitle2 text-weight-bold">
                                    Thông tin khác về tác phẩm
                                </strong>
                            </q-tooltip>
                        </q-btn>
                        <q-btn
                            :to="`${$route.path}?categoryId=${category.categoryId}`"
                            v-for="category in comicDetail.categories"
                            :key="category"
                            :id="category.categoryId"
                            dense
                            no-caps
                            unelevated
                            class="bg-dark text-light text-subtitle2 text-weight-bold border-radius-sm q-px-sm"
                        >
                            {{ category.categoryName }}
                        </q-btn>
                    </div>
                    <div id="action-button-group" class="q-gutter-sm q-mt-auto">
                        <q-btn
                            :to="lastReadChapterLink"
                            id="view-last-read-button"
                            class="bg-dark text-light text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="play_arrow" size="sm" />
                            <span class="q-ml-xs">Xem tiếp</span>
                        </q-btn>
                        <q-btn
                            :to="firstChapterLink"
                            id="view-first-chapter-button"
                            class="bg-dark text-light text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <span class="q-ml-xs">Xem từ đầu</span>
                        </q-btn>
                        <AddFavoriteButton
                            :artworkId="comicId"
                            :isUserFavorite="comicDetail.isUserFavorite"
                        />
                        <ArtworkReportButton
                            v-if="isAuth"
                            :artworkId="comicId"
                        />
                    </div>
                </div>
            </section>

            <CreatorDetailSection
                class="artwork-detail-section q-mt-md border-radius-md"
                :artworkId="comicId"
                :creatorId="comicDetail.creatorId"
                :creatorName="comicDetail.creatorName"
                :creatorAvatarUrl="comicDetail.creatorAvatarUrl"
                :creatorTotalFollowers="comicDetail.creatorTotalFollowers"
            />
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";

// Import components section.
import CreatorDetailSection from "src/components/common/artwork/CreatorDetailSection.vue";
import AddFavoriteButton from "src/components/common/artwork/buttons/AddFavoriteButton.vue";
import GetLinkButton from "src/components/common/artwork/buttons/GetLinkButton.vue";
import ArtworkReportButton from "src/components/common/artwork/buttons/ArtworkReportButton.vue";

// Init authStore for later operation.
const authStore = useAuthStore();

export default {
    name: "ComicDetailSection",
    components: {
        CreatorDetailSection,
        AddFavoriteButton,
        ArtworkReportButton,
        GetLinkButton,
    },
    props: {
        comicId: {
            required: true,
        },
        isLoading: {
            type: Boolean,
            required: true,
        },
        comicDetail: {
            type: ArtworkDetailResponse,
            required: true,
        },
    },
    data() {
        return {
            comicDetailCardStyle: {
                background: null,
                backgroundSize: "cover",
            },
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
        firstChapterLink() {
            return `/artwork/comic/${this.comicId}/chapter/${this.comicDetail.firstChapterId}`;
        },
        lastReadChapterLink() {
            return `/artwork/comic/${this.comicId}/chapter/${this.comicDetail.lastReadChapterId}`;
        },
    },
    mounted() {
        this.comicDetailCardStyle.background = `url(${this.comicDetail.thumbnailUrl}) no-repeat`;
    },
};
</script>
