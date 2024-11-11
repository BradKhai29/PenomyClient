<template>
    <q-btn
        dense
        no-caps
        flat
        rounded
        class="shadow-1 bg-dark text-light q-px-sm"
    >
        <q-icon
            name="star"
            size="sm"
            :class="isVoted ? 'text-tertiary-500' : 'text-light'"
        ></q-icon>
        <span class="q-ml-sm text-subtitle1">
            <span v-if="isVoted"> {{ ratingModel }} / {{ maxStar }}</span>
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
                        class="col-grow bg-primary text-dark text-subtitle1 text-weight-bold"
                        @click="voteStarAsync"
                    >
                        Gửi đánh giá
                    </q-btn>
                </div>
            </section>
        </q-menu>
        <!-- End the rate star menu section -->
    </q-btn>
</template>

<script>
export default {
    name: "ArtworkRateStarButton",
    props: {
        artworkId: {
            required: true,
        },
    },
    data() {
        return {
            maxStar: 5,
            isVoted: false,
            showVoteMenu: false,
            ratingModel: 0,
        };
    },
    methods: {
        voteStarAsync() {
            this.isVoted = !this.isVoted;
        },
    },
};
</script>
