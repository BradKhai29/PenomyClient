<template>
    <section
        v-if="!isLoading"
        id="artwork-detail-section-wrapper"
        :style="comicDetailCardStyle"
        class="shadow-1"
    >
        <section
            id="artwork-detail-section"
            class="q-py-lg row justify-center"
            style="background-color: rgba(0, 0, 0, 0.4)"
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
                    <h5 class="q-my-none text-weight-bold q-mb-md">
                        {{ comicDetail.title }}
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
                                <span>{{ comicDetail.authorName }}</span>
                            </div>
                        </div>
                        <div id="status-and-series" class="column col-grow">
                            <div
                                class="q-mb-xs text-subtitle1 row items-center"
                            >
                                <span class="text-weight-bold">
                                    Trạng thái: Còn cập nhật
                                </span>
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
                            v-for="category in comicDetail.selectedCategories"
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
                            class="bg-dark text-light text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="play_arrow" size="sm" />
                            <span class="q-ml-xs">Xem tiếp</span>
                        </q-btn>
                        <q-btn
                            class="bg-dark text-light text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <span class="q-ml-xs">Xem từ đầu</span>
                        </q-btn>
                        <AddFavoriteButton
                            :artworkId="comicId"
                            :userId="1"
                            :isUserFavorite="comicDetail.isUserFavorite"
                        />
                        <q-btn
                            class="bg-light-300 text-dark text-subtitle1 text-weight-bold"
                            no-caps
                            rounded
                        >
                            <q-icon name="report" size="sm" />
                            <span class="q-ml-xs">Báo cáo vi phạm</span>
                            <q-badge
                                rounded
                                floating
                                class="bg-dark text-light text-weight-bold"
                            >
                                0
                            </q-badge>
                        </q-btn>
                    </div>
                </div>
            </section>

            <CreatorDetailBar
                class="artwork-detail-section q-mt-md"
                :creatorId="1"
                :artworkId="comicId"
            />
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import artworkDetailApiHandler from "src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork14Page/ArtworkResponse";
import { useAuthStore } from "src/stores/common/AuthStore";
import { NotificationHelper } from "src/helpers/NotificationHelper";

// Import components section.
import CreatorDetailBar from "src/components/pages/artwork/artwork3Page/CreatorDetailBar.vue";
import AddFavoriteButton from "src/components/pages/artwork/artwork3Page/AddFavoriteButton.vue";

// Init authStore for later operation.
const authStore = useAuthStore();

export default {
    name: "ComicDetailSection",
    components: {
        CreatorDetailBar,
        AddFavoriteButton,
    },
    props: {
        comicId: {
            required: true,
        },
    },
    data() {
        return {
            isLoading: true,
            /**
             * @type {ArtworkDetailResponse} Type of this property.
             */
            comicDetail: null,
            comicDetailCardStyle: {
                background: null,
                backgroundSize: "cover",
            },
        };
    },
    async mounted() {
        const bearerAccessToken = authStore.bearerAccessToken();

        console.log("Token", bearerAccessToken);

        const result = await artworkDetailApiHandler.getArtworkDetailByIdAsync(
            this.comicId,
            bearerAccessToken
        );

        if (!result) {
            NotificationHelper.notifyError("Không tìm thấy nội dung");

            // this.$router.push("/");
            return;
        }

        // If result is success, then get the information and bind to the comic detail.
        this.comicDetail = result;
        this.comicDetailCardStyle.background = `url(${this.comicDetail.thumbnailUrl}) no-repeat`;

        // Turn off is loading flag.
        this.isLoading = false;
    },
};
</script>

<style scoped>
#artwork-detail-breadcrumb,
#artwork-detail-card,
.artwork-detail-section {
    --max-width: 72%;

    max-width: var(--max-width);
    width: var(--max-width);
}
</style>
