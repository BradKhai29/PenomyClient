<template>
    <section
        id="chapter-video-player-container"
        class="chapter-video-container bg-dark-900"
        :class="videoContainerScreenModeClass"
        ref="videoPlayerContainer"
    >
        <section
            id="timeline-and-video-controls-button-group"
            :class="showControlButtons ? '' : 'hide'"
        >
            <div class="video-timeline-container q-px-sm">
                <div class="video-timeline" ref="video-timeline">
                    <span class="thumb-indicator"></span>
                    <span
                        class="target-timeline-tooltip"
                        style="transform: translateX(-50%)"
                        :style="targetTimelineStyle"
                    >
                        {{ displayTargetTimeLine }}
                    </span>
                </div>
            </div>
            <div
                class="flex items-center justify-between video-player-button-group q-pa-sm"
            >
                <div id="left-button-group" class="flex items-center">
                    <q-btn
                        @click="togglePlayPauseVideo"
                        id="play-button"
                        flat
                        unelevated
                        padding="xs"
                        class="control-button"
                    >
                        <q-icon :name="isVideoPlay ? 'pause' : 'play_arrow'" />
                        <!-- Support tooltip -->
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                {{ isVideoPlay ? "Tạm dừng" : "Tiếp tục" }}
                            </strong>
                        </q-tooltip>
                    </q-btn>
                    <q-btn
                        id="next-chapter-button"
                        flat
                        unelevated
                        padding="xs"
                        class="control-button"
                    >
                        <q-icon name="skip_next" />

                        <!-- Support tooltip -->
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                Tập tiếp theo
                            </strong>
                        </q-tooltip>
                    </q-btn>

                    <div
                        id="volume-button-section"
                        class="flex items-center relative-position"
                    >
                        <q-btn
                            @click="toggleVolume"
                            id="volume-button"
                            flat
                            unelevated
                            padding="xs"
                            class="control-button flex items-center"
                        >
                            <q-icon :name="volumeIcon" />

                            <!-- Support tooltip -->
                            <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="tooltipOffset"
                            >
                                <strong class="text-subtitle2">
                                    Âm lượng
                                </strong>
                            </q-tooltip>
                        </q-btn>

                        <q-slider
                            v-model="volumeLevel"
                            :min="0"
                            :max="maxVolumeLevel"
                            color="primary"
                            track-color="light"
                            class="absolute"
                            style="margin-left: 36px; left: 0"
                        />
                    </div>
                </div>
                <div id="middle-button-group flex items-center">
                    <div
                        class="bg-dark-900 q-px-sm q-py-xs border-radius-sm text-weight-bold text-subtitle2 text-light"
                    >
                        <span class="text-primary">
                            {{ currentTime }}
                        </span>
                        <span class="q-mx-xs">/</span>
                        <span>{{ totalDuration }}</span>
                    </div>
                </div>
                <div id="right-button-group">
                    <q-btn
                        id="settings-button"
                        flat
                        unelevated
                        padding="xs"
                        class="control-button"
                    >
                        <q-icon name="settings" />

                        <q-menu
                            :offset="tooltipOffset"
                            anchor="top middle"
                            self="bottom middle"
                            class="bg-dark-900 shadow-1 text-light"
                            style="opacity: 0.8"
                        >
                            <q-item dense class="q-py-sm">
                                <q-item-section class="text-weight-bold">
                                    Tốc độ phát
                                </q-item-section>
                            </q-item>
                            <q-item
                                @click="setPlaySpeed(speed)"
                                clickable
                                dense
                                v-for="speed in playSpeeds"
                                :key="speed"
                            >
                                <q-item-section
                                    :class="
                                        speed == playSpeed
                                            ? 'text-weight-bold text-primary'
                                            : ''
                                    "
                                >
                                    {{ speed == 1 ? "Chuẩn" : speed }}
                                </q-item-section>
                            </q-item>
                        </q-menu>
                    </q-btn>

                    <q-btn
                        v-show="!isFullScreen"
                        @click="toggleExpanded"
                        id="width-full-button"
                        flat
                        unelevated
                        padding="xs"
                        class="control-button"
                    >
                        <q-icon
                            :name="isExpanded ? 'panorama' : 'width_wide'"
                        />

                        <!-- Support tooltip -->
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                {{ isExpanded ? "Thu gọn" : "Mở rộng" }}
                            </strong>
                        </q-tooltip>
                    </q-btn>

                    <q-btn
                        @click="toggleFullScreen"
                        id="fullscreen-button"
                        flat
                        unelevated
                        padding="xs"
                        class="control-button"
                    >
                        <q-icon
                            :name="
                                isFullScreen ? 'fullscreen_exit' : 'fullscreen'
                            "
                        />

                        <!-- Support tooltip -->
                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="tooltipOffset"
                        >
                            <strong class="text-subtitle2">
                                {{ isFullScreen ? "Thu nhỏ" : "Toàn màn hình" }}
                            </strong>
                        </q-tooltip>
                    </q-btn>
                </div>
            </div>
        </section>
        <div
            :class="videoContainerScreenModeClass"
            class="flex"
            style="height: fit-content"
        >
            <video
                @click="togglePlayPauseVideo"
                :src="videoUrl"
                ref="videoPlayer"
            />
        </div>
    </section>
</template>

<script>
// Import components section.
import { NumberHelper } from "src/helpers/NumberHelper";
import { AnimeChapterDetailResponseDto } from "src/api.models/artwork/artwork6Page/AnimeChapterDetailResponseDto";

// Component support constants.
const PREVIEW_TIMELINE_OFFSET_PROPERTY = "--preview-timeline-offset";
const CURRENT_TIMELINE_OFFSET_PROPERTY = "--current-timeline-offset";
const SPACEBAR_KEY = " ";

export default {
    name: "ChapterVideoPlayer",
    emits: ["expanded"],
    props: {
        chapterDetail: {
            type: AnimeChapterDetailResponseDto,
            required: true,
        },
    },
    data() {
        return {
            isExpanded: false,
            isFullScreen: false,
            showControlButtons: false,
            isVideoPlay: false,
            isVolumeOn: true,
            volumeLevel: 64,
            lastVolumeLevel: 64,
            currentTime: 0,
            totalDuration: 0,
            playSpeed: 1,
            /**
             * @type {HTMLVideoElement} The video element to track.
             */
            videoPlayer: null,
            /**
             * @type {HTMLElement} The video container element to track.
             */
            videoPlayerContainer: null,
            /**
             * @type {HTMLDivElement} Keep track this element to interact with video timeline.
             */
            videoTimeLineBar: null,
            targetTimeLine: 0,
            displayTargetTimeLine: 0,
            targetTimelineStyle: {
                left: "0px",
            },
        };
    },
    computed: {
        videoUrl() {
            return this.chapterDetail.videoUrl;
        },
        expandedModeClass() {
            return "expanded";
        },
        fullScreenModeClass() {
            return "full-screen";
        },
        videoContainerScreenModeClass() {
            if (this.isFullScreen) {
                return this.fullScreenModeClass;
            } else if (this.isExpanded) {
                return this.expandedModeClass;
            }

            return "";
        },
        volumeIcon() {
            if (this.volumeLevel == 0) {
                return "volume_off";
            }

            if (this.volumeLevel <= 60) {
                return "volume_down";
            }

            return "volume_up";
        },
        playSpeeds() {
            return [0.5, 0.75, 1, 1.5, 2];
        },
        tooltipOffset() {
            return [8, 8];
        },
        maxVolumeLevel() {
            return 100;
        },
    },
    mounted() {
        // Binding the related components from template.
        this.videoPlayer = this.$refs.videoPlayer;
        this.videoPlayerContainer = this.$refs.videoPlayerContainer;
        this.videoTimeLineBar = this.$refs["video-timeline"];

        this.setUpVideoPlayer();
        this.setUpVideoTimeLineBar();
        this.setUpDocument();
    },
    methods: {
        setUpVideoPlayer() {
            // Add event listener to the video player to display the current time.
            this.videoPlayer.addEventListener("loadeddata", this.showDuration);
            this.videoPlayer.addEventListener(
                "timeupdate",
                this.handleOnVideoTimeUpdate
            );
        },
        setUpVideoTimeLineBar() {
            // Add event listener to the video timeline element for later interaction.
            this.videoTimeLineBar.addEventListener(
                "mousemove",
                this.handleOnHoverTimeLine
            );

            this.videoTimeLineBar.addEventListener(
                "mouseleave",
                this.handleOnLeaveTimeLine
            );

            this.videoTimeLineBar.addEventListener(
                "click",
                this.moveToSpecificTimeLine
            );
        },
        setUpDocument() {
            // Set up keydown event-listener for key-shortcuts.
            document.addEventListener("keydown", this.listenUserKeyDown);
            document.addEventListener(
                "fullscreenchange",
                this.handleOnFullScreenChange
            );
        },
        /**
         * @param {KeyboardEvent} keyboardEventEvent Tracking the keyboard event to trigger correct action.
         */
        listenUserKeyDown(keyboardEventEvent) {
            const pressKey = keyboardEventEvent.key.toLocaleLowerCase();

            switch (pressKey) {
                case SPACEBAR_KEY:
                    this.togglePlayPauseVideo();
                    break;
            }
        },
        handleOnFullScreenChange() {
            this.isFullScreen = document.fullscreenElement != null;
        },
        handleOnVideoTimeUpdate() {
            this.showCurrentTime();

            this.showCurrentTimeLineBar();
        },
        showFullScreen() {
            // Check what method is available to invoke.
            if (this.videoPlayerContainer.requestFullscreen) {
                this.videoPlayerContainer.requestFullscreen();
            } else if (this.videoPlayerContainer.webkitRequestFullScreen) {
                this.videoPlayerContainer.webkitRequestFullScreen();
            } else if (this.videoPlayerContainer.mozRequestFullScreen) {
                this.videoPlayerContainer.mozRequestFullScreen();
            }
        },
        showDuration() {
            this.totalDuration = this.formatTotalDuration();
            this.currentTime = this.formatCurrentDuration();
        },
        showCurrentTime() {
            this.currentTime = this.formatCurrentDuration();
        },
        showCurrentTimeLineBar() {
            const timePercentage =
                this.videoPlayer.currentTime / this.videoPlayer.duration;

            this.videoTimeLineBar.style.setProperty(
                CURRENT_TIMELINE_OFFSET_PROPERTY,
                timePercentage
            );
        },
        formatCurrentDuration() {
            if (this.videoPlayer) {
                return NumberHelper.formatDuration(
                    this.videoPlayer.currentTime
                );
            }

            return "0:00";
        },
        formatTotalDuration() {
            if (this.videoPlayer) {
                return NumberHelper.formatDuration(this.videoPlayer.duration);
            }

            return "0:00";
        },
        togglePlayPauseVideo() {
            this.isVideoPlay = !this.isVideoPlay;

            if (this.isVideoPlay) {
                this.videoPlayer.play();
            } else {
                this.videoPlayer.pause();
            }
        },
        toggleVolume() {
            this.isVolumeOn = !this.isVolumeOn;

            if (!this.isVolumeOn) {
                this.lastVolumeLevel = this.volumeLevel;
                this.volumeLevel = 0;
            } else {
                this.volumeLevel = this.lastVolumeLevel;
            }

            this.videoPlayer.muted = !this.isVolumeOn;
        },
        /**
         * @param {Number} speed The new speed value to set to play the video.
         */
        setPlaySpeed(speed) {
            this.playSpeed = speed;
            this.videoPlayer.playbackRate = this.playSpeed;
        },
        toggleExpanded() {
            this.isExpanded = !this.isExpanded;

            this.$emit("expanded", this.isExpanded);
        },
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen;

            if (this.isFullScreen) {
                this.showFullScreen();
            } else {
                this.exitFullScreen();
            }
        },
        exitFullScreen() {
            this.isFullScreen = false;

            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        },
        /**
         * @param {MouseEvent} mouseEvent Use this mouse event to track the user cursor position.
         */
        handleOnHoverTimeLine(mouseEvent) {
            let targetTimeLineOffsetX = mouseEvent.offsetX;
            const RIGHT_OFFSET_X_BOUNDARY = this.videoTimeLineBar.offsetWidth;

            // Set to 0 to prevent negative value when interact with video current time.
            if (targetTimeLineOffsetX < 0) {
                targetTimeLineOffsetX = 0;
            }

            // Display the target timeline.
            if (targetTimeLineOffsetX < RIGHT_OFFSET_X_BOUNDARY - 12) {
                this.targetTimelineStyle.left = `${targetTimeLineOffsetX}px`;
            } else {
                this.targetTimelineStyle.left = `${
                    targetTimeLineOffsetX - 22
                }px`;
            }

            // Calculate the offset percentage to display get the correct target timeline.
            const targetTimeLinePercentage =
                targetTimeLineOffsetX / RIGHT_OFFSET_X_BOUNDARY;

            this.videoTimeLineBar.style.setProperty(
                PREVIEW_TIMELINE_OFFSET_PROPERTY,
                targetTimeLinePercentage
            );

            this.targetTimeLine =
                this.videoPlayer.duration * targetTimeLinePercentage;

            this.displayTargetTimeLine = NumberHelper.formatDuration(
                this.targetTimeLine
            );
        },
        handleOnLeaveTimeLine() {
            this.videoTimeLineBar.style.setProperty(
                PREVIEW_TIMELINE_OFFSET_PROPERTY,
                0
            );
        },
        moveToSpecificTimeLine() {
            this.videoPlayer.currentTime = this.targetTimeLine;
        },
    },
    watch: {
        volumeLevel(newValue, _) {
            this.isVolumeOn = newValue != 0;

            this.videoPlayer.volume = newValue / this.maxVolumeLevel;
        },
    },
};
</script>

<style scoped>
video {
    cursor: pointer;
    max-width: 100% !important;
    height: fit-content !important;
}

.chapter-video-container,
.video-component {
    --max-width: 1064px;
    --max-height: 600px;

    content: "";
    display: flex;
    position: relative;
    justify-content: center;

    width: var(--max-width);
    height: var(--max-height);
    overflow: hidden !important;
}

.chapter-video-container.expanded {
    max-width: 100% !important;
    width: 100% !important;
}

.chapter-video-container.full-screen {
    width: 100% !important;
    height: 100% !important;

    max-width: 100% !important;
    max-height: 100% !important;
}

#timeline-and-video-controls-button-group {
    display: none;
    position: absolute;
    z-index: 100;

    bottom: -1px;
    left: 0;
    right: 0;
    background-color: rgba(78, 78, 78, 0.56) !important;
    transition-delay: 300ms;
    transition-property: display;
}

.chapter-video-container:hover #timeline-and-video-controls-button-group {
    display: block;
}

.video-timeline-container {
    background-color: inherit;

    height: 7.2px;
    display: flex;
    align-items: center;
}

.video-timeline-container:hover .video-timeline {
    height: 100%;
}

.video-timeline {
    --preview-timeline-offset: 0;
    --current-timeline-offset: 0;

    --primary: #53bf94;

    height: 3px;
    width: 100%;
    position: relative;
    cursor: pointer;
    background-color: rgba(124, 124, 124, 0.48) !important;
}

/* Use pseudo ::before element to show the preview-timeline bar for user */
.video-timeline::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: calc(100% - var(--preview-timeline-offset) * 100%);
    background-color: rgba(156, 156, 156, 0.88);
}

/* Use pseudo ::after element to show the current-timeline bar for user */
.video-timeline::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: calc(100% - var(--current-timeline-offset) * 100%);
    background-color: var(--primary);
}

.video-timeline .thumb-indicator {
    --scale: 0;
    --indicator-width: 16px;

    position: absolute;

    width: var(--indicator-width);
    height: 200% !important;
    /* Make the indicator position center vertically */
    top: -50%;
    transform: translateX(-50%) scale(var(--scale));
    left: calc(var(--current-timeline-offset) * 100%);
    border-radius: 50%;

    background-color: var(--primary);
    transition: transform 80ms ease-in-out;
}

.video-timeline-container:hover .thumb-indicator {
    --scale: 1;
}

.video-timeline .target-timeline-tooltip {
    position: absolute;
    top: -40px;

    display: none;
    background-color: rgba(34, 34, 34, 0.88);
    padding: 4px;
    border-radius: 4px;
    color: var(--primary);
    font-size: 16px;
    font-weight: bold;
}

.video-timeline:hover .target-timeline-tooltip {
    display: block;
}

.control-button {
    --light-100: #f9fafc;

    color: var(--light-100);
}

#volume-button-section {
    width: 100px;
}

.metadata-tag {
    display: flex;

    align-items: center;
}

/* Responsive section */
@media screen and (max-width: 1440px) {
    .chapter-video-container {
        --max-width: 888px;
        --max-height: 500px;
    }
}
</style>
