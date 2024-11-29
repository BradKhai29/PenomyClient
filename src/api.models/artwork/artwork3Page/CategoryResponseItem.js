class CategoryResponseItem {
    constructor(categoryId, categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    /**
     * Map from the input response item to the CategoryResponseItem instance.
     *
     * @param {CategoryResponseItem} responseItem The response item to map from.
     * @returns {CategoryResponseItem} The instance after mapping.
     */
    static mapFrom(responseItem) {
        return new CategoryResponseItem(
            responseItem.categoryId,
            responseItem.categoryName
        );
    }

    /**
     * Map from the input array of response items to the array of CategoryResponseItem instances.
     *
     * @param {CategoryResponseItem[]} responseItems The array of response item to map from.
     * @returns {CategoryResponseItem[]} The array of instance after mapping.
     */
    static mapFromArray(responseItems) {
        return responseItems.map((item) => this.mapFrom(item));
    }
}

export { CategoryResponseItem };
