<template>
    <section class="col-grow">
        <div class="image-list-header row justify-between">
            <section class="flex items-center col-grow">
                <span
                    class="text-subtitle2 text-weight-bold q-mr-md"
                    :class="{ 'text-negative': hasError }"
                >
                    <q-icon v-if="hasError" name="report" size="xs" />
                    <span>Danh sách ảnh</span>
                </span>
                <label
                    for="chapterImages"
                    class="bg-dark text-light add-image-btn q-px-md q-mr-sm"
                >
                    <span class="q-mr-xs">Tải ảnh</span>
                    <q-icon name="upload" size="xs" />
                </label>
                <input
                    type="file"
                    id="chapterImages"
                    name="chapterImages"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    hidden
                    @input="onInputImage"
                    ref="chapterImageInput"
                />
                <span
                    class="bg-dark text-light image-list-btn"
                    @click="showDialog = true"
                >
                    <span class="q-mr-xs">Xem trước</span>
                    <q-icon name="tv" size="xs" />
                </span>
            </section>
            <section
                v-if="hasError"
                class="flex items-center justify-end col-auto"
            >
                <span class="text-negative text-weight-bold"
                    >Chưa có ảnh nào</span
                >
            </section>
            <section v-else class="flex items-center justify-end col-auto">
                <span class="q-mr-xs">{{ imageItemList.length }} ảnh</span>
                <span>({{ totalImageSizesRef }}B / 32MB)</span>
            </section>
        </div>
        <section
            id="wrapper_chapter_image_list"
            class="image-list-container q-mt-sm row"
        >
            <section
                v-if="dragging"
                id="wrapper-list-listener"
                @mouseup="onDragEnd"
            ></section>
            <span
                class="add-image-placeholder"
                v-if="imageItemList.length == 0"
            >
            </span>
            <span
                class="add-image-placeholder"
                v-for="imageItem in imageItemList"
                :key="imageItem.id"
            >
            </span>
            <section
                id="chapter-image-list"
                class="image-list-container border-sm-dark border-radius-sm row"
                @mouseup="onDragEnd"
            >
                <label
                    for="chapterImages"
                    id="add-image-btn"
                    class="add-image-placeholder border-sm-dark border-radius-sm"
                    v-if="imageItemList.length == 0"
                >
                    <q-icon name="add" size="sm" />
                </label>
                <div
                    v-for="imageItem in imageItemList"
                    :key="imageItem.id"
                    :id="imageItem.id"
                    class="chapter-image-item border-sm-dark border-radius-sm"
                    @mousedown="onDragStart"
                >
                    <span
                        class="remove-image-button"
                        @mousedown="removeImage(imageItem.id)"
                    >
                        <q-icon name="close" size="xs" />
                    </span>
                    <q-img :src="imageItem.src" width="100%" height="100%">
                        <span
                            class="absolute-bottom text-subtitle2 q-pa-xs image-caption text-light"
                        >
                            ({{ imageItem.position }}) {{ imageItem.imageName }}
                        </span>
                    </q-img>
                </div>
            </section>
        </section>
        <section class="image-list-footer-caption q-mt-sm">
            <div class="text-subtitle2">
                <q-icon name="info" size="xs" />
                <span>
                    Kéo thả các hình ảnh để thay đổi thứ tự. Kích thước tối đa
                    của 1 ảnh là 2MB, nếu kích thước file ảnh trên 2MB hệ thống
                    sẽ tự động giảm chất lượng ảnh hoặc từ chối tải lên.
                </span>
            </div>
        </section>
        <q-dialog
            v-model="showDialog"
            persistent
            :maximized="true"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card>
                <q-bar class="fixed-top bg-dark" style="z-index: 999">
                    <q-space />
                    <q-btn
                        flat
                        icon="close"
                        class="bg-light text-dark"
                        v-close-popup
                    >
                    </q-btn>
                </q-bar>

                <q-card-section class="q-mt-lg">
                    <div class="flex column items-center">
                        <img
                            v-for="imageItem in imageItemList"
                            :key="imageItem.id"
                            :id="imageItem.id"
                            :src="imageItem.src"
                            class="preview-image-item"
                            :alt="imageItem.imageName"
                        />
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </section>
</template>

<script>
import Sortable from "sortablejs";
import { FileHelper } from "src/helpers/FileHelper";
import { StringHelper } from "src/helpers/StringHelper";
import { NumberHelper } from "src/helpers/NumberHelper";
import { ChapterImageItem } from "src/api.models/creatorStudio/creatorStudio9Page/ChapterImageItem";

const invalidFormatMessage = "Yêu cầu định dạng PNG, JPG, JPEG";
const invalidFileSizeMessage = "File ảnh kích thước tối đa 4MB";

export default {
    emits: ["update:modelValue", "verifyInput"],
    props: {
        modelValue: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            showDialog: false,
            dragging: false,
            pendingRemove: false,
            hasError: false,
            /**
             * @type {ChapterImageItem[]} The list of image item to upload.
             */
            imageItemList: [],
            tempItemList: [],
            totalImageSizes: 0,
            maxImageSizes: 32 * 1024 * 1024,
            /**
             * The position will start at base zero.
             */
            imageLastPosition: 0,
            /**
             * @type {HTMLInputElement} The image file input.
             */
            chapterImageInput: null,
            /**
             * @type {HTMLElement} The dragged element to track.
             */
            currentDraggedElement: null,
            isInvalid: true,
            invalidMessage: invalidFormatMessage,
        };
    },
    computed: {
        totalImageSizesRef() {
            return NumberHelper.formatNumberShort(this.totalImageSizes, 2);
        },
    },
    mounted() {
        this.chapterImageInput = this.$refs.chapterImageInput;
        this.$emit("verifyInput", this);

        const chapterImageList = document.querySelector(
            "section#chapter-image-list"
        );

        Sortable.create(chapterImageList, {
            animation: 150,
            ghostClass: "ghost",
            dragClass: "drag",
            easing: "cubic-bezier(1, 0, 0, 1)",
            forceFallback: true,
            removeCloneOnHide: true,
        });
    },
    methods: {
        verifyInput() {
            this.hasError = this.imageItemList.length == 0;

            return this.imageItemList.length > 0;
        },
        removeImage(imageId) {
            // Prevent user to remove the image while dragging.
            if (this.dragging) {
                return;
            }

            // Turn on this flag to prevent user interact with drag-n-drop.
            this.pendingRemove = true;

            const removeItem = this.imageItemList.find(
                (item) => item.id == imageId
            );

            for (
                let i = removeItem.position + 1;
                i < this.imageItemList.length;
                i++
            ) {
                this.imageItemList[i].position--;
            }

            // Reveke the object url to prevent memory leak.
            URL.revokeObjectURL(removeItem.src);
            this.imageLastPosition--;
            this.imageItemList.splice(removeItem.position, 1);
            this.totalImageSizes -= removeItem.imageFile.size;
            this.pendingRemove = false;
        },
        clearList() {
            this.imageLastPosition = 0;
            this.imageItemList.splice(0, this.imageItemList.length);
            this.tempItemList.splice(0, this.tempItemList.length);
        },
        /**
         * Tracking the element that being dragged by the user.
         *
         * @param {MouseEvent} event
         */
        onDragStart(event) {
            this.currentDraggedElement = event.currentTarget;
            this.dragging = true;
        },
        /**
         * Emit the update model value to the parent component.
         * The object to emit will the imageItemList.
         */
        emitUpdateModelValue() {
            this.$emit("update:modelValue", this.imageItemList);
        },
        onDragEnd() {
            this.dragging = false;

            // Prevent drag and drop when the item is removed.
            if (this.pendingRemove) {
                return;
            }

            const draggedElement = this.currentDraggedElement;

            if (draggedElement) {
                let prevElement = draggedElement.previousElementSibling;
                let nextElement = draggedElement.nextElementSibling;

                // The sortablejs will create the clone element of the draggedElement,
                // if the dragged element is moved to the last of the list,
                // the next element will always the clone.
                // Do this will prevent error in handling drag and drop.
                if (nextElement && nextElement.id == draggedElement.id) {
                    nextElement = null;
                }

                // console.log("Previous", prevElement);
                // console.log("Dragged", draggedElement);
                // console.log("Next", nextElement);

                if (prevElement && nextElement) {
                    this.handleDragToMiddle(prevElement, draggedElement);
                } else if (!prevElement && nextElement) {
                    this.handleDragToFirst(draggedElement);
                } else {
                    this.handleDragToLast(draggedElement);
                }

                // After handling the drag-n-drop,
                // emit the model to update the state.
                this.emitUpdateModelValue();
            }
        },
        /**
         * @returns {HTMLElement} element to return.
         */
        asElement(e) {
            return e;
        },
        refillImageItemListWithTempList() {
            // Clear the current image item list to update with the temp list.
            this.imageItemList.splice(0, this.imageItemList.length);
            this.imageItemList = [...this.tempItemList];

            // Clear the temp list after update the image item list.
            this.tempItemList.splice(0, this.tempItemList.length);
        },
        /**
         * Handle drag & drop when the dragged element is move to the middle of the list.
         *
         * @param {HTMLElement} prevElement The previous sibling of the dragged element.
         * @param {HTMLElement} draggedElement The element that is dragged by user.
         */
        handleDragToMiddle(prevElement, draggedElement) {
            // Get the id of the prevElement and draggedElement
            // in the DOM to find their position to handle drag-n-drop.
            const prevElementId = prevElement.id;
            const draggedElementId = draggedElement.id;

            const prevItem = this.imageItemList.find(
                (item) => item.id == prevElementId
            );

            const draggedItem = this.imageItemList.find(
                (item) => item.id == draggedElementId
            );

            // Get the old and the new position of the dragged item.
            let oldPosition = draggedItem.position;
            let newPosition = 0;

            // If the draggedItem's old position is equal to (prevItem's position + 1)
            // then no need to process because the draggedItem is get back to its old position.
            if (oldPosition == prevItem.position + 1) {
                return;
            }

            // If the draggedItem's old position larger than the
            // prevItem position, then draggedItem is moved backward.
            const isMovedBackward = oldPosition > prevItem.position;

            if (isMovedBackward) {
                newPosition = prevItem.position * 1 + 1;
            } else {
                newPosition = prevItem.position;
            }

            // Update the item list after drag.
            if (isMovedBackward) {
                for (let i = 0; i < newPosition; i++) {
                    const imageItem = this.imageItemList[i];
                    this.tempItemList.push(imageItem);
                }

                // Add the draggedItem to its new position.
                this.tempItemList.push(this.imageItemList[oldPosition]);

                // Add the items that positioned after the draggedItem,
                // and increase the position of these items to 1.
                for (let i = newPosition; i < oldPosition; i++) {
                    const imageItem = this.imageItemList[i];
                    imageItem.position++;

                    this.tempItemList.push(imageItem);
                }

                // Skip the draggedItem and add the left items
                // in the list to the temp list.
                for (
                    let i = oldPosition + 1;
                    i < this.imageItemList.length;
                    i++
                ) {
                    const imageItem = this.imageItemList[i];
                    this.tempItemList.push(imageItem);
                }
            }
            // If move forward, then handle differently.
            else {
                for (let i = 0; i < oldPosition; i++) {
                    const imageItem = this.imageItemList[i];

                    this.tempItemList.push(imageItem);
                }

                for (let i = oldPosition + 1; i < newPosition + 1; i++) {
                    const imageItem = this.imageItemList[i];
                    imageItem.position--;

                    this.tempItemList.push(imageItem);
                }

                this.tempItemList.push(this.imageItemList[oldPosition]);

                for (
                    let i = newPosition + 1;
                    i < this.imageItemList.length;
                    i++
                ) {
                    const imageItem = this.imageItemList[i];

                    this.tempItemList.push(imageItem);
                }
            }

            // Set the new position for the draggedItem
            draggedItem.position = newPosition;

            this.refillImageItemListWithTempList();
        },
        /**
         * Handle drag & drop when the dragged element is move to the first of the list.
         *
         * @param {HTMLElement} draggedElement The element that is dragged by user.
         * @param {HTMLElement} nextElement The next element of the dragged element.
         */
        handleDragToFirst(draggedElement) {
            // Get the id of the prevElement and draggedElement
            // in the DOM to find their position to handle drag-n-drop.
            const draggedElementId = draggedElement.id;

            const draggedItem = this.imageItemList.find(
                (item) => item.id == draggedElementId
            );

            // If no item found, then return.
            if (!draggedItem) {
                return;
            }

            const oldPosition = draggedItem.position;
            draggedItem.position = 0; // Move to first then new position is zero.

            // Add the dragged item to the first position of the list.
            this.tempItemList.push(draggedItem);

            // Add the items that positioned before the dragged item to temp list,
            // and increase these items position to 1.
            for (let i = 0; i < oldPosition; i++) {
                const imageItem = this.imageItemList[i];
                imageItem.position++;

                this.tempItemList.push(imageItem);
            }

            for (let i = oldPosition + 1; i < this.imageItemList.length; i++) {
                const imageItem = this.imageItemList[i];

                this.tempItemList.push(imageItem);
            }

            this.refillImageItemListWithTempList();
        },
        /**
         * Handle drag & drop when the dragged element is move to the last of the list.
         *
         * @param {HTMLElement} draggedElement The element that is dragged by user.
         */
        handleDragToLast(draggedElement) {
            // Get the id of the prevElement and draggedElement
            // in the DOM to find their position to handle drag-n-drop.
            const draggedElementId = draggedElement.id;

            const draggedItem = this.imageItemList.find(
                (item) => item.id == draggedElementId
            );

            // If no item found, then return.
            if (!draggedItem) {
                return;
            }

            const oldPosition = draggedItem.position;
            // Move to last then new position is (imageItemList.length - 1).
            const newPosition = this.imageItemList.length - 1;
            draggedItem.position = newPosition;

            for (let i = 0; i < oldPosition; i++) {
                const imageItem = this.imageItemList[i];

                this.tempItemList.push(imageItem);
            }

            // Skip the draggedItem and take from the old position to new position.
            for (let i = oldPosition + 1; i <= newPosition; i++) {
                const imageItem = this.imageItemList[i];
                imageItem.position--;

                this.tempItemList.push(imageItem);
            }

            this.tempItemList.push(draggedItem);

            this.refillImageItemListWithTempList();
        },
        /**
         * @param {InputEvent} event The event instance.
         */
        onInputImage(event) {
            const uploadImageFiles = FileHelper.asFiles(event.target.files);

            if (!uploadImageFiles) {
                return;
            }

            for (const imageFile of uploadImageFiles) {
                if (!FileHelper.isImageFile(imageFile)) {
                    continue;
                }

                // Check if the uploaded image file exceed the maximum size or not.
                if (FileHelper.isImageFileExceedMaximumSize(imageFile)) {
                    this.isInvalid = true;
                    this.invalidMessage = invalidFileSizeMessage;

                    continue;
                }

                const randomString = StringHelper.generateSecureRandomString(6);
                const imageId = `img_${randomString}_${imageFile.lastModified}`;
                const imageName = imageFile.name;
                const imageSrc = URL.createObjectURL(imageFile);
                const imageSize = imageFile.size;

                const imageItem = new ChapterImageItem(
                    imageId,
                    this.imageLastPosition,
                    imageName,
                    imageSrc,
                    imageFile
                );

                this.imageItemList.push(imageItem);
                this.imageLastPosition++;
                this.totalImageSizes += imageSize;
            }

            this.verifyInput();
            // This line of code will let user to select
            // again the same file when they clear the image.
            // Reference: https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
            this.chapterImageInput.value = null;

            // After handling the file upload,
            // emit the model to update the state.
            this.emitUpdateModelValue();
        },
    },
};
</script>

<style scoped>
.image-caption {
    background-color: rgba(0, 0, 0, 0.6);
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ghost {
    opacity: 0;
}

.drag {
    opacity: 1;
}

#wrapper_chapter_image_list {
    position: relative;
}

#wrapper-list-listener {
    position: fixed;
    z-index: 2000;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

#chapter-image-list {
    position: absolute;
    z-index: 2200;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

.remove-image-button {
    --secondary-700: #dc5834;

    padding: 4px;
    background-color: var(--secondary-700);
    border-radius: 0 4px 0 4px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3000;
}

.remove-image-button:hover {
    cursor: pointer;
    background-color: #91341a;
}

.image-list-container,
.add-image-placeholder {
    --gutter-width: 12px;
}

.add-image-btn,
.image-list-btn {
    padding: 6px 8px;
    border-radius: 4px;
}

.add-image-btn:hover,
.image-list-btn:hover {
    cursor: pointer;
    opacity: 0.8;
}

.image-list-container {
    padding-left: var(--gutter-width);
    padding-bottom: var(--gutter-width);
}

.add-image-placeholder,
.chapter-image-item {
    --ratio: 0.778;
    --min-width: 128px;

    cursor: move;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: var(--min-width);
    height: calc(var(--min-width) / var(--ratio));
    margin: var(--gutter-width) var(--gutter-width) 0 0;
}

.add-image-placeholder:hover {
    --light-300: #eeeeee;

    cursor: pointer !important;
    background-color: var(--light-300);
}

.preview-image-item {
    --ratio: 0.778;
    --min-width: 800px;

    width: 100% !important;
    max-width: var(--min-width) !important;
    height: 100% !important;
}
</style>
