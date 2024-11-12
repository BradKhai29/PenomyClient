<template>
    <section
        id="top-recommended-artwork-slider"
        class="shadow-1 border-radius-md row relative-position"
    >
        <!-- Slider Buttons section -->
        <q-btn
            @click="toPrevious"
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
            unelevated
            flat
            class="slider-button"
            style="right: 0"
        >
            <q-icon name="chevron_right" size="md" class="text-light" />
        </q-btn>
        <!-- Slider Buttons section -->

        <!-- Slider Indicator section -->
        <div
            class="absolute q-mb-lg"
            style="
                bottom: 0;
                z-index: 100;
                left: 50%;
                transform: translate(-50%, 0);
            "
        >
            <q-btn
                v-for="i in maxSlide"
                :key="i"
                dense
                padding="none"
                icon="circle"
                size="xs"
                class="q-mx-xs"
                :class="i == currentSlide ? 'text-primary' : 'text-light'"
            />
        </div>
        <!-- Slider Indicator section -->

        <q-tab-panels v-model="selectedTab" animated class="col-grow">
            <q-tab-panel
                v-for="i in 5"
                :key="i"
                :name="`artwork_${i}`"
                class="q-pa-none row"
            >
                <div class="slider-card-wrapper" :style="sliderCardStyle">
                    <div class="q-py-lg q-px-xl row slider-artwork-card">
                        <div class="col-9 column">
                            <div
                                class="artwork-title flex items-center q-mb-md"
                            >
                                <q-btn
                                    no-caps
                                    padding="none"
                                    class="text-h5 text-light q-mr-sm text-weight-bold"
                                >
                                    My Hero Academy ({{ i }})
                                </q-btn>
                                <span
                                    class="text-primary text-weight-bold q-px-xs border-md-primary border-radius-sm text-subtitle2"
                                >
                                    {{ artworkType }}
                                </span>
                            </div>
                            <div class="artwork-chapters flex items-center">
                                <span class="text-subtitle1 text-light">
                                    <span class="text-weight-bold"
                                        >Số tập:</span
                                    >
                                    <span class="q-ml-xs">12/12</span>
                                </span>
                                <span
                                    class="border-sm-light q-mx-sm"
                                    style="padding: 6.4px 0px"
                                ></span>
                                <q-btn
                                    to="/"
                                    no-caps
                                    padding="none"
                                    flat
                                    class="text-subtitle1 text-light q-mr-sm"
                                >
                                    <span class="text-weight-bold"
                                        >Tập 14:</span
                                    >
                                    <span class="q-ml-xs"
                                        >Sự kiện ở thành phố A</span
                                    >
                                </q-btn>
                            </div>
                            <div
                                class="artwork-categories q-mt-xs q-mb-md flex items-center q-gutter-sm"
                            >
                                <span
                                    class="bg-primary text-dark flex items-center q-py-xs q-px-sm border-radius-sm"
                                >
                                    <q-icon name="star" size="xs" />
                                    <span
                                        class="text-subtitle2 q-ml-xs text-weight-bold"
                                    >
                                        4.8
                                    </span>
                                </span>
                                <span
                                    v-for="i in maxSlide"
                                    :key="i"
                                    class="bg-light-100 text-dark flex items-center q-pa-xs border-radius-sm"
                                >
                                    <span
                                        class="text-subtitle2 q-ml-xs text-weight-bold"
                                    >
                                        category {{ i }}
                                    </span>
                                </span>
                            </div>
                            <p class="text-subtitle2 text-light q-mb-none">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Quaerat, officiis! Ratione
                                quibusdam, sint consectetur ducimus repudiandae
                                recusandae totam illo iure, dolores fugit
                                corporis nobis. Laborum adipisci magnam sed
                                aliquam! Quod? Lorem ipsum dolor sit amet
                                consectetur, adipisicing elit. Commodi officia,
                                sint quasi vel impedit illo dolore soluta nisi
                                deleniti sunt ullam magni quae quod et vero
                                voluptate assumenda architecto minus?
                            </p>
                            <div class="flex items-center q-mt-auto">
                                <q-btn
                                    to="/"
                                    no-caps
                                    class="bg-primary text-dark q-pa-sm border-radius-sm"
                                >
                                    <span class="bg-dark play-button">
                                        <q-icon
                                            name="play_arrow"
                                            size="xs"
                                            class="text-primary"
                                        />
                                    </span>
                                    <span
                                        class="text-subtitle1 text-weight-bold q-ml-xs"
                                    >
                                        Xem ngay ({{ i }})
                                    </span>
                                </q-btn>
                            </div>
                        </div>
                        <div class="q-ml-auto col-auto">
                            <q-img
                                :src="mockUrl"
                                class="border-radius-sm slider-artwork-image"
                            />
                        </div>
                    </div>
                </div>
            </q-tab-panel>
        </q-tab-panels>
    </section>
</template>

<script>
export default {
    name: "TopRecommendedArtworkSlider",
    props: {
        isComic: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            selectedTab: "artwork_1",
            currentSlide: 1,
            maxSlide: 5,
        };
    },
    computed: {
        artworkType() {
            if (this.isComic) {
                return "Truyện tranh";
            }

            return "Hoạt hình";
        },
        mockUrl() {
            return "https://res.cloudinary.com/dsjsmbdpw/image/upload/v1729903382/comics/9070500101804032/9070500101804032.jpg";
        },
        sliderCardStyle() {
            return {
                background: `url(${this.mockUrl}) no-repeat center`,
                backgroundSize: "100%",
            };
        },
    },
    methods: {
        toNext() {
            this.currentSlide++;
            if (this.currentSlide > this.maxSlide) {
                this.currentSlide = 1;
            }

            this.selectedTab = `artwork_${this.currentSlide}`;
        },
        toPrevious() {
            this.currentSlide--;
            if (this.currentSlide <= 0) {
                this.currentSlide = this.maxSlide;
            }

            this.selectedTab = `artwork_${this.currentSlide}`;
        },
    },
};
</script>

<style scoped>
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

.play-button {
    padding: 4px 4px !important;
    border-radius: 100% !important;
    display: flex;
    align-items: center;
}

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
</style>
