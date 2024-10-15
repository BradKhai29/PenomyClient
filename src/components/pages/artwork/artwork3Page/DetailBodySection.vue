<template>
    <q-page class="" style="min-height: 600px; height: auto; padding-right: 16px">
        <!-- Left Section -->
        <div class="row">
            <q-card flat class="col-5 left-panel ">
                <!-- Description -->
                <q-card-section>

                    <stat-detaild :view-count="viewCount" :comment-count="commentCount" :favorite-count="favoriteCount"
                        :star-rates="starRates"></stat-detaild>
                    <div class="text-body1">
                        {{ introduction }}
                    </div>

                    <!-- Stats Row -->
                    <!-- Buttons Section -->
                    <div class="row">
                        <q-btn class="col-12 q-mr-sm" unelevated rounded no-caps
                            :style="{ fontSize: '16px', backgroundColor: '#120E36', color: '#EEEEEE', fontWeight: 'bold', marginBottom: '16px' }">
                            <q-icon :color="'#120E36'" name="ion-star" class="q-mr-xs" />
                            4 / 5
                        </q-btn>
                    </div>
                    <div class="row">
                        <q-btn class="col-12 q-mr-sm" unelevated rounded no-caps
                            :style="{ fontSize: '16px', backgroundColor: '#120E36', color: '#EEEEEE', fontWeight: 'bold' }">
                            <q-icon :color="'#120E36'" name="ion-add-circle" class="q-mr-xs" />
                            Theo dõi tác phẩm
                        </q-btn>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Right Section (Episodes List) -->
            <q-card flat class="col-7 right-part">
                <!-- Header -->
                <div class="row items-center ">
                    <div class="col total-chaps">Tổng {{ count }} tập</div>
                    <div class="col-auto"><strong>Mới nhất</strong> | Từ tập 1</div>
                </div>
                <q-list class="episode-list right-panel">
                    <!-- Episode Items -->
                    <q-item class="episode-item" v-for="(episode, index) in chapterData" :key="index" clickable>
                        <q-item-section avatar>
                            <div class="image-container">
                                <q-img :src="episode.thumbnailUrl" class="episode-image" width="100px" height="100px" />
                                <q-icon v-if="episode.isLocked" name="ion-lock" class="lock-icon"
                                    :style="{ color: '#53BF94' }" />
                                <div v-if="episode.isWatching" class="overlay-content">
                                    <q-icon name="play_circle" class="play-icon q-pr-xs" :style="{ color: 'white' }" />
                                    <span>Đang xem</span>
                                </div>
                            </div>
                        </q-item-section>
                        <q-item-section>
                            <q-item-label class="chap-num">Tập {{ episode.uploadOrder }}</q-item-label>
                            <q-item-label class="chap-title">{{ episode.chapterName }}</q-item-label>
                            <q-item-label class="chap-stats" caption>
                                {{ formatDate(episode.createdTime) }}
                                <q-icon name="ion-eye stats-icon" class="q-ml-sm" />
                                {{ formatCount(episode.viewCount) }}
                                <q-icon name="ion-heart stats-icon" class="q-ml-sm" />
                                {{ formatCount(episode.favoriteCount) }}
                                <q-icon name="ion-chatbubbles stats-icon" class="q-ml-sm" />
                                {{ formatCount(episode.commentCount) }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
        </div>
    </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import StatDetaild from './StatDetaild.vue';
import artworkDetailApiHandler from 'src/api.handlers/artwork/artwork3Page/ArtworkDetailApiHandler'
function formatDate(createdTime) {
    return createdTime.split('T')[0];
}
function formatCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 100000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count;
}
const props = defineProps({
    introduction: {
        type: String,
        default: 'No introduction'
    },
    viewCount: {
        type: Number,
        required: true,
    },
    favoriteCount: {
        type: Number,
        required: true,
    },
    commentCount: {
        type: Number,
        required: true,
    },
    starRates: {
        type: Number,
        required: true
    }
})
const artworkId = ref(null);
const route = useRoute();
const count = ref(0);
const chapterData = ref([]);
const episodes = ref([
    {
        chapNumber: 10,
        imageUrl: '/src/assets/hero_academia.jpg',
        title: '10. Khởi đầu của trận chiến',
        date: '22/07/2023',
        views: '100K',
        likes: '100K',
        comments: '100K',
        isLocked: true,
        isWatching: false
    },
    {
        chapNumber: 10,
        imageUrl: '/src/assets/hero_academia.jpg',
        title: '10. Khởi đầu của trận chiến',
        date: '22/07/2023',
        views: '100K',
        likes: '100K',
        comments: '100K',
        isLocked: true,
        isWatching: false
    }, {
        chapNumber: 10,
        imageUrl: '/src/assets/hero_academia.jpg',
        title: '10. Khởi đầu của trận chiến',
        date: '22/07/2023',
        views: '100K',
        likes: '100K',
        comments: '100K',
        isLocked: false,
        isWatching: true
    }, {
        chapNumber: 10,
        imageUrl: '/src/assets/hero_academia.jpg',
        title: '10. Khởi đầu của trận chiến',
        date: '22/07/2023',
        views: '100K',
        likes: '100K',
        comments: '100K',
        isLocked: false,
        isWatching: true
    }, {
        chapNumber: 10,
        imageUrl: '/src/assets/hero_academia.jpg',
        title: '10. Khởi đầu của trận chiến',
        date: '22/07/2023',
        views: '100K',
        likes: '100K',
        comments: '100K',
        isLocked: false,
        isWatching: true
    }, {
        chapNumber: 10,
        imageUrl: '/src/assets/hero_academia.jpg',
        title: '10. Khởi đầu của trận chiến',
        date: '22/07/2023',
        views: '100K',
        likes: '100K',
        comments: '100K',
        isLocked: false,
        isWatching: true
    },
    // Add more episodes here...
]);
onMounted(async () => {
    artworkId.value = route.params.artworkId;
    const id = route.params.artworkId;
    try {
        const [chapterResponse] = await Promise.all([
            artworkDetailApiHandler.getArtworkChaptersByIdAsync(id, 1, 10)
        ]);
        count.value = chapterResponse.chapterCount;
        chapterData.value = chapterResponse.chapters;
        console.log(chapterData.value);
    } catch (error) {
        console.log(error);
    }
});
</script>

<style scoped>
.total-chaps {
    font-size: 20px;
}

.text-body1 {
    padding-bottom: 32px;
}

.episode-item {
    max-height: 100%;
}

.left-panel {
    font-family: Arial, Helvetica, sans-serif;
    padding: 16px;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.stats-icon {
    font-size: 16px;
}

.stats-detail {
    font-family: Arial, Helvetica, sans-serif;
    color: #120E36;
    font-size: 16px;
}

.right-part {
    padding: 16px;
}

.overlay-content {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    height: 22px;
    left: 0;
    right: 0;
    background-color: #53BF94;
    /* Semi-transparent background */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1A1C22;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 5px;
}

.right-panel {
    padding-top: 16px;
    height: 704px;
    /* Ensures fixed height */
    overflow-y: auto;
    /* Adds scrolling behavior for long lists */
}

.image-container {
    position: relative;
}

.lock-icon {
    position: absolute;
    top: 50%;
    /* Centers the icon vertically */
    left: 50%;
    /* Centers the icon horizontally */
    transform: translate(-50%, -50%);
    /* Offsets to ensure the icon is centered exactly */
    color: white;
    /* Adjust icon color as needed */
    font-size: 48px;
    /* Adjust the size of the icon */
}

.chap-num {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
}

.chap-title {
    padding-top: 6px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
}

.chap-stats {
    padding-top: 12px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
}



.stats {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
}

.q-btn-group .q-btn {
    width: 100%;
    margin-bottom: 10px;
}

.q-list .q-item {
    border-bottom: 1px solid #e0e0e0;
}
</style>
