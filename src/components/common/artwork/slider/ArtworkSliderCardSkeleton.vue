<template>
    <div class="slider-card-wrapper col-grow">
        <div class="q-py-lg q-px-xl row slider-artwork-card-skeleton">
            <div class="col-9 column">
                <div class="artwork-title flex items-center q-mb-md">
                    <q-skeleton width="100%" height="20px" />
                </div>
                <div class="artwork-chapters flex items-center">
                    <q-skeleton width="100%" height="12px" />
                </div>
                <div
                    class="artwork-categories q-mt-xs q-mb-md flex items-center q-gutter-sm"
                >
                    <q-skeleton width="200px" height="22px" />
                </div>
                <p
                    class="text-subtitle2 text-light q-mb-none column q-gutter-sm"
                >
                    <q-skeleton width="100%" height="48px" />
                </p>
                <div class="flex items-center q-mt-auto">
                    <q-skeleton width="122px" height="44px" />
                </div>
            </div>
            <div class="q-ml-auto col-auto">
                <q-img
                    src="https://excelprodigy.in/wp-content/uploads/2024/01/vertical-placeholder-image.jpg"
                    class="border-radius-sm slider-artwork-image"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArtworkSliderCardSkeleton",
};
</script>
