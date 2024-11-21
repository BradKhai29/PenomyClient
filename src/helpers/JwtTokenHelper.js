import { DateTimeHelper } from "./DateTimeHelper";

/**
 * This class support for storing the credentials
 * from the jwt-payload after decoding.
 */
class DecodeJwtPayload {
    /**
     * @param {String} sub Contain the id of the user that extracted from the payload
     * @param {String} email The email of the user that extracted from the payload
     * @param {String} role The role name of the user that extracted from the payload
     * @param {String} purpose The purpose of the token that extracted from the payload
     * @param {Number} iat The init datetime in UNIX seconds of the token that extracted from the payload
     * @param {Number} exp The expired datetime in UNIX seconds of the token that extracted from the payload
     */
    constructor(sub, email, role, purpose, iat, exp) {
        this.sub = sub;
        this.email = email;
        this.role = role;
        this.purpose = purpose;
        this.iat = iat;
        this.exp = exp;
    }

    /**
     * Checking if the current token is expired or not.
     *
     * @returns {Boolean} The result of checking.
     */
    isTokenExpired() {
        // Get the current time in seconds
        const currentTime = Math.ceil(Date.now() / 1000);

        return currentTime > this.exp;
    }

    /**
     * Check if the specify claim type is included in current jwt payload.
     *
     * @param {String} claimType The claim type to check.
     * @returns {Boolean} True if the current token payload contains specified claim.
     */
    containsClaim(claimType) {
        return this[claimType] != null;
    }
}

const claimTypes = {
    sub: "sub",
    email: "app-user-email",
    role: "role",
    purpose: "purpose",
    iat: "iat",
    exp: "exp",
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
    const MINIMUM_LENGTH = 10;
    token = String(token);

    if (token == "" || token.length < MINIMUM_LENGTH) {
        return null;
    }

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

        return new DecodeJwtPayload(
            jsonPayload[claimTypes.sub],
            jsonPayload[claimTypes.email],
            jsonPayload[claimTypes.role],
            jsonPayload[claimTypes.purpose],
            jsonPayload[claimTypes.iat],
            jsonPayload[claimTypes.exp]
        );
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Validate the payload of the provided access-token is correct format or not.
 *
 * @param {String} accessToken Access token to validate.
 * @returns {Boolean} The result of validation.
 */
function validateAccessTokenPayload(accessToken) {
    const decodeJwtPayload = decodeJwt(accessToken);

    if (!decodeJwtPayload) {
        return false;
    }

    // Check the purpose of the access-token.
    const ACCESS_TOKEN_PURPOSE = "app-user-access";

    return (
        decodeJwtPayload.purpose == ACCESS_TOKEN_PURPOSE &&
        decodeJwtPayload.containsClaim(claimTypes.sub)
    );
}

/**
 * Check if the input access token is expired or not based on the payload detail.
 *
 * @param {String} accessToken The access token to check.
 */
function isTokenExpired(accessToken) {
    const tokenPayload = decodeJwt(accessToken);

    if (!tokenPayload) {
        return true;
    }

    return tokenPayload.isTokenExpired();
}

const JwtTokenHelper = {
    decodeJwt: decodeJwt,
    validateAccessTokenPayload: validateAccessTokenPayload,
    isTokenExpired: isTokenExpired,
};

export { JwtTokenHelper, DecodeJwtPayload };
