<template>
    <q-page>
        <ComicDetailSection :comicId="comicId" />
    </q-page>
</template>

<script>
// Import dependencies section.

// Import components section.
import ComicDetailSection from "src/components/pages/artwork/artwork3Page/ComicDetailSection.vue";
import { NumberHelper } from "src/helpers/NumberHelper";

export default {
    components: {
        ComicDetailSection,
    },
    data() {
        return {
            comicId: null,
        };
    },
    beforeMount() {
        // Get the id from the route params to fetch data.
        this.comicId = this.$route.params.artworkId;

        const isValidId = NumberHelper.isNumber(this.comicId);

        if (!isValidId) {
            // Redirect back to homepage when getting invalid id.
            this.$router.push("/");
            return;
        }
    },
};
</script>

<style scoped>
#artwork-detail-breadcrumb,
#artwork-detail-card,
.artwork-detail-section {
    --max-width: 72%;

    max-width: var(--max-width);
    width: var(--max-width);
}
</style>
