import { RecommendedArtworkResponseItem } from "./RecommendArtworkResponseItem";

class RecommendArtworksByCategoryResponse {
    /**
     * @param {String} categoryId Id of the category to recommend for user.
     * @param {String} categoryName Name of the category to recommend for user.
     * @param {RecommendedArtworkResponseItem[]} recommendedArtworks The list of recommended comics that related to the recommended category.
     */
    constructor(categoryId, categoryName, recommendedArtworks) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.recommendedArtworks = recommendedArtworks;
    }

    /**
     * Map from the input responseItem to an instance of RecommendComicsByCategoryResponse.
     *
     * @param {RecommendArtworksByCategoryResponse} responseItem The response item to map from.
     * @returns {RecommendArtworksByCategoryResponse} The instance after mapping.
     */
    static mapFrom(responseItem) {
        const categoryId = responseItem.categoryId;
        const categoryName = responseItem.categoryName;
        const recommendedComics = responseItem.recommendedArtworks.map((item) =>
            RecommendedArtworkResponseItem.mapFrom(item)
        );

        return new RecommendArtworksByCategoryResponse(
            categoryId,
            categoryName,
            recommendedComics
        );
    }

    /**
     * Map from the input array of responseItems to an array of RecommendComicsByCategoryResponse instances.
     *
     * @param {RecommendArtworksByCategoryResponse[]} responseItems The array of response item to map from.
     * @returns {RecommendArtworksByCategoryResponse[]} The array after mapping.
     */
    static mapFromArray(responseItems) {
        const result = responseItems.map((item) => this.mapFrom(item));

        return result;
    }
}

export { RecommendArtworksByCategoryResponse };
