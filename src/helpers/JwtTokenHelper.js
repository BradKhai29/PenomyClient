/**
 * This class support for storing the credentials
 * from the jwt-payload after decoding.
 */
class DecodeJwtPayload {
    /**
     * @param {String} userId The id of the user that extracted from the payload
     * @param {String} email The email of the user that extracted from the payload
     * @param {String} role The role name of of the user that extracted from the payload
     */
    constructor(userId, email, role) {
        this.userId = userId;
        this.email = email;
        this.role = role;
    }
}

const claimTypes = {
    userId: "userId",
    email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    role: "role",
};

/**
 * Decode the payload of a JWT token.
 *
 * This method takes a JWT token as input, splits it into its three parts (header, payload, signature),
 * decodes the payload from base64, and returns the parsed JSON object.
 *
 * @param {string} token - The JWT token string to be decoded its payload.
 * @returns {DecodeJwtPayload} Returns the decoded payload as a DecodeJwtPayload instance, or null if parsing fails.
 */
function decodeJwt(token) {
    try {
        // Split the token into its three parts: header, payload, and signature
        const parts = token.split(".");

        if (parts.length !== 3) {
            return null;
        }

        // Get the payload and decode it.
        const payload = parts[1];

        // Decode from base64 (with URL-safe base64 decoding)
        const decodedPayload = atob(
            payload.replace(/-/g, "+").replace(/_/g, "/")
        );

        // Parse the decoded payload string into a JSON object
        const jsonPayload = JSON.parse(decodedPayload);

        console.log(jsonPayload);

        return new DecodeJwtPayload(
            jsonPayload[claimTypes.userId],
            jsonPayload[claimTypes.email],
            jsonPayload[claimTypes.role]
        );
    } catch (error) {
        return null;
    }
}

const JwtTokenHelper = {
    decodeJwt: decodeJwt,
};

export { JwtTokenHelper, DecodeJwtPayload };
