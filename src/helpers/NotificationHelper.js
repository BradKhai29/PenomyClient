import { Notify } from "quasar";
import { StringHelper } from "./StringHelper";

class NotificationOptions {
    /**
     * Constructor to initialize a new notification options instance.
     *
     * @param {String} color The color of the notification popup.
     * @param {String} textColor The text color for the notification content.
     * @param {String} icon The icon of the notification popup.
     */
    constructor(color, textColor, icon) {
        this.color = color;
        this.textColor = textColor;
        this.icon = icon;
    }
}

// Pre-defefined notification options.
const errorOptions = new NotificationOptions("negative", "light", "report");
const successOptions = new NotificationOptions("positive", "light", "check");

const topPosition = "top";

/**
 * Notify a message with specified input options.
 *
 * @param {String} message The message to show in the popup.
 * @param {NotificationOptions} options The options for configuring the notification popup.
 * @param {String} [position=topPosition] The position of the popup (top, bottom, left, right). Default value is top.
 */
function notify(message, options, position = topPosition) {
    const notificationRandomId = StringHelper.generateSecureRandomString(6);
    const notificationClasses = `penomy-notification notification_${notificationRandomId}`;

    const dismiss = Notify.create({
        color: options.color,
        textColor: options.textColor,
        icon: options.icon,
        position: position,
        message: message,
        classes: [notificationClasses],
    });

    // Wait about 100ms to let the notification element to display
    // to set the onclick event to that element.
    const WAIT_FOR_NOTIFICATION_ELEMENT_TO_DISPLAY_TIMEOUT = 150;
    const notificationElementSelector = `.penomy-notification.notification_${notificationRandomId}`;

    setTimeout(() => {
        try {
            const notificationElement = document.querySelector(
                notificationElementSelector
            );

            notificationElement.addEventListener("click", () => dismiss());
        } catch (error) {
            // console.log(error);
        }
    }, WAIT_FOR_NOTIFICATION_ELEMENT_TO_DISPLAY_TIMEOUT);
}

/**
 * A shorthand of notify method to display success notification popup.
 *
 * @param {String} message The message to show in the popup.
 * @param {String} [position=topPosition] The position of the popup (top, bottom, left, right). Default value is top.
 */
function notifySuccess(message, position = topPosition) {
    notify(message, successOptions, position);
}

/**
 * A shorthand of notify method to display error notification popup.
 *
 * @param {String} message The message to show in the popup.
 * @param {String} [position=topPosition] The position of the popup (top, bottom, left, right). Default value is top.
 */
function notifyError(message, position = topPosition) {
    notify(message, errorOptions, position);
}

const NotificationHelper = {
    notificationOptions: {
        errorOptions,
        successOptions,
    },
    notify: notify,
    notifyError: notifyError,
    showError: notifyError,
    notifySuccess: notifySuccess,
    showSuccess: notifySuccess,
};

export { NotificationHelper, NotificationOptions };
