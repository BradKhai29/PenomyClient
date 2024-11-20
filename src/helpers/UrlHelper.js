/**
 * Copy the current url to user clipboard.
 */
function copyCurrentUrlToClipBoard() {
    const currentUrl = window.location.href;

    // Copy the current url into user clipboard.
    navigator.clipboard.writeText(currentUrl);
}

/**
 * Get the current host URL of from the current page.
 *
 * @reference Stackoverflow: https://stackoverflow.com/questions/6042007/how-to-get-the-host-url-using-javascript-from-the-current-page
 * @returns The host URL including the protocol (http / https)
 */
function getHostUrl() {
    return window.location.protocol + "//" + window.location.host;
}

const UrlHelper = {
    copyCurrentUrlToClipBoard: copyCurrentUrlToClipBoard,
    getHostUrl,
};

export { UrlHelper };
