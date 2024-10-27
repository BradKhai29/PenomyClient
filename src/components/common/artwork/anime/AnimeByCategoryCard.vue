<template>
    <div @click="$router.push(`artwork/comic/${artwork.id}`)">
        <q-card class="my-card bg-grey-2" bordered>
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
                <div class="overlay"><q-icon class="play-icon" name="play_arrow" color="white" size="4rem" /></div>
            </q-card-section>

        </q-card>
        <div class="artwork-name">
            <a href="#">{{ shortTitle }}</a>
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
import { ref } from 'vue'
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
    height: 360px;
    cursor: pointer;
    /* margin-bottom: 3rem; */
}

.my-card :first-child {
    border-radius: 5px;
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
    border-radius: 100px !important;
    transition: transform 0.2s;
    transform: scale(0.1);
}

.my-card:hover .overlay {
    visibility: visible;
}

.my-card:hover .play-icon {
    transform: scale(1);
}

.my-card:hover .artwork-name>a {
    /* transform:  0.2s; */
    color: red;
}
</style>