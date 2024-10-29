<template>
    <q-card class="my-card bg-grey-2" bordered>
        <q-card-section horizontal>
            <!-- left content -->
            <q-img class="col-5 image" fit="cover" :src="artwork.thumbnail" height="180px" width="37%" bordered>
                <div class="rating">
                    <q-icon name="star" size="1rem" color="dark"></q-icon>
                    <span class="text-subtitle2">{{ artwork.rating }}</span>
                </div>
                <div class="card-left-bottom absolute-bottom-right">
                    <div class="favorite">
                        <q-icon name="favorite" size=".84rem" color="dark"></q-icon>
                        <span class="text-subtitle2">100K</span>
                    </div>
                    <q-avatar rounded id="flag">
                        <img :src="artwork.flagUrl">
                    </q-avatar>
                </div>
                <div class="overlay"><q-icon class="play-icon" name="play_arrow" color="white" size="2rem" /></div>

            </q-img>

            <!-- right content -->
            <q-card-section class="card-content q-pa-sm">
                <div class="text-subtitle1 text-weight-medium" style="padding-left: .2rem;">
                    {{ shortTitle }}
                </div>
                <div class="text-subtitle3 text-weight-regular">
                    <q-icon name="account_circle" size="1.7rem" />
                    by {{ artwork.supplier }}
                </div>
                <div class="card-content-center q-pa-sm">
                    <div class="row">
                        <div class="text-subtitle2 col-6">
                            Tập 1241
                        </div>
                        <div class="text-subtitle2 text-weight-thin col text-italic text-right">
                            {{ artwork.lastUpdateAt }} ngày trước
                        </div>
                    </div>
                </div>

                <div class="card-content-bottom q-pa-xs">
                    <q-btn no-caps dense padding=".15rem .4rem" color="dark" size=".78rem" @click="toDetail">Xem
                        ngay</q-btn>
                    <q-icon name="more_vert" class="cursor-pointer">
                        <q-menu label="123" icon="more_vert" dropdown-icon="null"><q-list>
                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label>Photos</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label>Videos</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup>
                                    <q-item-section>
                                        <q-item-label>Articles</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-icon>
                </div>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>
<style scoped>
.my-card {
    width: 100%;
}

.card-content {
    width: 100%;
}

.card-content-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-content-center {
    height: 47%;
}

.rating,
.favorite {
    background-color: green;
    border-bottom-right-radius: 6px;
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .15rem .4rem;
}

.favorite {
    border-radius: 5px;
    height: 1.5rem;
}

.card-left-bottom {
    background-color: transparent;
    height: 51px;
    width: 7.3rem;
    display: flex;
    gap: .2rem;
    justify-content: space-between;
}

#flag {
    height: 1.5rem;
    width: 2rem;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(135, 135, 135, 0.5);
    z-index: 10;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
}

.play-icon {
    border: solid 1px white;
    padding: .3rem;
    border-radius: 100px;
    transition: transform 0.2s;
    transform: scale(0.1);
}

.my-card:hover .overlay {
    visibility: visible;
}

.my-card:hover .play-icon {
    transform: scale(1);
}
</style>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter()
const props = defineProps({
    artwork: {
        type: Object,
        default: () => ({

        })
    },
})
const shortTitle = ref(props.artwork.title);
if (props.artwork.title.length > 21) {
    shortTitle.value = props.artwork.title.substring(0, 21) + '...'
}
</script>