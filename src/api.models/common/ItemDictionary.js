class Entry {
    /**
     * Constructor to create a new Entry instance to store value.
     *
     * @param {Number} key The key of the entry that contains the artwork list.
     * @param {any} value The value that stored in this entry.
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    /**
     * Map from the input item to the Entry instance.
     *
     * @param {Entry} item The item to map from.
     * @returns {Entry} The instance after mapping.
     */
    static mapFrom(item) {
        return Entry(item.key, item.value);
    }

    /**
     * Map from the input array of items to the array of Entry instance.
     *
     * @param {Entry[]} items The item to map from.
     * @returns {Entry[]} The array of instance after mapping.
     */
    static mapFromArray(items) {
        const result = items.map((item) => this.mapFrom(item));

        return result;
    }
}

class ItemDictionary {
    /**
     * @param {Entry[]} [entries=[]] The list of Entry instances
     * that will be used to store value based on the entry id.
     * This list works as a dictionary with (key=key) and (value=Entry).
     */
    constructor(entries = []) {
        this.entries = entries;
    }

    /**
     * @returns {ItemDictionary} Return a new instance of ItemDictionary.
     */
    static New() {
        return new ItemDictionary();
    }

    length() {
        return this.entries.length;
    }

    /**
     * Add a new Entry into the managed list.
     *
     * @param {Number} key The key to add.
     * @param {any} value The value that will store with this key.
     * @returns {Boolean} The result of adding the entry. If the entry is existed, the result always (false).
     */
    addEntry(key, value) {
        const foundEntry = this.entries.find((entry) => entry.key == key);

        if (foundEntry) {
            return false;
        }

        // Add the entry to the list when not found.
        this.entries.push(new Entry(key, value));

        return true;
    }

    /**
     * Update an existed Entry with new input value.
     *
     * @param {Number} key The key to add.
     * @param {any} value The value that belonged to this key.
     * @returns {Boolean} The result of updating the entry. If the entry is not existed, the result always (false).
     */
    updateEntry(key, value) {
        const foundEntry = this.artworkListEntries.find(
            (entry) => entry.key == key
        );

        if (!foundEntry) {
            return false;
        }

        // Update the artwork list that belonged to this entry.
        foundEntry.value = value;

        return true;
    }

    /**
     * Get the entry item with specified key from this Dictionary.
     *
     * @returns {Entry | null} The found entry or NULL if entry is not found.
     */
    getEntry(key) {
        return this.entries.find((entry) => entry.key == key);
    }

    /**
     * Return the array of all entry items included in this item dictionary.
     *
     * @returns {Entry[]} The array of all entry items included in this item dictionary.
     */
    getAllEntries() {
        return this.entries;
    }

    /**
     * @param {Entry[]} items The array of entries to add.
     */
    addRange(items) {
        this.entries.push(...items);
    }

    /**
     * @param {Entry[]} items The array of entries to load from.
     */
    loadEntries(items) {
        this.entries = items;
    }
}

export { ItemDictionary, Entry };
