import { ArtworkDetailResponseItem } from "../creatorStudio/creatorStudio5Page/ArtworkDetailResponseItem";

class ArtworkListEntry {
    /**
     * Constructor to create a new ArtworkListEntry instance to store the artwork list.
     *
     * @param {Number} key The key of the entry that contains the artwork list.
     * @param {ArtworkDetailResponseItem[]} artworkList The artwork list that stored in this entry.
     */
    constructor(key, artworkList) {
        this.key = key;
        this.artworkList = artworkList;
    }
}

/**
 * The manager object that support the artwork pagination.
 */
class ArtworkPaginationManager {
    /**
     * @param {ArtworkListEntry[]} [artworkListEntries=[]] The list of ArtworkListEntry instances
     * that will be used to store the list of artwork based on the entry id.
     * This list works as a dictionary with (key=key) and (value=ArtworkListEntry).
     * @param {Number} totalArtworks The total artworks of all entry that managed by this manager object.
     */
    constructor(artworkListEntries = [], totalArtworks) {
        this.artworkListEntries = artworkListEntries;
        this.totalArtworks = totalArtworks ?? 0;
    }

    /**
     * @returns {ArtworkPaginationManager} Return a new instance of ArtworkPaginationManager.
     */
    static New() {
        return new ArtworkPaginationManager();
    }

    /**
     * Add a new ArtworkListEntry into the managed list.
     *
     * @param {Number} key The key to add.
     * @param {ArtworkDetailResponseItem[]} artworkList The artworkList that belonged to this key.
     * @returns {Boolean} The result of adding the entry. If the entry is existed, the result always (false).
     */
    addEntry(key, artworkList) {
        const foundEntry = this.artworkListEntries.find(
            (entry) => entry.key == key
        );

        if (foundEntry) {
            return false;
        }

        // Add the entry to the list when not found.
        this.artworkListEntries.push(new ArtworkListEntry(key, artworkList));
        this.totalArtworks += artworkList.length;

        return true;
    }

    /**
     * Update an existed ArtworkListEntry in the managed list
     * with new ArtworkList by the specified artworkId.
     *
     * @param {Number} key The key to add.
     * @param {ArtworkDetailResponseItem[]} artworkList The artworkList that belonged to this key.
     * @returns {Boolean} The result of updating the entry. If the entry is not existed, the result always (false).
     */
    updateEntry(key, artworkList) {
        const foundEntry = this.artworkListEntries.find(
            (entry) => entry.key == key
        );

        if (!foundEntry) {
            return false;
        }

        // Update the artwork list that belonged to this entry.
        foundEntry.artworkList = artworkList;
        return true;
    }

    /**
     * Get the entry item with specified key from this manager.
     *
     * @returns {ArtworkListEntry} The found entry.
     */
    getEntry(key) {
        return this.artworkListEntries.find((entry) => entry.key == key);
    }

    getTotalArtworks() {
        return this.totalArtworks;
    }
}

export { ArtworkPaginationManager, ArtworkListEntry };
