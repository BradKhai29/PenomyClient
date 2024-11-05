<template>
    <div>
        <q-card class="my-card bg-grey-2 cursor-pointer" bordered
            @click="$router.push(`artwork/comic/${props.artwork.artworkId}`)">
            <q-card-section horizontal>
                <q-img class="col-5 image" fit="cover" :src="artwork.thumbnail" height="360px" width="100%" bordered>
                    <div class="rating">
                        <q-icon name="star" size="1rem"></q-icon>
                        <span class="text-subtitle2">{{ artwork.rating }}</span>
                    </div>
                    <div class="card-left-bottom absolute-bottom-right">
                        <div class="favorite">
                            <q-icon name="favorite" size=".84rem"></q-icon>
                            <span class="text-subtitle2">{{ artwork.favorite }}</span>
                        </div>
                        <q-avatar rounded id="flag">
                            <img :src="artwork.flagUrl">
                        </q-avatar>
                    </div>
                </q-img>
                <div class="overlay text-white">
                    <div class="overlay-background"></div>
                    <div class="row last-update">
                        <div class="text-subtitle2 col-5">
                            Tập 1241
                        </div>
                        <div class="text-subtitle2 text-weight-thin col text-italic text-right">
                            ngày trước
                        </div>
                    </div>
                    <div class="row last-update">
                        <div class="text-subtitle2 col-5">
                            Tập 1241
                        </div>
                        <div class="text-subtitle2 text-weight-thin col text-italic text-right">
                            ngày trước
                        </div>
                    </div>
                    <div class="row last-update">
                        <div class="text-subtitle2 col-5">
                            Tập 1241
                        </div>
                        <div class="text-subtitle2 text-weight-thin col text-italic text-right">
                            ngày trước
                        </div>
                    </div>
                    <div class="q-ma-sm q-mt-md">
                        <div class="text-subtitle3 text-weight-regular">
                            <q-avatar size="2em">
                                <img src="https://cdn.quasar.dev/img/avatar.png" alt="">
                            </q-avatar>
                            by {{ artwork.supplier }}
                        </div>
                    </div>
                </div>
            </q-card-section>

        </q-card>
        <div class="artwork-name">
            <p class="text-subtitle1 cursor-pointer" @click="$router.push(`artwork/comic/${props.artwork.artworkId}`)">
                {{ shortTitle }}</p>
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
    </div>
</template>
<script setup>
import { ref } from 'vue';
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
<style scoped>
a {
    text-decoration: none;
    color: black;
    font-weight: 700;
    font-size: 1.2rem;
}

.my-card {
    width: 100%;
    height: 100%;
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

.rating :first-child,
.favorite :first-child {
    color: black;
}

.favorite {
    border-radius: 5px;
    height: 1.5rem;
}

.card-left-bottom {
    background-color: transparent;
    height: 51px;
    width: 7.5rem;
    display: flex;
    gap: .3rem;
    justify-content: space-between;
}

#flag {
    height: 1.5rem;
    width: 2rem;
}

.artwork-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    visibility: hidden;
}

.overlay-background {
    background-color: black;
    opacity: 40%;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
}

.my-card:hover .overlay {
    visibility: visible;
}

.last-update {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem;
    margin: .5rem;
    border: solid white 2px;
    border-radius: 5px;
}

/* .my-card:hover .artwork-name>a {
    color: red;
} */
</style>