// Import dependencies section.
import { Auth6ApiHandler } from "src/api.handlers/auth/auth6Page/Auth6ApiHandler";
import { RefreshTokenApiHandler } from "src/api.handlers/auth/common/RefreshTokenApiHandler";
import {
    RefreshTokenResult,
    RefreshTokenResults,
} from "src/api.models/auth/common/RefreshTokenResult";
import { JwtTokenHelper } from "src/helpers/JwtTokenHelper";

// Constant keys for later operation with local-storage.
const accessTokenKeyName = "user:access_token";
const refreshTokenKeyName = "user:refresh_token";

/**
 * This class is used internally by the Internal Manager of authStore.
 */
class TokenBag {
    /**
     * @param {String} accessToken The access token that stored in this bag.
     * @param {String} refreshToken The refresh token that stored in this bag.
     */
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    /**
     * Check if the current token bag is empty or not
     * by checking its access & refresh token value.
     *
     * @returns {Boolean} The checking result.
     */
    isEmpty() {
        return this.accessToken == null || this.refreshToken == null;
    }

    /**
     * Store the access & refresh token that
     * managed by this token bag to the local storage.
     */
    persistToLocalStorage() {
        localStorage.setItem(accessTokenKeyName, this.accessToken);
        localStorage.setItem(refreshTokenKeyName, this.refreshToken);
    }

    /**
     * Clear all tokens that contained in this token bag
     * and in the local storage.
     */
    clear() {
        this.accessToken = null;
        this.refreshToken = null;

        localStorage.removeItem(accessTokenKeyName);
        localStorage.removeItem(refreshTokenKeyName);
    }

    /**
     * Return an access token with Bearer prefix.
     *
     * @returns {String} Access token with bearer prefix.
     */
    bearerAccessToken() {
        return `Bearer ${this.accessToken}`;
    }

    /**
     * Get all the access tokens and refresh token that
     * stored in the user local-storage and return a token bag instance
     * with tokens that loaded successfully.
     *
     * @returns {TokenBag} The token bag that contains all loaded tokens.
     */
    static loadTokenBagFromLocalStorage() {
        let accessToken = localStorage.getItem(accessTokenKeyName);
        let refreshToken = localStorage.getItem(refreshTokenKeyName);

        // If the loading tokens are empty then remove
        // these tokens from the local-storage.
        if (!accessToken || accessToken.length == 0) {
            localStorage.removeItem(accessTokenKeyName);
        }

        if (!refreshToken || refreshToken.length == 0) {
            localStorage.removeItem(refreshTokenKeyName);
        }

        return new TokenBag(accessToken, refreshToken);
    }
}

/**
 * Internal manager for the authStore to manage the state.
 */
class AuthStoreInternalManager {
    /**
     * @param {TokenBag} tokenBag The token bag that need to be managed by this manager.
     */
    constructor(tokenBag) {
        this.tokenBag = tokenBag;
        this.isProcessing = false;
        this.isAuthenticated = false;

        // This flag to indicate this manager
        // instance has run its setup method or not
        this.isSetUp = false;
        this.hasSilentOperation = false;
    }

    /**
     * Set up the internal state of this manager. This method will load the tokens
     * that stored from the local-storage and try to validate the schema of the
     * access token.
     *
     * @param {TokenBag} tokenBag The token bag that need to be managed by this manager.
     */
    setUp() {
        // Not retry to process when the set up is completed.
        if (this.isSetUp) {
            return;
        }

        // Get the access & refresh tokens
        // that stored in the local-storage.
        const loadResult = TokenBag.loadTokenBagFromLocalStorage();

        // Checking the schema of the loaded access-token.
        const isValidAccessToken = JwtTokenHelper.validateAccessTokenPayload(
            loadResult.accessToken
        );

        // If valid then set to the token bag, otherwise clear all tokens.
        if (isValidAccessToken) {
            this.tokenBag.accessToken = loadResult.accessToken;
            this.tokenBag.refreshToken = loadResult.refreshToken;
        } else {
            this.tokenBag.clear();
        }
    }

    /**
     * Sign in for the user and save the tokens for later operation.
     *
     * @param {String} accessToken Store the access token of this user.
     * @param {String} refreshToken Store the refresh token of this user.
     */
    signIn(accessToken, refreshToken) {
        this.isAuthenticated = true;
        // Save the tokens.
        this.tokenBag.accessToken = accessToken;
        this.tokenBag.refreshToken = refreshToken;
        this.tokenBag.persistToLocalStorage();
    }

    /**
     * Remove all tokens that managed by this manager.
     */
    signOut() {
        this.tokenBag.clear();
    }

    /**
     * Get the current authenticated state of the user that
     * managed by this manager.
     *
     * @returns {Boolean} True if the user is already authenticated.
     */
    isAuth() {
        return this.isAuthenticated;
    }

    /**
     * Check if the current access token is already expired or not.
     *
     * @returns {Boolean} Return true if already expired.
     */
    isAccessTokenExpired() {
        return JwtTokenHelper.isTokenExpired(this.tokenBag.accessToken);
    }

    /**
     * Return the refresh token that managed by this manager.
     *
     * @returns {String} Value of the refresh token.
     */
    getRefreshToken() {
        return this.tokenBag.refreshToken;
    }

    /**
     * Internal wait to get the access token if the refresh-token operation is not complete.
     *
     * @param {boolean} withBearerPrefix True if want to get the access token with bearer prefix.
     * @returns {Promise<String>} Promise contains the access token value.
     */
    internalWaitToGetAccessTokenAsync(withBearerPrefix) {
        if (!this.isProcessing) {
            return new Promise((resolve) => {
                if (withBearerPrefix) {
                    resolve(this.tokenBag.bearerAccessToken());
                } else {
                    resolve(this.tokenBag.accessToken);
                }
            });
        }

        // Check the isProcessing flag every 50 ms
        const CHECKING_INTERVAL_TIMEOUT = 50;

        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (!this.isProcessing) {
                    // Stop checking once it's false
                    clearInterval(intervalId);

                    if (withBearerPrefix) {
                        resolve(this.tokenBag.bearerAccessToken());
                    } else {
                        resolve(this.tokenBag.accessToken);
                    }
                }
            }, CHECKING_INTERVAL_TIMEOUT);
        });
    }

    /**
     * Return the access token without bearer prefix that managed by this manager.
     *
     * @returns {String} The value of the access token without bearer prefix.
     */
    getAccessToken() {
        return this.tokenBag.accessToken;
    }

    /**
     * Return the access token with bearer prefix that managed by this manager.
     *
     * @returns {String} The value of the access token with bearer prefix.
     */
    getBearerAccessToken() {
        return `Bearer ${this.tokenBag.accessToken}`;
    }

    /**
     * Get the access token asynchronously if the refresh-token operation is not complete.
     *
     * @returns {Promise<String>} Promise contains the access token with bearer prefix.
     */
    getBearerAccessTokenAsync() {
        return this.internalWaitToGetAccessTokenAsync(true);
    }

    /**
     * Verify the both access and refresh tokens
     * that stored in this instance token bag.
     *
     * @returns {Promise<Boolean>} Promise that contains the result of verification.
     */
    async verifyTokensAsync() {
        if (this.tokenBag.isEmpty()) {
            return false;
        }

        // If the current access-token is already expired, then return false.
        const isExpired = JwtTokenHelper.isTokenExpired(
            this.tokenBag.accessToken
        );

        if (isExpired) {
            this.isAuthenticated = false;

            return false;
        }

        // Turn on isProcessing flag when starting the operation.
        this.isProcessing = true;

        const result = await Auth6ApiHandler.verifyTokenAsync(
            this.tokenBag.accessToken,
            this.tokenBag.refreshToken
        );

        if (result) {
            this.isAuthenticated = true;
        }
        // If verify failed, clear the token bag.
        else {
            this.isAuthenticated = false;
            this.tokenBag.clear();
        }

        // Turn off isProcessing flag when the operation is done.
        this.isProcessing = false;

        return result;
    }

    /**
     * Make API call to refresh the current access token. If operation is failed,
     * this method will also clear the token bag and un-authenticated the current user.
     *
     * @returns {Promise<RefreshTokenResult>} The promise contains the result of the operation.
     */
    async refreshTokenAsync() {
        // If the token bag is empty, then can not process the operation.
        if (this.tokenBag.isEmpty()) {
            return RefreshTokenResult.failedWithErrorCode();
        }

        // Turn on the isProcessing flag to start the operation.
        this.isProcessing = true;

        const result = await RefreshTokenApiHandler.refreshTokensAsync(
            this.tokenBag.bearerAccessToken(),
            this.tokenBag.refreshToken
        );

        // If the result success, update the token bag.
        if (result.isSuccess) {
            this.tokenBag.accessToken = result.accessToken;
            this.tokenBag.persistToLocalStorage();

            // Authenticated the current user when operation is succes.
            this.isAuthenticated = true;
        }
        // If the result is not success, check the
        // errorCode for suitable handling process.
        else {
            const isAccessTokenNotExpired =
                result.resultCode ==
                RefreshTokenResults.ACCESS_TOKEN_IS_NOT_EXPIRED.code;

            // If the resultCode is not ACCESS_TOKEN_IS_NOT_EXPIRED,
            // then clear the token bags and notify user to login again.
            if (!isAccessTokenNotExpired) {
                this.tokenBag.clear();

                // Un-authenticate the current user
                this.isAuthenticated = false;
            }
            // Set true if the access token is not expired.
            else {
                result.isSuccess = true;
            }
        }

        // Turn off the isProcessing flag after complete operation.
        this.isProcessing = false;

        return result;
    }

    /**
     * Internal set up the silent refresh token with setTimeout.
     *
     * @param {Number} timeout The timeout in milliseconds to execute the refresh token operation.
     */
    silentRefreshToken(timeout) {
        // Prevent to init more than 1 silent operation.
        if (this.hasSilentOperation) {
            return;
        }

        // Turn on the hasSilentOperation flag and
        // wait until this silent operation completed.
        this.hasSilentOperation = true;

        setTimeout(async () => {
            // Turn on the is processing flag when operation is started.
            this.isProcessing = true;

            // console.log("Start the silent refresh token");

            const result = await this.refreshTokenAsync();

            // Turn off the hasSilentOperation for next silent operation can be executed.
            this.hasSilentOperation = false;

            if (result.isSuccess) {
                // Trigger the setup after 100ms to prevent thread block.
                const SETUP_DELAY_TIMEOUT = 100;

                setTimeout(() => {
                    this.setUpSilentRefreshToken();
                }, SETUP_DELAY_TIMEOUT);
            }

            // Turn off the is processing flag when operation is completed.
            this.isProcessing = false;
            // console.log(this.tokenBag.bearerAccessToken());
        }, timeout);
    }

    /**
     * Silently setup the refresh token operation.
     *
     * @remark This method will only executed when the access-token is valid.
     */
    setUpSilentRefreshToken() {
        const tokenPayload = JwtTokenHelper.decodeJwt(
            this.tokenBag.accessToken
        );

        const DELAY_TIMEOUT = 50; // Delay about 50ms.
        const SILENT_REFRESH_TIMEOUT =
            tokenPayload.exp * 1000 - Date.now() + DELAY_TIMEOUT;

        // console.log("timeout", SILENT_REFRESH_TIMEOUT);

        // If the refresh timeout is negative, execute the
        // refresh token operation then retry to setup again.
        if (SILENT_REFRESH_TIMEOUT <= 0) {
            const refreshTokenPromise = this.refreshTokenAsync();

            refreshTokenPromise.then((refreshResult) => {
                if (refreshResult.isSuccess) {
                    this.silentRefreshToken(SILENT_REFRESH_TIMEOUT);
                }
            });
        }
        // Excecute the silent refresh token.
        else {
            this.silentRefreshToken(SILENT_REFRESH_TIMEOUT);
        }
    }
}

// Init an instance to manage the authStore state internally.
const authStoreManager = new AuthStoreInternalManager(new TokenBag(null, null));
// Set up the manager instance for later operation.
authStoreManager.setUp();

export { authStoreManager };
