import axios from "axios";

/**
 * Fetches the background image URL for the given artwork ID and updates the backgroundImageUrl reactive ref with the URL.
 * @param {number} id The artwork ID.
 * @returns {Promise<void>}
 */
function fetchBackgroundImage(id) {
    axios
        .get("https://api.example.com/get-image-url/${id}")
        .then((response) => {
            backgroundImageUrl.value = response.data.imageUrl; // Adjust this based on your API response
        })
        .catch((error) => {
            console.error("Failed to fetch image URL", error);
        });
}

const getBackgroundImageUrl = {
    fetchBackgroundImage,
};

export { getBackgroundImageUrl };
