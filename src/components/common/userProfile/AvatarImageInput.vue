<template>
    <section class="thumbnail-input relative-position">
        <section class="flex justify-center">
            <input
                hidden
                type="file"
                name="artworkThumbnail"
                id="artworkThumbnail"
                accept="image/png, image/jpeg, image/jpg"
                @input="onInputImage"
                ref="thumbnailInput"
            />
            <label
                for="artworkThumbnail"
                v-if="hasImage"
                class="flex justify-center"
                style="height: 100%; width: 100%"
            >
                <q-avatar class="user_avatar shadow-2 relative-position">
                    <q-img
                        :src="imageSrc"
                        loading="lazy"
                        spinner-color="white"
                        ratio="0.778"
                        width="100%"
                        height="100%"
                    />

                    <q-btn
                        @click="resetBackAvatar"
                        round
                        dense
                        padding="sm"
                        class="q-mr-md absolute-bottom-right bg-primary text-dark"
                    >
                        <q-icon name="restore" />

                        <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            class="bg-dark text-light"
                            :offset="[8, 8]"
                        >
                            <strong class="text-subtitle2"
                                >Quay lại ảnh gốc</strong
                            >
                        </q-tooltip>
                    </q-btn>
                </q-avatar>
            </label>
        </section>
    </section>
</template>

<script>
import { FileHelper } from "src/helpers/FileHelper";
const inputName = "thumbnail";
const invalidFormatMessage = "Yêu cầu định dạng PNG, JPG, JPEG";
const invalidFileSizeMessage = "File ảnh kích thước tối đa 2MB";

export default {
    name: "AvatarImageInput",
    props: {
        modelValue: {
            required: true,
        },
        presetImageSrc: {
            type: String,
        },
    },
    data() {
        return {
            thumbnailInput: null,
            imageFile: null,
            imageSrc: null,
            hasImage: false,
            hasError: false,
            isInvalid: false,
            invalidMessage: null,
        };
    },
    mounted() {
        this.thumbnailInput = this.$refs.thumbnailInput;

        // Pre-load the image src if it is specified.
        if (this.presetImageSrc) {
            this.imageSrc = this.presetImageSrc;
            this.hasImage = true;
        }

        // Emit the verifyInput event contains this instance for later validation callback.
        this.$emit("verifyInput", this);
    },
    emits: ["update:modelValue", "verifyInput", "hasChange"],
    methods: {
        /**
         * @param {Event} event The event instance.
         */
        onInputImage(event) {
            const uploadImageFile = event.target.files[0];

            if (!uploadImageFile) {
                return;
            }

            // Check if the upload file is image file or not.
            if (!FileHelper.isImageFile(uploadImageFile)) {
                this.isInvalid = true;
                this.invalidMessage = invalidFormatMessage;

                return;
            }

            // Check if the uploaded image file exceed the maximum size or not.
            if (FileHelper.isImageFileExceedMaximumSize(uploadImageFile)) {
                this.isInvalid = true;
                this.invalidMessage = invalidFileSizeMessage;

                return;
            }

            // Preview the upload image file to the user.
            this.imageSrc = URL.createObjectURL(uploadImageFile);
            this.imageFile = uploadImageFile;
            this.hasImage = true;
            this.isInvalid = false;
        },
        resetBackAvatar() {
            URL.revokeObjectURL(this.imageSrc);
            this.imageFile = null;
            this.imageSrc = this.presetImageSrc;

            // This line of code will let user to select
            // again the same file when they clear the image.
            // Reference: https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
            this.thumbnailInput.value = null;
        },
        emitImageUpdateEvent() {
            // Emit the event(update:modelValue) to update the image file.
            this.$emit("update:modelValue", this.imageFile);
            this.$emit("hasChange", inputName, true);

            this.verifyInput();
        },
        verifyInput() {
            // If image is empty (false), then has error is true.
            this.hasError = !this.hasImage;

            // If has error is true, then return false.
            return !this.hasError;
        },
    },
    watch: {
        imageFile() {
            this.emitImageUpdateEvent();
        },
    },
};
</script>

<style scoped>
.user_avatar {
    --width: 200px;
    --height: var(--width);

    width: var(--width) !important;
    height: var(--height) !important;
}

.user_avatar:hover {
    cursor: pointer;
}
</style>


