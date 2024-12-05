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
     * @returns {ItemDictionary} Return a new instance of ArtworkPaginationManager.
     */
    static New() {
        return new ItemDictionary();
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
}

export { ItemDictionary, Entry };
