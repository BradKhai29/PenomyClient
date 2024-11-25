<template>
    <section class="q-pa-md row items-center">
        <div
            id="artwork-metadata-section"
            class="flex items-center q-gutter-md col-grow"
        >
            <span
                id="total-chapters-count"
                class="text-subtitle1 flex items-center"
            >
                <q-icon name="list_alt" size="sm" class="text-primary" />
                <span class="metadata-ml">
                    {{ viewCount }}/{{ viewCount }} tập
                </span>
                <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="tooltipOffset"
                    class="bg-dark text-light"
                >
                    <strong class="text-subtitle2">
                        Số tập:
                        <span class="text-weight-bold">
                            {{ animeDetail.viewCount }} /
                            {{ animeDetail.viewCount }}
                        </span>
                    </strong>
                </q-tooltip>
            </span>
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
                            {{ animeDetail.viewCount }}
                        </span>
                    </strong>
                </q-tooltip>
            </span>
            <span id="favorite-count" class="text-subtitle1 flex items-center">
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
                            {{ animeDetail.favoriteCount }}
                        </span>
                    </strong>
                </q-tooltip>
            </span>
            <span id="star-rate-count" class="text-subtitle1 flex items-center">
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
            <span id="follower-count" class="text-subtitle1 flex items-center">
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
                            {{ animeDetail.followCount }}
                        </span>
                    </strong>
                </q-tooltip>
            </span>
        </div>
        <div id="button-group-section" class="flex items-center">
            <ArtworkRateStarButton :artworkId="artworkId" class="shadow-1" />

            <ArtworkFollowButton
                :artworkId="artworkId"
                :hasUserFollowed="animeDetail.hasFollowed"
                class="q-ml-sm"
            />
        </div>
    </section>
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
        artworkId: {
            required: true,
        },
        animeDetail: {
            type: ArtworkDetailResponse,
            required: true,
        },
    },
    computed: {
        tooltipOffset() {
            return [8, 8];
        },
        introduction() {
            return this.animeDetail.introduction ?? "Không có phần giới thiệu";
        },
        viewCount() {
            return NumberHelper.formatNumberShort(
                this.animeDetail.viewCount,
                2
            );
        },
        favoriteCount() {
            return NumberHelper.formatNumberShort(
                this.animeDetail.favoriteCount,
                2
            );
        },
        followCount() {
            return NumberHelper.formatNumberShort(
                this.animeDetail.followCount,
                2
            );
        },
        totalUsersRated() {
            return this.animeDetail.totalUsersRated;
        },
        starRates() {
            return this.animeDetail.starRates;
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
