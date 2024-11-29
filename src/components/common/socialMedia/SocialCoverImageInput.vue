<template>

    <section class="coverImage-Input relative-position">
        <div class="invalid-file-extension-chip text-center" v-show="isInvalid">
            <q-chip icon="info" class="q-mt-sm" clickable @click="isInvalid = false">
                {{ invalidMessage }}
            </q-chip>
        </div>
        <section class="display-area flex items-center justify-center" :class="{ error: hasError }"
            style="height: 29rem;">
            <img src="../../../assets/placeholder/1000x350.png"
                style="position: absolute;width: 100%; height: 100%; z-index: 0;">
            <div v-if="!hasImage" class="flex column items-center text-weight-bold" style="z-index: 1;">
                <label for="coverImage" class="flex">
                    <q-badge class="q-py-xs text-subtitle1 upload-button flex items-center">
                        <span class="q-pr-xs">Tải ảnh</span>
                        <q-icon name="image" size="xs" />
                    </q-badge>
                </label>
            </div>
            <input required hidden type="file" name="coverImage" id="coverImage"
                accept="image/png, image/jpeg, image/jpg" @input="onInputImage" ref="coverImageInput" />
            <label for="coverImage" v-if="hasImage" class="upload-image" style="height: 100%; width: 100%">
                <q-img v-if="hasImage" :src="imageSrc" loading="lazy" spinner-color="white" ratio="0.778" width="100%"
                    height="100%" />
            </label>
            <span v-if="hasImage && !isEditGroupImage" class="remove-image-button" @click="clearImage">
                <q-icon name="close" size="sm" />
            </span>
        </section>
    </section>
</template>

<script>
import { FileHelper } from "src/helpers/FileHelper";
const inputName = "coverImage";
const invalidFormatMessage = "Yêu cầu định dạng PNG, JPG, JPEG";
const invalidFileSizeMessage = "File ảnh kích thước tối đa 2MB";

export default {
    props: {
        modelValue: {
            required: true,
        },
        presetImageSrc: {
            type: String,
        },
        isEditGroupImage: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            coverImageInput: null,
            imageFile: null,
            imageSrc: null,
            hasImage: false,
            hasError: false,
            isInvalid: false,
            invalidMessage: null,
        };
    },
    mounted() {
        this.coverImageInput = this.$refs.coverImageInput;

        // Pre-load the image src if it is specified.
        if (this.presetImageSrc) {
            this.imageSrc = this.presetImageSrc;
            this.hasImage = true;
        }

        // Emit the verifyInput event contains this instance for later validation callback.
        this.$emit("verifyInput", this);
        if (this.isEditGroupImage)
            this.$refs.coverImageInput.click()
    },
    emits: ["update:modelValue", "verifyInput", "hasChange"],
    methods: {
        /**
         * @param {Event} event The event instance.
         */
        onInputImage(event) {
            const uploadImageFile = event.target.files[0];

            if (!uploadImageFile || event.target.value === '') {
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
        clearImage() {
            URL.revokeObjectURL(this.imageSrc);
            this.imageFile = null;
            this.imageSrc = null;
            this.hasImage = false;

            // This line of code will let user to select
            // again the same file when they clear the image.
            // Reference: https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
            this.coverImageInput.value = null;
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
        isEditGroupImage() {
            if (this.isEditGroupImage === 0) {
                uploadImageFile = null;
                return;
            }

        }
    },
};
</script>

<style scoped>
.coverImage-Input,
.upload-button,
.upload-image,
.remove-image-button {
    --ratio: 0.778;
    --max-width: 100%;
    --primary-700: #53bf94;
    --light-500: #dddddd;
    --dark: #120e36;
    --secondary-700: #dc5834;
    --border-radius: 6.4px;
}

.invalid-file-extension-chip {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
}

.coverImage-Input {
    max-width: var(--max-width);
}

.coverImage-Input .display-area {
    position: relative;
    max-width: 100%;
    height: 350px;
    border: 2px 2px 0 0 solid var(--light-500);
    /* border-radius: var(--border-radius); */
}

.error {
    color: var(--secondary-700);
    font-weight: bold;
}

.coverImage-Input .display-area.error {
    border-color: var(--secondary-700);
}

.coverImage-Input .display-area .upload-button.q-badge {
    background-color: #53bf94;
    color: var(--dark);
}

.upload-image {
    border-radius: var(--border-radius) var(--border-radius) 0 0 !important;
    overflow: hidden;
}

.upload-image:hover,
.upload-button:hover {
    cursor: pointer;
}

.remove-image-button .q-icon {
    padding: 4px 8px;
    background-color: var(--secondary-700);
    border-radius: 0 4px 0 4px;
    position: absolute;
    top: 0;
    right: 0;
}

.remove-image-button:hover {
    cursor: pointer;
}
</style>
