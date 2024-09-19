<template>
    <div class="row">
        <artwork-card v-for="n in 4" :key="`md-${n}`" />
    </div>
</template>
<script setup>
import ArtworkCard from 'src/components/common/artwork/RecentlyUpdatedArtworkCard.vue';

</script>