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
                <span class="q-mr-xs"
                    >{{ displayImageItemList.length }} ảnh</span
                >
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
            <section
                v-if="isProcessing || disableMode"
                class="draggable-disable border-radius-sm"
                :class="{ 'draggable-disable-blur': disableMode }"
            ></section>
            <span
                class="add-image-placeholder"
                v-if="displayImageItemList.length == 0"
            >
            </span>
            <span
                class="add-image-placeholder"
                v-for="imageItem in displayImageItemList"
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
                    v-if="displayImageItemList.length == 0"
                >
                    <q-icon name="add" size="sm" />
                </label>
                <div
                    v-for="imageItem in displayImageItemList"
                    :key="imageItem.id"
                    :id="imageItem.id"
                    class="chapter-image-item border-sm-dark border-radius-sm"
                    @mousedown="onDragStart"
                >
                    <span
                        class="remove-image-button"
                        @mousedown="removeImageItem(imageItem.id)"
                    >
                        <q-icon name="close" size="xs" />
                    </span>
                    <q-img :src="imageItem.src" width="100%" height="100%">
                        <span
                            class="absolute-bottom text-subtitle2 q-pa-xs image-caption text-light"
                        >
                            ({{ imageItem.position + 1 }})
                            {{ imageItem.imageName }}
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
                            v-for="imageItem in displayImageItemList"
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
import { ArrayHelper } from "src/helpers/ArrayHelper";
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
        disableMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showDialog: false,
            dragging: false,
            /**
             * This flag is used to indicate the current component
             * is resolving the dragging & uploading file operation.
             */
            isProcessing: false,
            hasError: false,
            /**
             * @type {ChapterImageItem[]} The list of image item to display and upload.
             */
            displayImageItemList: [],
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
        // Turn on this flag to prevent user interact while component is mounting.
        this.isProcessing = true;

        // Get the input element from the template
        // for handle inputEvent and input validation.
        this.chapterImageInput = this.$refs.chapterImageInput;

        // Emit this component instance for later chapter detail input validation.
        this.$emit("verifyInput", this);

        // Setup the chapter image list as a sortable container for drag-n-drop.
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

        // Turn off flag after mounting success.
        this.isProcessing = false;
    },
    methods: {
        verifyInput() {
            // Check if the length of image item list must be larger than 0.
            this.hasError = this.displayImageItemList.length == 0;

            return this.displayImageItemList.length > 0;
        },
        /**
         * Emit the update model value to the parent component.
         * The object to emit will the displayImageItemList.
         */
        emitUpdateModelValue() {
            this.$emit("update:modelValue", this.displayImageItemList);
        },
        /**
         * Delay the method invocation with
         * the specified delay timeout.
         * @param {Callback} resolveMethod The method that will be invoked after delay timeout.
         * @param {Number} delayTimeout The delay timeout to invoke the method.
         */
        delayAndResolve(resolveMethod, delayTimeout) {
            const DEFAULT_DELAY_TIMEOUT = 100;

            // If the delay timeout to resolve is not set, then set default value.
            if (!delayTimeout) {
                delayTimeout = DEFAULT_DELAY_TIMEOUT;
            }

            // Delay for a moment before invoking the method.
            setTimeout(() => {
                resolveMethod();
            }, delayTimeout);
        },
        /**
         * Wait for the current component to process the drag-n-drop properly.
         */
        waitForProcessingDone() {
            const PROCESSING_TIMEOUT = 50; // 50ms to wait for processing.

            setTimeout(() => {
                this.isProcessing = false;
            }, PROCESSING_TIMEOUT);
        },
        /**
         * @param {InputEvent} event The event instance.
         */
        onInputImage(event) {
            const uploadImageFiles = FileHelper.asFiles(event.target.files);

            if (!uploadImageFiles) {
                return;
            }

            // Turn on isProcessing flag.
            this.isProcessing = true;

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

                // Create image item to display for user and store for later operation.
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

                // Add the item to the display list and update the related state.
                this.displayImageItemList.push(imageItem);

                this.imageLastPosition++;
                this.totalImageSizes += imageSize;
            }

            // This line of code will let user to select
            // again the same file when they clear the image.
            // Reference: https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
            this.chapterImageInput.value = null;

            // Turn off the isProcessing flag.
            this.isProcessing = false;

            // After handling the file upload,
            // emit the model to update the state.
            this.emitUpdateModelValue();
        },
        removeImageItem(imageId) {
            // Prevent user to remove the image while dragging or not finished
            // in processing the previous operation.
            if (this.dragging || this.isProcessing) {
                return;
            }

            // Turn on this flag to prevent user interact with drag-n-drop.
            this.isProcessing = true;

            const removeItem = this.displayImageItemList.find(
                (item) => item.id == imageId
            );

            for (
                let i = removeItem.position + 1;
                i < this.displayImageItemList.length;
                i++
            ) {
                this.displayImageItemList[i].position--;
            }

            // Revoke the object url to prevent memory leak.
            URL.revokeObjectURL(removeItem.src);

            // Remove the item from the display list and update related state.
            ArrayHelper.removeAt(
                this.displayImageItemList,
                removeItem.position
            );
            this.imageLastPosition--;
            this.totalImageSizes -= removeItem.imageFile.size;

            // Turn off the isProcessing flag.
            this.isProcessing = false;
        },
        /**
         * Tracking the element that being dragged by the user.
         *
         * @param {MouseEvent} event
         */
        onDragStart(event) {
            // Turn on dragging flag to begin tracking the draggedElement.
            this.dragging = true;
            this.currentDraggedElement = event.currentTarget;
        },
        onDragEnd() {
            // Turn off dragging flag and resolve the drag-n-drop.
            this.dragging = false;

            // Prevent drag-n-drop when the component is not
            // finished to process the previous operation.
            if (this.isProcessing) {
                return;
            }

            // Turn on isProcessing flag.
            this.isProcessing = true;
            const draggedElement = this.currentDraggedElement;

            // Resolve only when the draggedElement is not null.
            if (draggedElement) {
                const prevElement = draggedElement.previousElementSibling;
                let nextElement = draggedElement.nextElementSibling;

                // The sortablejs will create the clone element of the draggedElement,
                // if the dragged element is moved to the last of the list,
                // the next element will always the clone.
                // Do this will prevent error in handling drag and drop.
                if (nextElement && nextElement.id == draggedElement.id) {
                    nextElement = null;
                }

                // If both prevElement & nextElement is not null
                // then the new position must be in the middle of the list.
                if (prevElement && nextElement) {
                    this.delayAndResolve(() => {
                        this.handleDragToMiddle(prevElement, draggedElement);
                        this.waitForProcessingDone();
                    });
                }
                // If the prevItem is null, then the new position must be
                // at the first of the list.
                else if (!prevElement && nextElement) {
                    this.delayAndResolve(() => {
                        this.handleDragToFirst(draggedElement);
                        this.waitForProcessingDone();
                    });
                }
                // If the nextItem is null, then the new position
                // must be at the lasst of the list.
                else {
                    this.delayAndResolve(() => {
                        this.handleDragToLast(draggedElement);
                        this.waitForProcessingDone();
                    });
                }

                // After handling the drag-n-drop,
                // emit the model to update the state.
                this.emitUpdateModelValue();
            }
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

            const prevItem = this.displayImageItemList.find(
                (item) => item.id == prevElementId
            );

            const draggedItem = this.displayImageItemList.find(
                (item) => item.id == draggedElementId
            );

            // Get the old and the new position of the dragged item.
            let newPosition = 0;
            const oldPosition = draggedItem.position;

            // If the draggedItem's old position is equal to (prevItem's position + 1)
            // then no need to process because the draggedItem is get back to its old position.
            if (oldPosition == prevItem.position + 1) {
                return;
            }

            // If the draggedItem's old position larger than the
            // prevItem position, then draggedItem is moved backward.
            const isMovedBackward = oldPosition > prevItem.position;

            if (isMovedBackward) {
                newPosition = prevItem.position + 1;
            } else {
                newPosition = prevItem.position;
            }

            // Update the item list after drag-n-drop.
            if (isMovedBackward) {
                // From the index(0) to the index(newPosition - 1), no action needed.

                // The items that positioned after the draggedItem,
                // must increase their newPosition by 1 (because move backward)
                // and for later adding the draggedItem to its new position.
                for (let i = newPosition; i < oldPosition; i++) {
                    const imageItem = this.displayImageItemList[i];
                    imageItem.position++;
                }

                // From the index(oldPostion + 1) to the end, no action needed.
            }
            // If move forward, then handle differently.
            else {
                // From the index(0) to the index(newPosition - 1), no action needed.

                // The items that positioned after the draggedItem,
                // must decrease their newPosition by 1 (because move forward)
                // for later adding the draggedItem to its new position.
                for (let i = oldPosition + 1; i < newPosition + 1; i++) {
                    const imageItem = this.displayImageItemList[i];
                    imageItem.position--;
                }

                // From the index(oldPostion + 1) to the end, no action needed.
            }

            // Set the new position for the draggedItem
            draggedItem.position = newPosition;

            // Insert the dragged item into its new position.
            ArrayHelper.removeAt(this.displayImageItemList, oldPosition);
            ArrayHelper.insertAt(
                this.displayImageItemList,
                newPosition,
                draggedItem
            );
        },
        /**
         * Handle drag & drop when the dragged element is move to the first of the list.
         *
         * @param {HTMLElement} draggedElement The element that is dragged by user.
         */
        handleDragToFirst(draggedElement) {
            // Get the id of the prevElement and draggedElement
            // in the DOM to find their position to handle drag-n-drop.
            const draggedElementId = draggedElement.id;

            const draggedItem = this.displayImageItemList.find(
                (item) => item.id == draggedElementId
            );

            // If no item found, then return.
            if (!draggedItem) {
                return;
            }

            const oldPosition = draggedItem.position;
            const newPosition = 0; // Move to first then new position is zero.
            draggedItem.position = newPosition;

            // The items that positioned before the dragged item
            // will increase their position by 1.
            for (let i = 0; i < oldPosition; i++) {
                const imageItem = this.displayImageItemList[i];
                imageItem.position++;
            }

            // Insert the dragged item into its new position.
            ArrayHelper.removeAt(this.displayImageItemList, oldPosition);
            ArrayHelper.insertAt(
                this.displayImageItemList,
                newPosition,
                draggedItem
            );
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

            const draggedItem = this.displayImageItemList.find(
                (item) => item.id == draggedElementId
            );

            // If no item found, then return.
            if (!draggedItem) {
                return;
            }

            const oldPosition = draggedItem.position;
            // Move to last then new position is (displayImageItemList.length - 1).
            const newPosition = this.displayImageItemList.length - 1;
            draggedItem.position = newPosition;

            // Update all elements that positioned after the
            // before inserting the draggedItem to its new position.
            for (let i = oldPosition + 1; i <= newPosition; i++) {
                const imageItem = this.displayImageItemList[i];
                imageItem.position--;
            }

            // Insert the dragged item into its new position.
            ArrayHelper.removeAt(this.displayImageItemList, oldPosition);
            this.displayImageItemList.push(draggedItem);
        },
    },
};
</script>

<style scoped>
* {
    --wrapper-list-listener-z-index: 2000;
    --chapter-image-list-z-index: 2200;
    --remove-image-button-z-index: 2800;
    --draggable-disable-z-index: 3000;
}

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
    z-index: var(--wrapper-list-listener-z-index);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    /* background: rgba(0, 0, 0, 0.6); */
}

.draggable-disable {
    position: absolute;
    z-index: var(--draggable-disable-z-index);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    cursor: not-allowed;
}

.draggable-disable-blur {
    background: rgba(64, 64, 64, 0.6);
}

#chapter-image-list {
    position: absolute;
    z-index: var(--chapter-image-list-z-index);
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
    z-index: var(--remove-image-button-z-index);
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
