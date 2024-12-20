<template>
    <q-btn
        v-if="isAuth"
        dense
        no-caps
        flat
        rounded
        :loading="isProcessing"
        :disable="isProcessing"
        class="shadow-1 bg-dark text-light q-px-sm"
    >
        <q-icon
            name="star"
            size="sm"
            :class="isRated ? 'text-tertiary-500' : 'text-light'"
        />
        <span class="q-ml-sm text-subtitle1">
            <span v-if="isRated"> {{ ratingModel }} / {{ maxStar }}</span>
            <span v-else>Đánh giá</span>
        </span>
        <!-- Start the rate star menu section -->
        <q-menu
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
            class="q-pa-sm"
            v-model="showVoteMenu"
        >
            <section id="rate-star-wrapper" style="min-width: 200px">
                <div
                    class="flex items-center justify-between text-dark text-subtitle1"
                >
                    <span class="border-left-sm-primary"
                        >Đánh giá: {{ ratingModel }} sao</span
                    >
                    <q-btn
                        class="bg-primary-700 text-dark"
                        dense
                        flat
                        rounded
                        size="xs"
                        @click="showVoteMenu = false"
                    >
                        <q-icon name="close" size="xs" />
                    </q-btn>
                </div>
                <div class="q-mb-md q-mt-sm flex justify-center">
                    <q-rating
                        v-model="ratingModel"
                        size="2.4em"
                        :max="maxStar"
                        class="text-primary"
                    />
                </div>
                <div class="flex">
                    <q-btn
                        dense
                        no-caps
                        :disable="noChangeInRateValue"
                        class="col-grow bg-primary text-dark text-subtitle1 text-weight-bold"
                        @click="voteStarAsync"
                    >
                        <span v-if="isRated">Gửi lại đánh giá</span>
                        <span v-else>Gửi đánh giá</span>
                    </q-btn>
                </div>
            </section>
        </q-menu>
        <!-- End the rate star menu section -->
    </q-btn>
    <q-btn
        v-else
        dense
        no-caps
        flat
        rounded
        class="shadow-1 bg-dark text-light q-px-sm"
        @click="showDialog = true"
    >
        <q-icon name="star" size="sm" class="text-light" />
        <span class="q-ml-sm text-subtitle1">Đánh giá </span>
        <RequireLoginDialog v-model="showDialog" />
    </q-btn>
</template>

<script>
// Import dependencies section.
import { useAuthStore } from "src/stores/common/AuthStore";
import ArtworkRatingApiHandler from "src/api.handlers/artwork/artwork3Page/ArtworkRatingApiHandler";

// Import components section.
import RequireLoginDialog from "../../others/RequireLoginDialog.vue";

// Init store for later operation.
const authStore = useAuthStore();

export default {
    name: "ArtworkRateStarButton",
    components: {
        RequireLoginDialog,
    },
    props: {
        artworkId: {
            required: true,
        },
    },
    data() {
        return {
            isProcessing: true,
            showDialog: false,
            maxStar: 5,
            /**
             * Flag to check if current user has rated the star or not.
             */
            isRated: false,
            showVoteMenu: false,
            ratingModel: 0,
            hasChangedInRateValue: false,
            lastStarRateValue: 0,
        };
    },
    computed: {
        isAuth() {
            return authStore.isAuth;
        },
        noChangeInRateValue() {
            return !this.hasChangedInRateValue;
        },
    },
    async mounted() {
        if (this.isAuth) {
            this.getCurrentUserStarRateAsync();
        }
    },
    methods: {
        async getCurrentUserStarRateAsync() {
            const currentUserStarRate =
                await ArtworkRatingApiHandler.getUserStarRateAsync(
                    authStore.bearerAccessToken(),
                    this.artworkId
                );

            // Set the status for the button.
            this.isRated = currentUserStarRate > 0;
            this.ratingModel = currentUserStarRate;
            this.lastStarRateValue = currentUserStarRate;

            // Turn off the isProcessing flag.
            this.isProcessing = false;
        },
        async voteStarAsync() {
            // Turn on the isProcessing flag.
            this.isProcessing = true;

            const rateStarResult =
                await ArtworkRatingApiHandler.RatingArtworkAsync(
                    this.artworkId,
                    this.ratingModel,
                    authStore.bearerAccessToken()
                );

            // Turn off the isProcessing flag and update related state.
            this.isProcessing = false;
            this.isRated = this.ratingModel > 0;
            this.lastStarRateValue = this.ratingModel;
            this.hasChangedInRateValue = false;
        },
    },
    watch: {
        ratingModel() {
            this.hasChangedInRateValue =
                this.ratingModel != this.lastStarRateValue;
        },
    },
};
</script>
