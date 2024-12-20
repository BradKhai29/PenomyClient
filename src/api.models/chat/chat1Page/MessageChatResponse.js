class MessageChatResponse {
    /**
     *
     * @param {String} content Title of current chapter.
     * @param {String} time Title of the comic that contains current chapter.
     * @param {Boolean} isReply Description of current chapter.
     * @param {Number} replyMessageId Upload order of current chapter.
     */
    constructor(
        content,
        time,
        isReply,
        replyMessageId
    ) {
        this.content = content;
        this.time = time;
        this.isReply = isReply;
        this.replyMessageId = replyMessageId;
    }
}

export { MessageChatResponse };
