import { NumberHelper } from "src/helpers/NumberHelper";

class FollowedCreatorProfileResponseItem {
    /**
     * @param {String} id Id of this creator.
     * @param {String} nickName Nickname of this creator.
     * @param {String} avatarUrl AvatarURL of this creator profile.
     * @param {Number} totalFollowers The total numbers of followers this creator has.
     * @param {Number} totalArtworks The total numbers of artworks this creator published.
     */
    constructor(id, nickName, avatarUrl, totalFollowers, totalArtworks) {
        this.id = id;
        this.nickName = nickName;
        this.avatarUrl = avatarUrl;
        this.totalFollowers = totalFollowers;
        this.totalArtworks = totalArtworks;
    }

    totalFollowersShort() {
        const precision = 2;
        return NumberHelper.formatNumberShort(this.totalFollowers, precision);
    }

    totalArtworksShort() {
        const precision = 2;
        return NumberHelper.formatNumberShort(this.totalArtworks, precision);
    }

    /**
     * Map the input api response into FollowedCreatorProfileResponseItem instance.
     *
     * @param {FollowedCreatorProfileResponseItem} responseItem The response item to map from.
     * @returns {FollowedCreatorProfileResponseItem} The instance after mapping.
     */
    static mapFrom(responseItem) {
        return new FollowedCreatorProfileResponseItem(
            responseItem.id,
            responseItem.nickName,
            responseItem.avatarUrl,
            responseItem.totalFollowers,
            responseItem.totalArtworks
        );
    }

    /**
     * Map the input array of responseItems to an array of FollowedCreatorProfileResponseItem instance.
     *
     * @param {FollowedCreatorProfileResponseItem[]} responseItems The array of item to map from.
     * @returns {FollowedCreatorProfileResponseItem[]} Array of instance after mapping.
     */
    static mapFromArray(responseItems) {
        const result = responseItems.map((item) => this.mapFrom(item));
        console.log(result);

        return result;
    }
}

export { FollowedCreatorProfileResponseItem };
