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
                        <div class="post-date">{{ post.createdAt }}</div>
                    </div>
                </q-card-section>

                <!-- Post Content -->
                <q-card-section>
                    <div class="post-content">{{ post.content }}</div>
                </q-card-section>

                <!-- Attached Media -->
                <!-- Attached Media -->
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
                    <q-btn flat icon="thumb_up" @click="likePost(post.id)">
                        <span class="q-ml-sm">{{ post.totalLikes }}</span>
                    </q-btn>
                    <q-btn flat icon="chat_bubble" @click="openComments(post.id)">
                        <span class="q-ml-sm">Comment</span>
                    </q-btn>
                </q-card-actions>
                <!-- Post comment -->
                <q-card-section>
                </q-card-section>
            </q-card>
            <CommentInputField />
        </div>
    </q-page>
</template>
<script>
import { onMounted, ref } from 'vue';
import GetUserPostHandler from 'src/api.handlers/UserPostHandler/GetUserPostHandler';
import CommentInputField from 'src/components/common/artwork/Common/CommentInputField.vue';

export default {
    setup() {


        const posts = ref([]);

        const fetchPosts = async () => {
            try {
                const response = await GetUserPostHandler.GetCreatedPosts();
                posts.value = response.userPosts; // Updated response handling
                console.log(posts.value); // Log fetched posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        onMounted(fetchPosts);

        return {
            posts,
        };
    },
    components: {
        CommentInputField
    }
};
</script>

<style scoped>
.post-container {
    max-width: 800px;
    margin: 0 auto;
}

.post-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header {
    border-bottom: 1px solid #eee;
}

.post-username {
    font-size: 16px;
    font-weight: bold;
}

.post-date {
    font-size: 12px;
    color: gray;
}

.post-content {
    padding: 16px;
    font-size: 14px;
    color: #333;
}

.media-preview {
    margin: 5px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 8px;
}


.q-btn span {
    margin-left: 8px;
    font-size: 14px;
    color: gray;
}

.media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    /* Flexible grid with up to 2 items per row */
    gap: 16px;
    justify-content: center;
    align-items: stretch;
    /* Ensures all grid items stretch to the same height */
}

.media-item {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    height: 350px;
    /* Set a uniform height for all items */
}

.media-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Maintains aspect ratio and fills the area */
    border-radius: 8px;
}
</style>
