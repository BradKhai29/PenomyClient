<template>
    <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
            <q-img class="my-image" :src="imageUrl" height="280px" />
        </q-card-section>
    </q-card>
</template>

<script setup>
import { ref } from 'vue'
import heroAcademia from 'src/assets/hero_academia.jpg'
const imageUrl = ref(heroAcademia)
</script>
