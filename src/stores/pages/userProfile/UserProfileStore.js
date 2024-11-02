import { defineStore } from "pinia";
import {
    GetPageCount,
    GetArtworksByType,
} from "src/api.handlers/userProfile/UserProfile1Page";
import { ArtworkType } from "src/api.common/ArtworkType";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import axios from "axios";

const userProfileStore = defineStore("userCreateArtwork", {
    state: () => ({
        Comics: [],
        Animations: [],
        Series: [],
        comicsPageCount: 0,
        animationsPageCount: 0,
        seriesPageCount: 0,
    }),
    actions: {
        addCreatedComic(comic) {
            this.createdComics.push(comic);
        },
        addCreatedAnimation(animation) {
            this.createdAnimations.push(animation);
        },
        addCreatedSeries(series) {
            this.createdSeries.push(series);
        },
        async setPageCount(artworkType) {
            var apiURL = "";
            if (
                artworkType === ArtworkType.COMIC ||
                artworkType === ArtworkType.ANIMATION
            )
                apiURL = `${BaseWebApiUrl}/art1/pagination`;
            else apiURL = `${BaseWebApiUrl}/art3/pagination`;

            await axios({
                url: apiURL,
                method: HttpMethod.GET,
                params: {
                    artworkType: artworkType,
                },
            }).then((response) => {
                if (artworkType === ArtworkType.COMIC)
                    this.comicsPageCount = response.data.body;
                else if (artworkType === ArtworkType.ANIMATION)
                    this.animationsPageCount = response.data.body;
                else if (artworkType === ArtworkType.SERIES)
                    this.seriesPageCount = response.data.body;
            });
        },
        async GetArtworksByType(artworkType, currentPage) {
            var apiURL = "";
            if (
                artworkType === ArtworkType.COMIC ||
                artworkType === ArtworkType.ANIMATION
            )
                apiURL = `${BaseWebApiUrl}/user-profile/created-artworks`;
            else apiURL = `${BaseWebApiUrl}/user-profile/created-series`;
            await axios({
                url: apiURL,
                method: HttpMethod.GET,
                params: {
                    artworkType: artworkType,
                    currentPage: currentPage,
                },
            }).then((response) => {
                if (artworkType === ArtworkType.COMIC)
                    this.createdComics = response.data.body;
                else if (artworkType === ArtworkType.ANIMATION)
                    this.createdAnimations = response.data.body;
                else if (artworkType === ArtworkType.SERIES)
                    this.createdSeries = response.data.body;
            });
        },
    },
    getters: {
        Comics() {
            return this.Comics;
        },
        Animations() {
            return this.Animations;
        },
        Series() {
            return this.Series;
        },
        comicsPageCount() {
            return this.comicsPageCount;
        },
        animationsPageCount() {
            return this.animationsPageCount;
        },
        seriesPageCount() {
            return this.seriesPageCount;
        },
    },
});

export { userProfileStore };