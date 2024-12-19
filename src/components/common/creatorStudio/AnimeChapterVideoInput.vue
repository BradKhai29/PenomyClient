<template>
    <section class="col-grow">
        <div class="flex items-center justify-between q-mb-sm">
            <div class="flex items-center text-subtitle2 text-weight-bold">
                <span class="q-mr-sm"> Tải video </span>
                <label
                    :for="videoInputComponentId"
                    class="upload-video-trigger flex items-center q-px-sm q-py-xs bg-dark text-light border-radius-sm"
                >
                    <span class="q-mr-xs"> Tải video </span>
                    <q-icon name="upload" size="xs" />
                </label>

                <div
                    v-show="hasVideoFile || hasPresetVideoSrc"
                    class="flex items-center"
                >
                    <span
                        @click="showDialog = true"
                        class="q-ml-sm upload-video-trigger flex items-center q-px-sm q-py-xs bg-dark text-light border-radius-sm"
                    >
                        <span class="q-mr-xs"> Xem trước</span>
                        <q-icon name="visibility" size="xs" />
                    </span>

                    <span
                        @click="clearInput"
                        class="q-ml-sm upload-video-trigger flex items-center q-px-sm q-py-xs bg-secondary-900 text-light border-radius-sm"
                    >
                        <span class="q-mr-xs"> Xóa</span>
                        <q-icon name="delete" size="xs" />
                    </span>
                </div>
            </div>

            <div class="video-size-section">
                ({{ videoSizeShort }} / {{ maxVideoSize }}GB)
            </div>
        </div>

        <!-- Hidden input -->
        <input
            type="file"
            :id="videoInputComponentId"
            :ref="videoInputComponentId"
            accept="video/*"
            hidden
        />

        <div class="border-radius-sm border-sm-dark-500-dashed">
            <label
                :for="videoInputComponentId"
                class="upload-video-trigger flex items-center justify-center q-py-lg"
            >
                <div class="text-center text-dark-500 upload-video-container">
                    <div
                        class="relative-position"
                        style="display: inline-block"
                    >
                        <q-icon
                            name="movie"
                            size="100px"
                            :class="
                                hasVideoFile || hasPresetVideoSrc
                                    ? 'text-primary'
                                    : ''
                            "
                        />
                        <q-badge
                            v-show="hasVideoFile || hasPresetVideoSrc"
                            rounded
                            floating
                            class="bg-dark text-light text-weight-bold"
                            style="top: 8px"
                        >
                            1
                        </q-badge>
                    </div>
                    <div class="q-mt-sm text-subtitle1">
                        <span v-if="!hasVideoFile && !hasPresetVideoSrc">
                            Lưu ý: Hệ thống hỗ trợ kích thước tối đa của file
                            tải lên là 1GB
                        </span>
                        <span v-else>
                            Kích thước file hiện tại: ({{ videoSizeShort }} /
                            {{ maxVideoSize }}GB)
                        </span>
                    </div>
                </div>
            </label>
        </div>
        <section
            v-show="showDialog"
            class="preview-video-section flex justify-center"
        >
            <div class="preview-container">
                <VideoPlayer :videoUrl="videoSrc" class="border-radius-sm" />
                <q-btn
                    @click="showDialog = false"
                    class="absolute"
                    style="right: 0; top: 0"
                    color="negative"
                >
                    <q-icon name="close" />
                </q-btn>
            </div>
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { FileHelper } from "src/helpers/FileHelper";
import { NotificationHelper } from "src/helpers/NotificationHelper";
import { NumberHelper } from "src/helpers/NumberHelper";

// Import components section.
import VideoPlayer from "./VideoPlayer.vue";

// Support component constants.
const MAX_UPLOADED_VIDEO_SIZE = 1 * 1024 * 1024 * 1024; // 1GB

export default {
    name: "AnimeChapterVideoInput",
    emits: ["update:modelValue", "verifyInput", "hasChange"],
    components: {
        VideoPlayer,
    },
    props: {
        modelValue: {
            required: true,
        },
        presetVideoSrc: {
            type: String,
        },
        presetVideoSize: {
            default: 0,
        },
    },
    computed: {
        videoInputComponentId() {
            return "chapter_video_input";
        },
        hasVideoFile() {
            return this.videoFile != null;
        },
        hasPresetVideoSrc() {
            return this.presetVideoSrc != null;
        },
        videoSize() {
            if (this.hasVideoFile) {
                return this.videoFile.size;
            }

            return this.presetVideoSize;
        },
        videoSizeShort() {
            return NumberHelper.formatNumberShort(this.videoSize);
        },
    },
    beforeMount() {
        if (this.presetVideoSrc) {
            this.videoSrc = this.presetVideoSrc;
        }
    },
    mounted() {
        this.videoInput = this.$refs[this.videoInputComponentId];
        this.videoInput.addEventListener("input", this.handleOnInput);
    },
    data() {
        return {
            showDialog: false,
            maxVideoSize: 1, // 1GB
            /**
             * @type {HTMLInputElement} The input element to track when uploading the file.
             */
            videoInput: null,
            /**
             * @type {File} The video file uploaded by the user.
             */
            videoFile: null,
            videoSrc: null,
            hasError: false,
            isInvalid: false,
        };
    },
    methods: {
        /**
         * @param {Event} event The event instance.
         */
        handleOnInput(event) {
            const uploadVideoFile = FileHelper.asFile(event.target.files[0]);

            if (!uploadVideoFile) {
                return;
            }

            if (!FileHelper.isVideoFile(uploadVideoFile)) {
                NotificationHelper.notifyError(
                    "Vui lòng tải lên file video định dạng mp4, mkv"
                );

                return;
            }

            // Check the file size before uploading.
            const isExceedMaxVideoSize =
                uploadVideoFile.size > MAX_UPLOADED_VIDEO_SIZE;

            if (isExceedMaxVideoSize) {
                NotificationHelper.notifyError("File tải lên vượt quá 1GB");

                return;
            }

            this.videoFile = uploadVideoFile;
            this.videoSrc = URL.createObjectURL(uploadVideoFile);
            this.isInvalid = false;
        },
        clearInput() {
            URL.revokeObjectURL(this.videoSrc);
            this.videoFile = null;
            this.videoSrc = null;

            // This line of code will let user to select
            // again the same file when they clear the input.
            // Reference: https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
            this.videoInput.value = null;
        },
        emitImageUpdateEvent() {
            // Emit the event(update:modelValue) to update the image file.
            this.$emit("update:modelValue", this.videoFile);
            this.$emit("hasChange", this.videoInputComponentId, true);

            this.verifyInput();
        },
        verifyInput() {
            // If image is empty (false), then has error is true.
            this.hasError = !this.hasVideoFile;

            // If has error is true, then return false.
            return this.hasVideoFile;
        },
    },
    watch: {
        videoFile() {
            this.emitImageUpdateEvent();
        },
    },
};
</script>

<style scoped>
.upload-video-trigger {
    cursor: pointer;
}

.preview-video-section {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(34, 34, 34, 0.88);
}

.preview-video-section .preview-container {
    position: relative;
    height: 100%;
    width: fit-content;
    max-width: 100%;
    margin-top: 40px;
}
</style>
