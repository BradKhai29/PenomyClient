class OriginItem {
    /**
     *
     * @param {String} id The Id of the origin country.
     * @param {String} label The label of the origin country.
     * @param {Boolean} isChecked To check if the artwork has selected this origin or not.
     */
    constructor(id, label, isChecked) {
        this.id = id;
        this.label = label;
        this.isChecked = isChecked;
    }
}

export { OriginItem };
