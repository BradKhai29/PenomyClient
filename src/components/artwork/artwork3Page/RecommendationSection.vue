<template>
    <div>
        <q-tabs v-model="tab" align="left" no-caps outside-arrows mobile-arrows class=" shadow-2 tabs">
            <q-icon name="list" class=" q-pr-sm" :style="{}" />
            <q-tab name="mails" label="Đề xuất" />
            <q-tab name="alarms" label="Cùng Series" />
            <q-tab name="movies" label="Cùng thể loại" />
        </q-tabs>

        <!-- Tab Panels Content -->
        <q-separator />

        <q-tab-panels class="recommend-panel" v-model="tab" animated>
            <q-tab-panel name="mails">
                <div class="text-h6">Mails</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-card name="alarms" class="row q-pt-sm">
                <artwork-image v-for="(item, index) in items" :key="index" class="col-4" :author="item.author"
                    :genre="item.genre" :title="item.title" />
            </q-card>

            <q-tab-panel name="movies">
                <div class="text-h6">Movies</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ArtworkImage from './ArtworkImage.vue'

const tab = ref('alarms')

const items = ref([
    {
        imageUrl: 'src/assets/hero_academia.jpg',
        rating: '4.8',
        genre: 'Action',
        title: 'My Hero Academia',
        author: 'Kohei Horikoshi'
    },
    {
        imageUrl: ref('src/assets/hero_academia.jpg'),
        rating: '4.5',
        genre: 'Adventure',
        title: 'One Piece',
        author: 'Eiichiro Oda'
    },
    {
        imageUrl: ref('src/assets/hero_academia.jpg'),
        rating: '4.5',
        genre: 'Adventure',
        title: 'One Piece',
        author: 'Eiichiro Oda'
    }
])
</script>

<style scoped>
.recommend-panel {
    font-family: Arial, Helvetica, sans-serif;
}

.carousel-item {
    width: 300px;
}

.tabs {
    color: #120E36;
    font-weight: bold;
}
</style>
