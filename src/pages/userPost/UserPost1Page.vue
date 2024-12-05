<template>
    <q-page class="q-pa-md flex flex-center bg-light">
        <q-card class="form-card shadow-3 rounded-borders">
            <q-card-actions align="center" class="q-pa-none">
                <q-btn label="Tạo mới bài viết" unelevated class="form-top hover-scale"></q-btn>
            </q-card-actions>

            <!-- Header Section -->
            <q-card-section class="form-header row items-center q-pa-md">
                <q-avatar size="50px" class="q-mr-md">
                    <img src="https://cdn.quasar.dev/img/avatar.png" alt="User Avatar" />
                </q-avatar>

                <div class="col-md-5">
                    <div class="username text-bold row">Tên người dùng đăng bài</div>
                    <q-select v-model="privacy" :options="privacyOptions" option-value="value" option-label="label"
                        dense outlined class="privacy-select row col-md-2" style="min-width: 140px;" />

                </div>
            </q-card-section>

            <!-- Post Content Input -->
            <q-card-section>
                <q-input v-model="postContent" type="textarea" placeholder="Viết ra điều bạn muốn chia sẻ" autogrow
                    filled dense class="post-input" counter maxlength="500">
                    <template v-slot:before>
                        <q-icon name="edit" />
                    </template>
                </q-input>
            </q-card-section>

            <q-card-section>
                <label for="chapterImages" class="image-upload-container row wrap justify-center items-center">
                    <!-- Display uploaded images in a grid -->
                    <q-col v-for="imageItem in displayImageItemList" :key="imageItem.id" cols="6"
                        class="uploaded-image-item">
                        <img :src="imageItem.src" class="preview-image-item" :alt="imageItem.imageName" />
                    </q-col>

                    <!-- Upload Icon (displayed when fewer than 4 images are uploaded) -->
                    <q-icon v-if="displayImageItemList.length < 4" name="add_photo_alternate" size="48px" color="grey-5"
                        class="q-mb-sm" />
                </label>
                <input type="file" id="chapterImages" name="chapterImages" accept="image/png, image/jpeg, image/jpg"
                    multiple hidden @change="onInputImage" ref="chapterImageInput" />
            </q-card-section>



            <!-- Submit Button -->
            <q-card-actions align="center" class="q-pa-none">
                <q-btn label="Đăng bài" unelevated class="submit-button hover-scale"
                    :disable="!postContent.trim() || isSubmitting" :loading="isSubmitting" @click="submitPost" />
            </q-card-actions>
        </q-card>
    </q-page>
</template>


<script>

import { FileHelper } from "src/helpers/FileHelper";
import { StringHelper } from "src/helpers/StringHelper";
import { PostImageItem } from "src/api.models/userpost/PostImageItem";
import CreateUserPostHandler from "src/api.handlers/UserPostHandler/CreateUserPostHandler";
export default {

    data() {
        return {
            imageLastPosition: 0,
            displayImageItemList: [],
            totalImageSizes: 0,
            maxImageSizes: 32 * 1024 * 1024,
            privacy: { label: "Công khai", value: 1 }, // Default to "Công khai"
            privacyOptions: [
                { label: "Công khai", value: 1 },
                { label: "Chỉ bạn bè", value: 2 },
                { label: "Riêng tư", value: 3 },
            ],
            postContent: "",
            files: [],
            isSubmitting: false, // New property to handle loading state
        };
    },
    methods: {
        async submitPost() {
            if (!this.postContent.trim()) {
                this.$q.notify({
                    type: "negative",
                    message: "Nội dung bài viết không được để trống.",
                });
                return;
            }

            this.isSubmitting = true; // Set loading state

            const postDetail = {
                title: this.postContent.trim(),
                allowComment: true,
                publicLevel: this.privacy.value,
                attachedMedia: this.displayImageItemList.map((item) => item.imageFile),
            };

            try {
                const response = await CreateUserPostHandler.CreatePostAsync(postDetail);

                if (response.isSuccess) {
                    this.$q.notify({
                        type: "positive",
                        message: "Bài viết đã được đăng thành công!",
                    });
                    this.postContent = "";
                    this.displayImageItemList = [];
                } else {
                    this.$q.notify({
                        type: "negative",
                        message: "Đăng bài không thành công. Vui lòng thử lại.",
                    });
                }
            } catch (error) {
                this.$q.notify({
                    type: "negative",
                    message: "Có lỗi xảy ra khi đăng bài.",
                });
                console.error("Submit post error:", error);
            } finally {
                this.isSubmitting = false; // Reset loading state
            }
        },
        onInputImage(event) {
            const uploadImageFiles = Array.from(event.target.files);

            if (!uploadImageFiles) {
                return;
            }

            // Check if adding these images exceeds the limit
            if (this.displayImageItemList.length + uploadImageFiles.length > 4) {
                this.$q.notify({
                    type: "negative",
                    message: "Bạn chỉ có thể tải lên tối đa 4 hình ảnh.",
                });
                return;
            }

            for (const imageFile of uploadImageFiles) {
                // Validate if the file is an image
                if (!imageFile.type.startsWith("image/")) {
                    this.$q.notify({
                        type: "negative",
                        message: "Tệp không phải là hình ảnh hợp lệ.",
                    });
                    continue;
                }

                // Generate unique ID for the image
                const randomString = StringHelper.generateSecureRandomString(6);
                const imageId = `img_${randomString}_${imageFile.lastModified}`;
                const imageName = imageFile.name;
                const imageSrc = URL.createObjectURL(imageFile);

                // Create image item object
                const imageItem = new PostImageItem(
                    imageId,
                    this.imageLastPosition,
                    imageName,
                    imageSrc,
                    imageFile
                );

                // Add the item to the display list
                this.displayImageItemList.push(imageItem);
                this.imageLastPosition++;
            }

            // Reset the input value to allow re-upload of the same file
            this.$refs.chapterImageInput.value = null;

            // Emit the update event if needed
            this.emitUpdateModelValue();
        },
    },
};
</script>

<style scoped>
.bg-light {
    background-color: #f9f9f9;
}

.form-card {
    max-width: 500px;
    width: 100%;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
}

.form-top {
    color: #120E36;
    background-color: #e0e0e0;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    transition: transform 0.2s ease;
}

.image-upload-container {
    height: auto;
    min-height: 140px;
    width: 100%;
    background: #fafafa;
    border: 2px dashed #ddd;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.image-upload-container:hover {
    background: #f1f8e9;
}

.uploaded-image-item {
    position: relative;
}

.preview-image-item {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cursor-pointer {
    cursor: pointer;
}

.form-header {
    background: white;
    border-bottom: 1px solid white;
}

.username {
    font-size: 16px;
    font-weight: 500;
    color: #120E36;
}

.privacy-select {
    color: #120E36;
    background-color: #e0e0e0;
    font-size: 14px;
}

.post-input {
    font-size: 14px;
}

.image-upload-container {
    height: 140px;
    background: #fafafa;
    border: 2px dashed #ddd;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.image-upload-container:hover {
    background: #f1f8e9;
}

.image-uploader {
    width: 100%;
}

.submit-button {
    margin: 20px;
    color: white;
    background-color: #120E36;
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    transition: transform 0.2s ease;
}

.submit-button:disabled {
    background: #ccc !important;
    cursor: not-allowed;
}

.hover-scale:hover {
    transform: scale(1.02);
}

.hover-text:hover {
    text-decoration: underline;
}
</style>
