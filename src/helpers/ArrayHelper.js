/**
 * Remove an element that at the specified index of the input array.
 *
 * @param {Array} array The array to mutate with.
 * @param {Number} index The index to remove the element.
 * @returns {*} The element that's removed.
 */
function removeAt(array, index) {
    if (index < 0 || index >= array.length) {
        throw Error(`Provided index is invalid, index = ${index}`);
    }

    return array.splice(index, 1)[0];
}

/**
 * Insert a provided element into the specified index of the input array.
 *
 * @param {Array} array The array to mutate with.
 * @param {Number} index The index of an array to insert the element.
 * @param {*} element The element to insert.
 */
function insertAt(array, index, element) {
    if (index < 0 || index >= array.length) {
        throw Error(`Provided index is invalid, index = ${index}`);
    }

    // Insert the element to the specified index.
    array.splice(index, 0, element);
}

/**
 * Clear the array.
 *
 * @param {Array} array The array to be cleared.
 */
function clear(array) {
    if (!array) {
        throw Error(`Provided array is null or undefined`);
    }

    const arrayLength = array.length;
    array.splice(0, arrayLength);
}

const ArrayHelper = {
    removeAt: removeAt,
    insertAt: insertAt,
    clear,
};

export { ArrayHelper };
