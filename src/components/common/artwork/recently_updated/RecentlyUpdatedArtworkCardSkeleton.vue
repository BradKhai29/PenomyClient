<template>
    <div class="row shadow-1 border-radius-sm">
        <div>
            <!-- Artwork image section -->
            <q-img
                src="https://excelprodigy.in/wp-content/uploads/2024/01/vertical-placeholder-image.jpg"
                class="recently-updated-artwork-image border-radius-sm shadow-1"
            />
            <!-- Artwork image section -->
        </div>
        <div class="q-pa-sm q-pl-md col-grow column bg-light-100">
            <q-skeleton width="84%" height="28px" />
            <div class="flex items-center q-my-sm">
                <q-skeleton type="circle" width="32px" height="32px" />
                <q-skeleton width="100px" height="24px" class="q-ml-sm" />
            </div>
            <q-skeleton width="80px" height="30px" class="q-mt-auto" />
        </div>
    </div>
</template>

<script>
export default {
    name: "RecentlyUpdatedArtworkCardSkeleton",
};
</script>

<style scoped>
.recently-updated-artwork-image {
    --min-width: 140px;
    --ratio: 0.788;
    --height: calc(var(--min-width) / var(--ratio));

    min-width: var(--min-width);
    height: var(--height);
}
</style>
