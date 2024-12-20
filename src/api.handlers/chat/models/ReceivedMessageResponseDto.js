class ReceivedMessageResponseDto {
    constructor(groupId, senderId, message) {
        this.groupId = groupId;
        this.senderId = senderId;
        this.message = message;
    }

    /**
     *
     * @param {ReceivedMessageResponseDto} responseItem Item to map.
     * @returns {ReceivedMessageResponseDto} Instance after mapping.
     */
    static mapFrom(responseItem) {
        return new ReceivedMessageResponseDto(
            responseItem.groupId,
            responseItem.senderId,
            responseItem.message
        );
    }

    isCurrentUser(userIdToCompare) {
        return this.senderId == userIdToCompare;
    }
}

export { ReceivedMessageResponseDto };
