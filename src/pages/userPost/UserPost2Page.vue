<template>
    <q-page class="q-pa-md">
        <div class="post-container">
            <!-- Loop through posts -->
            <q-card v-for="post in posts" :key="post.id" class="q-mb-md post-card">
                <!-- Post Header -->
                <q-card-section class="row items-center">
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/img/avatar.png" alt="User Avatar" />
                    </q-avatar>
                    <div class="q-ml-md">
                        <div class="post-username">{{ post.createdBy }}</div>
                        <div class="post-meta row items-center">
                            <div class="post-date">{{ post.createdAt }}</div>
                            <q-icon :name="getPublicLevelIcon(post.publicLevel)" color="#120E36" size="sm"
                                class="q-ml-xs" title="Visibility Level" />
                        </div>
                    </div>
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

                <!-- Post Footer -->
                <q-card-actions align="around">
                    <q-btn flat icon="thumb_up" @click="likePost(post.id)">
                        <span class="q-ml-sm">{{ post.totalLikes }}</span>
                    </q-btn>
                    <q-btn flat icon="chat_bubble" @click="openComments(post.id)">
                        <span class="q-ml-sm">Comment</span>
                    </q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import GetUserPostHandler from 'src/api.handlers/UserPostHandler/GetUserPostHandler';

export default {
    setup() {
        const posts = ref([]);

        const fetchPosts = async () => {
            try {
                const response = await GetUserPostHandler.GetCreatedPosts();
                posts.value = response.userPosts;
                console.log(posts.value);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const getPublicLevelIcon = (level) => {
            switch (level) {
                case 1:
                    return 'public'; // Public
                case 2:
                    return 'group'; // Restricted
                case 3:
                    return 'lock'; // Private
                default:
                    return 'help'; // Unknown
            }
        };

        onMounted(fetchPosts);

        return {
            posts,
            getPublicLevelIcon,
        };
    },
};
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
