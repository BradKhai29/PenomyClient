<template>
    <q-card class="my-card" flat bordered>
        <q-card-section horizontal class="image-container">
            <q-img class="my-image" :src="imageUrl" height="280px" />
            <q-btn unelevated color="white" text-color="#120E36" class="button-overlay q-py-sm">
                <q-icon name="ion-desktop" />
                <span>{{ imageTitle }}</span>
            </q-btn>

        </q-card-section>

    </q-card>
</template>
<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif;
}

.my-image {
    position: relative;
}

.button-overlay {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
}
</style>

<script setup>
import { ref } from 'vue'
import heroAcademia from 'src/assets/hero_academia.jpg'
const imageUrl = ref(heroAcademia)
const imageTitle = ref('Có hoạt hình')
</script>
