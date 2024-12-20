import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import {
    HttpTransportType,
    HubConnectionBuilder,
    HubConnection,
    LogLevel,
    HubConnectionState,
} from "@microsoft/signalr";
import axios from "axios";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import { SendMessageRequestDto } from "./models/SendMessageRequestDto";
const authStore = useAuthStore();

// Internal state to for hub connection.
const handlerManager = {
    /**
     * @type {HubConnection} Connection of signalR to server for chatting.
     */
    connection: null,
};

// Support constants.
const chatServerMethods = {
    sendMessage: "SendMessage",
};

const clientMethods = {
    receiveMessage: "receiveMessage",
};

/**
 * Connect the current user to the chat hub.
 */
async function connectChatHubAsync() {
    try {
        const connectionBuilder = new HubConnectionBuilder();

        const hubApiUrl = `${BaseWebApiUrl}/signalr/chat`;

        const chatHubConnection = connectionBuilder
            .withUrl(hubApiUrl, {
                accessTokenFactory: () => authStore.accessToken(),
            })
            .configureLogging(LogLevel.Information)
            .build();

        try {
            await chatHubConnection.start();
            console.log(chatHubConnection);

            handlerManager.connection = chatHubConnection;
            console.log("Connect success");
        } catch (error) {
            console.log(error);
        }
    } catch (error) {}
}

/**
 * Add handle methods for the connection.
 *
 * @param {String} methodName The name of handle method.
 * @param {VoidCallback} methodCallback The method callback corresponding to method name.
 */
function addConnectionHandleMethods(methodName, methodCallback) {
    try {
        const chatHubConnection = handlerManager.connection;

        chatHubConnection.on(methodName, methodCallback);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Send message to server.
 * @param {string} groupId Id of group to send
 * @param {string} senderId Id of sender.
 * @param {string} message Message content.
 */
async function sendMessageAsync(groupId, senderId, message) {
    try {
        const messageDetail = new SendMessageRequestDto(
            groupId,
            senderId,
            message
        );

        // Invoke send message methods on server.
        console.log(handlerManager.connection);
        // const chatHubConnection = handlerManager.connection;

        handlerManager.connection.invoke(
            chatServerMethods.sendMessage,
            messageDetail.groupId,
            messageDetail.senderId,
            messageDetail.message
        );

        return true;
    } catch (error) {
        console.log(error);
    }
}

const ChatHubApiHandler = {
    connectChatHubAsync,
    sendMessageAsync,
    addConnectionHandleMethods,
};

export { ChatHubApiHandler, clientMethods };
