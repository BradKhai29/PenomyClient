<template>
    <div class="col-md-4 col-grow shadow-1">
        <section class="q-pa-md">
            <div
                id="artwork-metadata-section"
                class="flex items-center q-gutter-md justify-between q-px-sm"
            >
                <span id="view-count" class="text-subtitle1 flex items-center">
                    <q-icon name="visibility" size="sm" class="text-primary" />
                    <span class="metadata-ml"> {{ viewCount }} </span>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="tooltipOffset"
                        class="bg-dark text-light"
                    >
                        <strong class="text-subtitle2">
                            Số lượt xem:
                            <span class="text-weight-bold">
                                {{ comicDetail.viewCount }}
                            </span>
                        </strong>
                    </q-tooltip>
                </span>
                <span
                    id="favorite-count"
                    class="text-subtitle1 flex items-center"
                >
                    <q-icon name="favorite" size="sm" class="text-primary" />
                    <span class="metadata-ml">
                        {{ favoriteCount }}
                    </span>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="tooltipOffset"
                        class="bg-dark text-light"
                    >
                        <strong class="text-subtitle2">
                            Số lượt yêu thích:
                            <span class="text-weight-bold">
                                {{ comicDetail.favoriteCount }}
                            </span>
                        </strong>
                    </q-tooltip>
                </span>
                <span
                    id="star-rate-count"
                    class="text-subtitle1 flex items-center"
                >
                    <q-icon name="star" size="sm" class="text-primary" />
                    <span class="metadata-ml">
                        {{ starRates }}
                        <span v-if="totalUsersRated != 0">
                            ({{ totalUsersRated }})
                        </span>
                    </span>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="tooltipOffset"
                        class="bg-dark text-light"
                    >
                        <strong class="text-subtitle2">
                            <span class="text-primary text-weight-bold">
                                ({{ starRates }} sao)
                            </span>
                            trên tổng số
                            <span class="text-primary text-weight-bold">
                                {{ totalUsersRated }}
                            </span>
                            lượt vote.
                        </strong>
                    </q-tooltip>
                </span>
                <span
                    id="follower-count"
                    class="text-subtitle1 flex items-center"
                >
                    <q-icon name="add_box" size="sm" class="text-primary" />
                    <span class="metadata-ml"> {{ followCount }} </span>
                    <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="tooltipOffset"
                        class="bg-dark text-light"
                    >
                        <strong class="text-subtitle2">
                            Số lượt theo dõi:
                            <span class="text-weight-bold">
                                {{ comicDetail.followCount }}
                            </span>
                        </strong>
                    </q-tooltip>
                </span>
            </div>
            <div
                id="artwork-description-and-button-group-section"
                class="q-mt-md"
            >
                <p class="text-subtitle1 text-dark q-mb-none">
                    <span class="q-mr-xs text-weight-bold"> Giới thiệu: </span>
                    <span> {{ introduction }}</span>
                </p>

                <section id="button-group-section" class="q-mt-md column">
                    <ArtworkRateStarButton
                        class="col-grow"
                        :artworkId="comicId"
                    />

                    <ArtworkFollowButton
                        class="col-grow q-mt-md"
                        :artworkId="comicId"
                        :hasUserFollowed="comicDetail.hasFollowed"
                    />
                </section>
            </div>
        </section>
    </div>
</template>

<script>
// Import dependencies section.
import { NumberHelper } from "src/helpers/NumberHelper";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";

// Import components section.
import ArtworkRateStarButton from "src/components/common/artwork/buttons/ArtworkRateStarButton.vue";
import ArtworkFollowButton from "src/components/common/artwork/buttons/ArtworkFollowButton.vue";

export default {
    name: "ComicDescriptionSection",
    components: {
        ArtworkRateStarButton,
        ArtworkFollowButton,
    },
    props: {
        comicId: {
            required: true,
        },
        comicDetail: {
            type: ArtworkDetailResponse,
            required: true,
        },
    },
    computed: {
        tooltipOffset() {
            return [8, 8];
        },
        introduction() {
            return this.comicDetail.introduction ?? "Không có phần giới thiệu";
        },
        viewCount() {
            return NumberHelper.formatNumberShort(
                this.comicDetail.viewCount,
                2
            );
        },
        favoriteCount() {
            return NumberHelper.formatNumberShort(
                this.comicDetail.favoriteCount,
                2
            );
        },
        followCount() {
            return NumberHelper.formatNumberShort(
                this.comicDetail.followCount,
                2
            );
        },
        totalUsersRated() {
            return this.comicDetail.totalUsersRated;
        },
        starRates() {
            return this.comicDetail.starRates;
        },
    },
};
</script>

<style scoped>
.metadata-ml {
    --margin-width: 2px;

    margin-left: var(--margin-width);
}
</style>
