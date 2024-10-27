import { defineStore } from "pinia";

const useArtwork3Store = defineStore("artwork3Store", {
    state: () => ({
        commentProps: {
            /**
             * @type {Number} The id of current comment
             */
            commentId: 0,
            /**
             * @type {Number} The total reply comment has been created.
             */
            totalReply: 0,
        },
    }),

    getters: {
        /**
         * Get the total replys.
         *
         * @returns {Number} The total replys of current comment.
         */
        getTotalReply() {
            return this.commentProps.totalReply;
        },
        /**
         * Get comment id.
         *
         * @returns {Number} The id of current comment.
         */
        getCommentId() {
            return this.commentProps.commentId;
        },
    },

    actions: {
        /**
         * Set new total replys to comment props.
         *
         * @param {Number} commentId Value to set new.
         */
        setCommentId(commentId) {
            this.commentProps.commentId = commentId;
        },
        /**
         * Set new total reply to comment props.
         *
         * @param {Number} totalReply Value to set new.
         */
        setTotalReply(totalReply) {
            this.commentProps.totalReply = totalReply;
        },
    },
});

export { useArtwork3Store };
