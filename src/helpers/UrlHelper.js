/**
 * Copy the current url to user clipboard.
 */
function copyCurrentUrlToClipBoard() {
    const currentUrl = window.location.href;

    // Copy the current url into user clipboard.
    navigator.clipboard.writeText(currentUrl);
}

const UrlHelper = {
    copyCurrentUrlToClipBoard: copyCurrentUrlToClipBoard,
};

export { UrlHelper };
