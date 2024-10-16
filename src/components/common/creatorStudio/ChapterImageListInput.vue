<template>
    <section class="col-grow">
        <div class="image-list-header row justify-between">
            <section class="flex items-center col-grow">
                <span class="text-subtitle2 text-weight-bold q-mr-md"
                    >Danh sách ảnh</span
                >
                <label
                    for="chapterImages"
                    class="bg-dark text-light add-image-btn q-mr-sm"
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
                    @input="onInputImage"
                    ref="chapterImageInput"
                />
                <q-btn
                    dense
                    no-caps
                    unelevated
                    class="bg-dark text-light image-list-btn"
                    @click="clearList"
                >
                    <span class="q-mr-xs">Xem trước</span>
                    <q-icon name="tv" size="xs" />
                </q-btn>
            </section>
            <section class="flex items-center justify-end col-auto">
                <span class="q-mr-xs">{{ imageItemList.length }} ảnh</span>
                <span>(60KB / 32MB)</span>
            </section>
        </div>
        <section
            id="wrapper-chapter-image-list"
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
                <q-btn
                    class="add-image-placeholder"
                    v-if="imageItemList.length == 0"
                >
                    <q-icon name="add" size="sm" />
                </q-btn>
                <q-img
                    v-for="imageItem in imageItemList"
                    :key="imageItem.id"
                    :id="imageItem.id"
                    class="chapter-image-item border-sm-dark border-radius-sm"
                    :src="imageItem.src"
                    @mousedown="onDragStart"
                >
                    <span
                        class="absolute-bottom text-subtitle2 q-pa-xs image-caption text-light"
                    >
                        ({{ imageItem.position }}) {{ imageItem.imageName }}
                    </span>
                </q-img>
            </section>
        </section>
        <div class="image-list-footer-caption">
            <div class="q-mt-xl">Image list</div>
            <section
                class="image-list-container border-sm-dark border-radius-sm row"
            >
                <q-btn
                    class="add-image-placeholder"
                    v-if="imageItemList.length == 0"
                >
                    <q-icon name="add" size="sm" />
                </q-btn>
                <q-img
                    v-for="imageItem in imageItemList"
                    :key="imageItem.id"
                    :id="imageItem.id"
                    class="chapter-image-item border-sm-dark border-radius-sm"
                    :src="imageItem.src"
                >
                    <span
                        class="absolute-bottom text-subtitle2 q-pa-xs image-caption text-light"
                    >
                        ({{ imageItem.position }}) {{ imageItem.imageName }}
                    </span>
                </q-img>
            </section>
            <div class="q-mt-xl">Temp list</div>
            <section
                class="image-list-container border-sm-dark border-radius-sm row"
            >
                <q-btn
                    class="add-image-placeholder"
                    v-if="tempItemList.length == 0"
                >
                    <q-icon name="add" size="sm" />
                </q-btn>
                <q-img
                    v-for="imageItem in tempItemList"
                    :key="imageItem.id"
                    :id="imageItem.id"
                    class="chapter-image-item border-sm-dark border-radius-sm"
                    :src="imageItem.src"
                >
                    <span
                        class="absolute-bottom text-subtitle2 q-pa-xs image-caption text-light"
                    >
                        ({{ imageItem.position }}) {{ imageItem.imageName }}
                    </span>
                </q-img>
            </section>
        </div>
    </section>
</template>

<script>
import Sortable from "sortablejs";
import { FileHelper } from "src/helpers/FileHelper";

class ImageItem {
    constructor(id, position, imageName, src, imageFile) {
        this.id = id;
        this.position = position;
        this.imageName = imageName;
        this.src = src;
        this.imageFile = imageFile;
    }
}
const invalidFormatMessage = "Yêu cầu định dạng PNG, JPG, JPEG";
const invalidFileSizeMessage = "File ảnh kích thước tối đa 4MB";

export default {
    data() {
        return {
            dragging: false,
            /**
             * @type {ImageItem[]} The list of image item to upload.
             */
            imageItemList: [],
            tempItemList: [],
            /**
             * The position will start at base zero.
             */
            imageLastPosition: 0,
            /**
             * @type {Element} The chapter image list html item in DOM.
             */
            chapterImagesHtmlItem: null,
            /**
             * @type {HTMLInputElement} The image file input.
             */
            chapterImageInput: null,
            sortableInstance: null,
            /**
             * @type {HTMLElement} The dragged element to track.
             */
            currentDraggedElement: null,
            isInvalid: true,
            invalidMessage: invalidFormatMessage,
        };
    },
    mounted() {
        this.chapterImagesHtmlItem = document.querySelector(
            "#chapter-image-list"
        );

        this.sortableInstance = Sortable.create(this.chapterImagesHtmlItem, {
            animation: 150,
            ghostClass: "ghost",
            dragClass: "drag",
            easing: "cubic-bezier(1, 0, 0, 1)",
            forceFallback: true,
            removeCloneOnHide: true,
        });

        this.chapterImageInput = this.$refs.chapterImageInput;
    },
    methods: {
        clearList() {
            this.imageLastPosition = 0;
            this.imageItemList.splice(0, this.imageItemList.length);
            this.tempItemList.splice(0, this.tempItemList.length);
        },
        /**
         * @param {MouseEvent} event
         */
        onDragStart(event) {
            this.currentDraggedElement = event.currentTarget;
            this.dragging = true;
        },
        /**
         * @param {MouseEvent} event
         */
        onDragEnd(event) {
            this.dragging = false;

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

                    return;
                } else if (!prevElement && nextElement) {
                    console.log("To first");

                    this.handleDragToFirst(draggedElement);
                } else {
                    console.log("To last");

                    this.handleDragToLast(draggedElement);
                }
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
        changeName() {
            console.log("Image item list: ", this.imageItemList);
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

                const imageId = `img_${imageFile.lastModified}`;
                const imageName = imageFile.name;
                const imageSrc = URL.createObjectURL(imageFile);

                const imageItem = new ImageItem(
                    imageId,
                    this.imageLastPosition,
                    imageName,
                    imageSrc,
                    imageFile
                );

                this.imageItemList.push(imageItem);
                this.imageLastPosition++;
            }

            // This line of code will let user to select
            // again the same file when they clear the image.
            // Reference: https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
            this.chapterImageInput.value = null;
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

#wrapper-chapter-image-list {
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

.image-list-container,
.add-image-placeholder {
    --gutter-width: 12px;
}

.add-image-btn,
.image-list-btn {
    padding: 4px 6px !important;
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
    justify-content: center;
    align-items: center;
    width: var(--min-width);
    height: calc(var(--min-width) / var(--ratio));
    margin: var(--gutter-width) var(--gutter-width) 0 0;
}
</style>
