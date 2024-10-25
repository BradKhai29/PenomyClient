class CategoryItem {
    /**
     * Constructor to create a new category item.
     * @param {String} id Id of the category item.
     * @param {String} label Label of the category item.
     * @param {Boolean} isSelected Specified if the current category item is selected or not. (Default is false)
     * @param {Boolean} matchedSearch Specified if the current category item is matched when quick search. (Default is false)
     */
    constructor(id, label, isSelected = false, matchedSearch = false) {
        this.id = id;
        this.label = label;
        this.isSelected = isSelected ?? false;
        this.matchedSearch = matchedSearch ?? false;
    }

    /**
     * Map the input api response into an array of CategoryItem.
     *
     * @param {CategoryItem[]} responseBody The api resposne body to map.
     * @returns {CategoryItem[]} An array of CategoryItem.
     */
    static asArray(responseBody) {
        const categories = [];

        for (const item of responseBody) {
            const category = new CategoryItem(item.id, item.label);

            categories.push(category);
        }

        return categories;
    }
}

export { CategoryItem };
