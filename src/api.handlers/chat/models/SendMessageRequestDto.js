class SendMessageRequestDto {
    constructor(groupId, senderId, message) {
        this.groupId = groupId;
        this.senderId = senderId;
        this.message = message;
    }
}

export { SendMessageRequestDto };
