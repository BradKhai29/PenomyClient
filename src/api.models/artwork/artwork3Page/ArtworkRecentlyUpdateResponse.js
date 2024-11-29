class ArtworkRecentlyUpdateResponse {
    constructor(
        artworkId,
        favorite,
        flagUrl,
        lastUpdateAt,
        rating,
        supplier,
        thumbnail,
        title
    ) {
        this.artworkId = artworkId;
        this.favorite = favorite;
        this.flagUrl = flagUrl;
        this.lastUpdateAt = lastUpdateAt;
        this.rating = rating;
        this.supplier = supplier;
        this.thumbnail = thumbnail;
        this.title = title;
    }
}

export { ArtworkRecentlyUpdateResponse };
