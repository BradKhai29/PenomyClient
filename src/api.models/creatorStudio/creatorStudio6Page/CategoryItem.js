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
        this.isSelected = isSelected;
        this.matchedSearch = matchedSearch;
    }
}

export { CategoryItem };
