<template>
    <div class="recommended-artwork-skeleton">
        <div class="relative-position">
            <!-- Skeleton image section -->
            <q-img
                src="https://excelprodigy.in/wp-content/uploads/2024/01/vertical-placeholder-image.jpg"
                class="recommended-artwork-image border-radius-sm shadow-1"
            />
            <!-- Skeleton image section -->
        </div>
        <div class="q-mt-sm flex items-center">
            <q-skeleton height="20px" width="180px" />
            <q-btn
                disable
                class="q-ml-auto text-dark"
                dense
                flat
                no-cap
                padding="1px"
                icon="more_vert"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "RecommendedArtworkCardSkeleton",
};
</script>

<style scoped>
.recommended-artwork-image {
    --max-width: 208px;
    --ratio: 0.778;
    --height: calc(var(--max-width) / var(--ratio));

    width: var(--max-width) !important;
    height: var(--height);
}
</style>
