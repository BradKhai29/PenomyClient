<template>
    <div class="post-bg">
        <q-item tag="div">
            <div style="height: 6rem;" class="row items-center">
                <q-avatar size="2.5rem" class="q-mr-md row items-center">
                    <img :src="userProfileStore.userProfile.avatarUrl" />
                </q-avatar>
            </div>
            <q-item-section>
                <q-btn rounded color="grey-3" label="Bạn đang nghĩ gì thế?" unelevated text-color="black" no-caps
                    align="left" @click="showCreationPopup = true" />
                <!-- <q-input dense rounded outlined v-model="postContent" bg-color="grey-3" label="Bạn đang nghĩ gì?" /> -->
            </q-item-section>
        </q-item>
        <q-separator class="q-mr-md q-ml-md" />
        <q-item tag="div">
            <q-item-section>
                <q-btn class="full-width" flat no-caps @click="showCreationPopup = true">
                    <q-icon name="image" color="primary" />
                    Tải ảnh lên
                </q-btn>
            </q-item-section>
        </q-item>
    </div>

    <CreatePostPopup v-if="showCreationPopup" @closePopup="showCreationPopup = false" :is-group-post="isGroupPost"
        :is-public-group="isPublicGroup" @createPostSuccess="showCreationPopup = false; emit('createPostSuccess')" />

</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useUserProfileStore } from 'src/stores/common/UserProfileStore';
import CreatePostPopup from './CreatePostPopup.vue';

const userProfileStore = useUserProfileStore();

const showCreationPopup = ref(false);

const props = defineProps({
    isGroupPost: {
        type: Boolean,
        default: false
    },
    isPublicGroup: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['createPostSuccess']);
</script>

<style scoped>
.post-bg {
    background-color: white;
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>