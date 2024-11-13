<template>
    <section
        id="top-recommended-artwork-slider"
        class="shadow-1 border-radius-md row relative-position"
        @mouseenter="holdCurrentSlide"
        @mouseleave="continueAutoSlide"
    >
        <!-- Slider Buttons section -->
        <q-btn
            @click="toPrevious"
            :disable="isLoading"
            unelevated
            flat
            class="slider-button"
            style="left: 0"
        >
            <q-icon
                name="chevron_right"
                size="md"
                class="text-light left-slider-button"
            />
        </q-btn>
        <q-btn
            @click="toNext"
            :disable="isLoading"
            unelevated
            flat
            class="slider-button"
            style="right: 0"
        >
            <q-icon name="chevron_right" size="md" class="text-light" />
        </q-btn>
        <!-- Slider Buttons section -->

        <!-- Slider Indicator section -->
        <div v-if="!isLoading" class="slider-indicator q-mb-lg">
            <q-btn
                @click="goToSlide(index)"
                v-for="index in maxSlide"
                :key="index"
                dense
                unelevated
                flat
                padding="none"
                icon="circle"
                size="xs"
                class="q-mx-xs"
                :class="
                    index == currentSlideIndex ? 'text-primary' : 'text-light'
                "
            />
        </div>
        <!-- Slider Indicator section -->

        <ArtworkSliderCardSkeleton v-if="isLoading" />

        <q-tab-panels
            v-if="!isLoading"
            v-model="selectedSlide"
            animated
            class="col-grow"
        >
            <q-tab-panel
                v-for="(artwork, index) in displayArtworks"
                :key="index"
                :name="`${sliderPrefix}_${index + 1}`"
                class="q-pa-none row"
            >
                <ArtworkSliderCard
                    :isComic="isComic"
                    :artworkDetail="artwork"
                />
            </q-tab-panel>
        </q-tab-panels>
    </section>
</template>

<script>
// Import dependencies section.
import { TopRecommendedArtworkResponse } from "src/api.models/artwork/artwork1Page/TopRecommendedArtworkResponse";
import { TopRecommendedArtworkApiHandler } from "src/api.handlers/artwork/artwork1Page/TopRecommendedArtworkApiHandler";

// Import components section.
import ArtworkSliderCard from "./ArtworkSliderCard.vue";
import ArtworkSliderCardSkeleton from "./ArtworkSliderCardSkeleton.vue";
import { ArtworkTypes } from "src/api.handlers/creatorStudio/creatorStudio5Page/CreatorStudio5ApiHandler";

// Component constants.
const SLIDER_PREFIX = "slide";

export default {
    name: "TopRecommendedArtworkSlider",
    components: {
        ArtworkSliderCard,
        ArtworkSliderCardSkeleton,
    },
    props: {
        isComic: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isLoading: true,
            selectedSlide: null,
            currentSlideIndex: 1,
            maxSlide: 0,
            autoSlideIntervalId: null,
            /**
             * @type {TopRecommendedArtworkResponse[]} The type of this array.
             */
            displayArtworks: [],
        };
    },
    computed: {
        sliderPrefix() {
            return SLIDER_PREFIX;
        },
    },
    async mounted() {
        const artworkType = this.isComic
            ? ArtworkTypes.COMIC
            : ArtworkTypes.ANIMATION;

        const result = await TopRecommendedArtworkApiHandler.getAsync(
            artworkType
        );

        if (!result.isSuccess) {
            return;
        }

        // Set related state for the slider.
        this.displayArtworks = result.responseBody;
        this.maxSlide = this.displayArtworks.length;

        this.setSelectedSlide();
        this.setUpAutoSlide();

        // Turn off the isLoading flag to display content.
        this.isLoading = false;
    },
    methods: {
        /**
         * Set up for the slider to automatically slide to
         * the next content for each 5 seconds.
         */
        setUpAutoSlide() {
            const GO_TO_NEXT_SLIDE_TIMEOUT = 5000; // 5 seconds.

            this.autoSlideIntervalId = setInterval(() => {
                this.toNext();
            }, GO_TO_NEXT_SLIDE_TIMEOUT);
        },
        stopAutoSlide() {
            // Clear the current interval to stop auto slide.
            clearInterval(this.autoSlideIntervalId);

            this.autoSlideIntervalId = null;
        },
        /**
         * Set the selected slide that corresponding
         * to the current slide index.
         */
        setSelectedSlide() {
            this.selectedSlide = `${SLIDER_PREFIX}_${this.currentSlideIndex}`;
        },
        toNext() {
            // Increase the slide index by 1 and update related state.
            this.currentSlideIndex++;

            if (this.currentSlideIndex > this.maxSlide) {
                this.currentSlideIndex = 1;
            }

            this.setSelectedSlide();
        },
        toPrevious() {
            // Decrease the slide index by 1 and update related state.
            this.currentSlideIndex--;

            if (this.currentSlideIndex <= 0) {
                this.currentSlideIndex = this.maxSlide;
            }

            this.setSelectedSlide();
        },
        /**
         * Go to the specified slide by the input slide index.
         * @param {Number} slideIndex The index of the slide that used base 1.
         */
        goToSlide(slideIndex) {
            console.log(slideIndex);

            const isSameSlide = slideIndex == this.currentSlideIndex;

            if (isSameSlide) {
                return;
            }

            // Set the current slide index and update related state.
            this.currentSlideIndex = slideIndex;
            this.setSelectedSlide();
        },
        holdCurrentSlide() {
            this.stopAutoSlide();
        },
        continueAutoSlide() {
            this.setUpAutoSlide();
        },
    },
};
</script>

<style>
.slider-button {
    position: absolute;
    z-index: 100 !important;
    top: 0 !important;
    bottom: 0 !important;
    display: flex !important;
    align-items: center !important;
}

.left-slider-button {
    transform: rotate(180deg);
}

.slider-indicator {
    position: absolute !important;
    z-index: 100 !important;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
}

.slider-artwork-card-skeleton {
    background-color: rgba(4, 2, 2, 0.468) !important;
}

.slider-artwork-card {
    --padding-width: 64px;

    background-color: rgba(0, 0, 0, 0.64) !important;
    padding-left: var(--padding-width) !important;
    padding-right: var(--padding-width) !important;
}

.slider-artwork-image {
    --max-width: 220px;
    --ratio: 0.778;
    --height: calc(var(--max-width) / var(--ratio));

    width: var(--max-width);
    height: var(--height);
}

.card-play-button {
    padding: 4px 4px !important;
    border-radius: 100% !important;
    display: flex;
    align-items: center;
}
</style>
