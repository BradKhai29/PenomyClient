<template>
    <div>
        <div class="post-container">
            <!-- Loop through posts -->
            <q-card v-for="post in posts" :key="post.id" class="q-mb-md q-mt-lg post-card">
                <!-- Post Header -->
                <q-card-section class="row items-center justify-between">
                    <!-- Left: Avatar and User Info -->
                    <div class="row items-center">
                        <q-avatar>
                            <img :src="post.userAvatar" alt="User Avatar" />
                        </q-avatar>
                        <div class="q-ml-md">
                            <div class="post-username">{{ post.userNickName }}</div>
                            <div class="post-meta row items-center">
                                <div class="post-date">{{ post.createdAt }}</div>
                                <q-icon name="groups" color="#120E36" size="xs" class="q-ml-xs"
                                    title="Visibility Level"></q-icon>
                            </div>
                        </div>
                    </div>
                    <!-- Right: 3-Dot Menu -->
                    <q-btn v-if="post.createdBy == authStore.userId" flat dense icon="more_vert" color="grey-8" class="q-ml-auto">
                        <q-menu>
                            <q-list>
                                <q-item clickable @click="confirmRemovePost(post)">
                                    <q-item-section avatar>
                                        <q-icon name="delete" color="#120E36" />
                                    </q-item-section>
                                    <q-item-section>
                                        <span>Xóa bài viết</span>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </q-card-section>

                <!-- Post Content -->
                <q-card-section>
                    <div class="post-content">{{ post.content }}</div>
                </q-card-section>

                <!-- Attached Media -->
                <q-card-section v-if="post.attachedMedias.length > 0">
                    <div class="media-grid">
                        <div v-for="media in post.attachedMedias" :key="media.fileName" class="media-item">
                            <img :src="media.storageUrl" class="media-image" :alt="media.fileName" />
                        </div>
                    </div>
                </q-card-section>

                <q-separator />

                <!-- Post Footer -->
                <q-card-actions align="around">
                    <q-btn flat icon="thumb_up" @click="likePost(post.id)" :color="post.hasLikedPost ? 'primary' : ''">
                        <span class="q-ml-sm">{{ post.totalLikes }}</span>
                    </q-btn>
                    <q-btn flat icon="chat_bubble" @click="openComments(post.id, post.isOpenComment)">
                        <span class="q-ml-sm">Bình luận</span>
                    </q-btn>
                </q-card-actions>
                <!-- Post comment -->
                <q-card-section v-show="post.isOpenComment">
                    <CommentLoader :post-id="String(post.id)" :is-allow-comment="true" />
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>


<script setup>
import { Notify, Dialog } from 'quasar';
import { useAuthStore } from 'src/stores/common/AuthStore';
import { onMounted, ref, defineProps, watch } from 'vue';
import RemoveUserPostHandler from 'src/api.handlers/UserPostHandler/RemoveUserPostHandler';
import CommentLoader from 'src/components/common/socialMedia/GroupPost/CommentLoader.vue';
// import api
import LikePostHandler from 'src/api.handlers/UserPostHandler/LikePostHandler';

const authStore = useAuthStore();

const props = defineProps({
    groupPosts: {
        type: Array,
        required: true,
    },
});

const posts = ref(props.groupPosts);

watch(
    () => props.groupPosts,
    () => {
        posts.value = props.groupPosts;
    }
)
const likePost = async (postId) => {
    try {
        const response = (await LikePostHandler.LikeUnlikePostAsync(postId, true)).responseBody;
        if (response.isLikeRequest) {
            posts.value.find((post) => post.id === postId).totalLikes += 1;
            posts.value.find((post) => post.id === postId).hasLikedPost = true;
        }
        else if (!response.isLikeRequest) {
            posts.value.find((post) => post.id === postId).totalLikes -= 1;
            posts.value.find((post) => post.id === postId).hasLikedPost = false;
        }
        // else {
        //     throw new Error('Failed to like post');
        // }
    } catch (error) {
        console.error("Error liking post:", error);
    }
}
const confirmRemovePost = (post) => {
    Dialog.create({
        title: 'Confirm',
        message: `Bạn chắc chắn muốn xóa bài viết?`,
        ok: {
            label: 'Chắc chắn',
            color: 'negative',
        },
        cancel: {
            label: 'Xem đã',
        },
    }).onOk(async () => {
        await removePost(post.id);
    });
};

const removePost = async (postId) => {
    try {
        const response = await RemoveUserPostHandler.RemoveUserPostAsync(postId, true);
        if (response) {
            posts.value = posts.value.filter((post) => post.id !== postId);
            Notify.create({
                type: 'positive',
                message: 'Post removed successfully.',
            });
        } else {
            throw new Error('Failed to remove post');
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        Notify.create({
            type: 'negative',
            message: 'Failed to remove post. Please try again later.',
        });
    }
};

const openComments = (postId, isOpenComment) => {
    posts.value.find((post) => post.id === postId).isOpenComment = !isOpenComment
}
</script>

<style scoped>
/* General Container Styles */
.post-container {
    max-width: 800px;
    margin: 0 auto;
}

/* Card Styles */
.post-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-username {
    font-size: 16px;
    font-weight: bold;
}

.post-meta {
    font-size: 12px;
    color: gray;
    display: flex;
    align-items: center;
    /* Align date and icon */
}

.post-date {
    margin-right: 4px;
    color: #666;
    /* Optional: Subtle color for the date */
}

.post-content {
    font-size: 14px;
    color: #333;
}

/* Media Grid Styles */
.media-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 2 items per row */
    gap: 16px;
    justify-content: center;
    align-items: stretch;
    /* Ensures items have consistent height */
}

.media-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 350px;
    /* Uniform height */
}

.media-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Maintain aspect ratio */
    border-radius: 8px;
}

/* Button Styles */
.q-btn span {
    margin-left: 8px;
    font-size: 14px;
    color: gray;
}
</style>
