<template>
    <section
        v-if="!isLoading"
        id="artwork-detail-section-wrapper"
        :style="animeDetailCardStyle"
        class="shadow-1"
    >
        <section
            id="artwork-detail-section"
            class="q-py-lg row justify-center bg-dark-blur-deep"
        >
            <section id="artwork-detail-card" class="row">
                <div class="text-light col-md-9 col-12 column q-py-xs">
                    <h4
                        class="q-my-none text-weight-bold q-mb-md flex items-center"
                    >
                        <span class="q-mr-sm">
                            {{ animeDetail.title }}
                        </span>
                        <GetLinkButton :darkMode="true" class="bg-light" />
                    </h4>
                    <div id="artwork-metadata" class="row">
                        <div
                            id="status-and-series"
                            class="row items-center col-grow text-subtitle1"
                        >
                            <div>
                                <span class="text-weight-bold">
                                    Trạng thái:
                                </span>
                                <span> Còn cập nhật </span>
                            </div>

                            <span
                                id="separator"
                                class="border-sm-light q-mx-sm"
                                style="padding: 6.4px 0px"
                            />

                            <div>
                                <span class="text-weight-bold"> Tác giả: </span>
                                <span class="">{{
                                    animeDetail.creatorName
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div id="artwork-categories" class="q-gutter-sm q-mt-xs">
                        <q-btn
                            dense
                            flat
                            no-caps
                            class="shadow-1 text-light q-px-sm border-radius-sm border-md-light"
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
                            v-for="category in animeDetail.categories"
                            :key="category"
                            :id="category.categoryId"
                            dense
                            no-caps
                            unelevated
                            class="bg-light text-dark text-subtitle2 text-weight-bold border-radius-sm q-px-sm border-md-light"
                        >
                            {{ category.categoryName }}
                        </q-btn>
                    </div>
                    <p
                        id="artwork-description"
                        class="row q-mt-md text-subtitle1"
                    >
                        <span class="col-md-11 col-12 introduction-text">
                            {{ animeDetail.introduction }} Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Qui assumenda
                            asperiores, exercitationem autem explicabo aliquid
                            saepe architecto illo maxime quisquam temporibus
                            quae sit debitis, consectetur similique animi
                            perferendis. Ipsum, minus. Lorem ipsum, dolor sit
                            amet consectetur adipisicing elit. Corrupti aliquam
                            inventore ullam et cumque autem obcaecati, velit, id
                            deserunt ipsa, tenetur harum vitae sed! Officiis qui
                            consectetur est eius rerum!
                        </span>
                    </p>
                    <div id="action-button-group" class="q-gutter-sm q-mt-auto">
                        <q-btn
                            class="bg-primary text-dark text-subtitle1 text-weight-bold"
                            no-caps
                        >
                            <q-icon name="play_arrow" size="sm" />
                            <span class="q-ml-xs">Xem tiếp</span>
                        </q-btn>
                        <q-btn
                            class="bg-primary text-dark text-subtitle1 text-weight-bold"
                            no-caps
                        >
                            <span class="q-ml-xs">Xem từ đầu</span>
                        </q-btn>
                        <AddFavoriteButton
                            :artworkId="artworkId"
                            :isUserFavorite="animeDetail.isUserFavorite"
                            :isComicType="false"
                        />
                        <ArtworkReportButton
                            v-if="isAuth"
                            :isComicType="false"
                            :artworkId="artworkId"
                        />
                    </div>
                </div>
                <q-img
                    class="q-ml-auto border-radius-md shadow-1 bg-light-300"
                    :src="animeDetail.thumbnailUrl"
                    width="225px"
                    height="280px"
                />
            </section>
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

// Import components section.
import AddFavoriteButton from "src/components/common/artwork/buttons/AddFavoriteButton.vue";
import GetLinkButton from "src/components/common/artwork/buttons/GetLinkButton.vue";
import ArtworkReportButton from "src/components/common/artwork/buttons/ArtworkReportButton.vue";

// Init authStore for later operation.
const authStore = useAuthStore();

export default {
    name: "AnimeDetailSection",
    components: {
        AddFavoriteButton,
        ArtworkReportButton,
        GetLinkButton,
    },
    props: {
        artworkId: {
            required: true,
        },
        isLoading: {
            type: Boolean,
            required: true,
        },
        animeDetail: {
            type: ArtworkDetailResponse,
            required: true,
        },
    },
    data() {
        return {
            animeDetailCardStyle: {
                background: null,
                backgroundSize: "cover",
            },
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
    },
    mounted() {
        this.animeDetailCardStyle.background = `url(${this.animeDetail.thumbnailUrl}) no-repeat`;
    },
};
</script>

<style scoped>
.introduction-text {
    --line-show: 3;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: var(--line-show); /* number of lines to show */
    line-clamp: var(--line-show);
    -webkit-box-orient: vertical;
}
</style>
