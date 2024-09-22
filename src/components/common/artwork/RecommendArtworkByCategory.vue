<template>
    <div class="text-h6 q-pa-sm">Các bản phim đáng mà quan tâm</div>
    <div class="row q-col-gutter-lg q-pa-sm">
        <div class="col-2" v-for="n in 16" :key="`md-${n}`">
            <artwork-card />
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import ArtworkCard from 'src/components/common/artwork/ArtworkByCategoryCard.vue';

</script>