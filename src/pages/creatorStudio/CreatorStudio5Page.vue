<template>
    <q-page>
        <section v-if="!isLoading">
            <ArtworkDetailCard
                v-for="artwork in artworks"
                :key="artwork.id"
                :artworkId="artwork.id"
                v-bind="artwork"
            />
        </section>
    </q-page>
</template>

<script>
import {
    CreatorStudio5ApiHandler,
    ArtworkTypes,
} from "src/api.handlers/creatorStudio/creatorStudio5Page/CreatorStudio5ApiHandler";

import ArtworkDetailCard from "src/components/pages/creatorStudio/creatorStudio5Page/ArtworkDetailCard.vue";
import { ArtworkDetailResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/ArtworkDetailResponseItem";

export default {
    components: {
        ArtworkDetailCard,
    },
    data() {
        return {
            isLoading: true,
            /**
             * @type {ArtworkDetailResponseItem} The list of artworks to display.
             */
            artworks: [],
        };
    },
    async mounted() {
        const artworkType = ArtworkTypes.COMIC;
        const pageNumber = 1;

        const result =
            await CreatorStudio5ApiHandler.getArtworksByTypeWithPaginationAsync(
                artworkType,
                pageNumber
            );

        if (result) {
            result.forEach((item) => this.artworks.push(item));
        }

        this.isLoading = false;
    },
};
</script>
