<template>
    <section id="chapter-images-button-group" class="bg-dark-700">
        <div
            class="text-center q-py-md text-subtitle2 text-light text-weight-bold"
        >
            Yêu thích và theo dõi tác phẩm này <br />
            để tiếp thêm động lực cho tác giả
        </div>
    </section>
</template>

<script>
// Import depenedencies section.
import { NumberHelper } from "src/helpers/NumberHelper";

// Import components section.
import FavoriteButton from "./FavoriteButton.vue";
import FollowComicButton from "./FollowComicButton.vue";
import ReportButton from "./ReportButton.vue";

export default {
    name: "ChapterButtonGroup",
    components: {
        // FavoriteButton,
        // FollowComicButton,
        // ReportButton,
    },
    props: {
        totalFavorites: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        calculateTotalFavorites() {
            return NumberHelper.formatNumberShort(this.totalFavorites, 2);
        },
    },
};
</script>
