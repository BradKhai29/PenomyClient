<template>
    <div
        class="row items-center"
        :class="
            invisible
                ? 'invisible-border'
                : 'border-sm-top-light-500 border-sm-bottom-light-500'
        "
    >
        <!-- Image skeleton section -->
        <div class="chapter-image" :class="invisible ? 'invisible' : ''" />
        <!-- Image skeleton section -->

        <section class="col-grow q-pl-md q-pr-sm">
            <div
                id="chapter_header"
                class="row text-subtitle2 items-center text-dark justify-between"
            >
                <div
                    class="skeleton-text-sm"
                    :class="invisible ? 'invisible' : ''"
                />
            </div>
            <div class="q-mt-sm">
                <div
                    class="skeleton-text-md"
                    :class="invisible ? 'invisible' : ''"
                />
            </div>
            <div class="q-mt-sm">
                <div
                    class="skeleton-text-md"
                    :class="invisible ? 'invisible' : ''"
                />
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "ComicChapterSkeletonCard",
    props: {
        /**
         * Indicate to turn on the invisible mode.
         */
        invisible: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
* {
    --skeleton-bg-color: rgba(0, 0, 0, 0.16);
}

.chapter-image {
    --image-width: 100px;

    width: var(--image-width);
    height: var(--image-width);
    background-color: var(--skeleton-bg-color);
}

.chapter-image.invisible {
    background-color: transparent !important;
}

.invisible-border {
    border-top: 1px solid transparent !important;
    border-bottom: 1px solid transparent !important;
}

.skeleton-text-sm {
    width: 48px;
    height: 22px;
    background-color: var(--skeleton-bg-color);
}

.skeleton-text-sm.invisible {
    background-color: transparent !important;
}

.skeleton-text-md {
    width: 100%;
    height: 24px;
    background-color: var(--skeleton-bg-color);
}

.skeleton-text-md.invisible {
    background-color: transparent !important;
}
</style>
