<template>
    <q-btn
        id="favorite-btn"
        rounded
        no-caps
        unelevated
        class="shadow-1 bg-primary"
        @click="isFavoriteRef = !isFavoriteRef"
    >
        <q-icon
            name="favorite"
            :class="isFavoriteRef ? 'text-secondary-500' : 'text-dark'"
        />
        <span class="q-ml-xs text-weight-bold text-subtitle2 text-dark">
            {{ totalFavoritesComputed }}
        </span>
    </q-btn>
</template>

<script>
// Import dependencies section.
import { NumberHelper } from "src/helpers/NumberHelper";

export default {
    name: "FavoriteButton",
    props: {
        chapterId: {
            required: true,
        },
        totalFavorites: {
            type: Number,
            required: true,
        },
        isFavorite: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            totalFavoritesRef: null,
            isFavoriteRef: false,
        };
    },
    computed: {
        totalFavoritesComputed() {
            return NumberHelper.formatNumberShort(this.totalFavoritesRef, 2);
        },
    },
    beforeMount() {
        // Mount the related data from props.
        this.totalFavoritesRef = this.totalFavorites;
        this.isFavoriteRef = this.isFavorite;
    },
};
</script>
