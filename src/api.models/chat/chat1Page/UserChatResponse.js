import { MessageChatResponse } from "./MessageChatResponse";

class UserChatResponse {
    /**
     *
     * @param {String} userId Title of current chapter.
     * @param {String} avatarUrl Title of the comic that contains current chapter.
     * @param {String} nickName Description of current chapter.
     * @param {MessageChatResponse[]} messages Upload order of current chapter.
     */
    constructor(
        userId,
        avatarUrl,
        nickName,
        messages
    ) {
        this.userId = userId;
        this.avatarUrl = avatarUrl;
        this.nickName = nickName;
        this.messages = messages;
    }
}

export { UserChatResponse };
