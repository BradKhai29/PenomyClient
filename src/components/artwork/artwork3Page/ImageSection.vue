<template>
    <q-card class="my-card" flat>
        <q-card-section horizontal class="image-container">
            <q-img class="my-image" :src="imageUrl" height="280px" width="225px">

                <q-btn no-caps unelevated color="white" text-color="#120E36"
                    class="button-overlay q-py-sm justify-start">
                    <q-icon name="computer" />
                    <span>{{ imageTitle }}</span>
                </q-btn>
            </q-img>

        </q-card-section>

    </q-card>
</template>
<style scoped>
.my-image {
    position: relative;
}

.my-card {
    width: 225px;
    padding-right: 16px;
}

.button-overlay {
    font-weight: bold;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    position: absolute;
    bottom: 8px;
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
