<template>
    <q-card-section horizontal class="image-container">
        <div class="image-wrapper">
            <q-img class="cover-image" :src="imageUrl" width="100px" height="100px" />
            <q-chip size="sm" class="rating-chip" dense square>
                <q-icon name="star" />
                4.8
            </q-chip>
        </div>
        <div class="icon-container flex-center">
            <q-icon name="looks_one" class="icon flex-center justify-center" />
        </div>
        <div class="right-content q-pl-xs">
            <div class="genre">
                {{ genre }}
            </div>
            <div class="title">
                {{ title }}
            </div>
            <div class="author">
                {{ author }}
            </div>
        </div>
    </q-card-section>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import heroAcademia from 'src/assets/hero_academia.jpg'

const props = defineProps({
    genre: String,
    title: String,
    author: String,
    imgUrl: String
})

const imageUrl = ref(heroAcademia)
</script>

<style scoped>
.image-wrapper {
    position: relative;
    display: inline-block;
}


.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
}

.rating-chip {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0px;
    padding: 12px;
    background-color: #53BF94;
}

.right-content {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.title {
    font-weight: bold;
}
</style>
style
