<template>
    <section
        id="artwork-description-section-wrapper"
        class="row justify-center"
    >
        <section
            class="row shadow-2 border-radius-md artwork-description-section"
        >
            <ComicDescriptionSection
                :comicId="comicId"
                :comicDetail="comicDetail"
            />

            <ComicChapterListSection
                :comicId="comicId"
                :creatorId="creatorId"
            />
        </section>
    </section>
</template>

<script>
// Import dependencies section.
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";

// Import components section.
import ComicDescriptionSection from "./ComicDescriptionSection.vue";
import ComicChapterListSection from "./ComicChapterListSection.vue";

export default {
    name: "DescriptionAndChapterSection",
    components: {
        ComicDescriptionSection,
        ComicChapterListSection,
    },
    props: {
        comicId: {
            required: true,
        },
        comicDetail: {
            type: ArtworkDetailResponse,
            required: true,
        },
        creatorId: {
            required: true,
        },
    },
};
</script>
