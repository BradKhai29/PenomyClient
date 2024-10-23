class PublicLevelItem {
    /**
     *
     * @param {String} label The label of the public level.
     * @param {String} value The value (id) of the public level.
     * @param {Boolean} isChecked To check if the artwork has selected this public level or not.
     */
    constructor(label, value, isChecked) {
        this.label = label;
        this.value = value;
        this.isChecked = isChecked;
    }
}

export { PublicLevelItem };
