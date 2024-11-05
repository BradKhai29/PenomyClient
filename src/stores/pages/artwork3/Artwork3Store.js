import { defineStore } from "pinia";

const useArtwork3Store = defineStore("artwork3Store", {
    state: () => ({
        commentProps: {
            /**
             * @type {Number} The id of current comment.
             */
            id: "123",
            /**
             * @type {String} The user avatar of current comment.
             */
            avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
            /**
             * @type {String} The user name of current comment.
             */
            username: "username",
            /**
             * @type {String} The post time of current comment.
             */
            postDime: "today",
            /**
             * @type {String} The content of current comment.
             */
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut doloribus maiores repellat sit, ad fuga nihil fugiat adipisci voluptate aliquid eum corrupti reiciendis, nam explicabo accusantium vitae voluptatum dolore asperiores?",
            /**
             * @type {Number} The total likes of current comment.
             */
            likeCount: 10,
            /**
             * @type {Number} The total replys of current comment.
             */
            totalReplies: 0,
            /**
             * @type {Boolean} Check if the current user is the author of current artwork.
             */
            isAuthor: true,
            /**
             * @type {Boolean} Check if the current user has liked the comment.
             */
            isLiked: false,
        },

        /**
         * @type {Boolean} Check if the comment has been created.
         */
        isCommentCreated: false,
        /**
         * @type {Boolean} Check if the reply has been created.
         */
        isReplyCreated: false,
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
        /**
         * Check if the comment has been created.
         *
         * @returns {Boolean} Check if the comment has been created.
         */
        getIsCommentCreated() {
            return this.isCommentCreated;
        },
        /**
         * Check if the reply has been created.
         *
         * @returns {Boolean} Check if the reply has been created.
         */
        getIsReplyCreated() {
            return this.isReplyCreated;
        },

        /**
         * Get comment props.
         *
         * @returns {Object} The comment props.
         */
        getCommentProps() {
            return this.commentProps;
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
        /**
         * Set new total reply to comment props.
         *
         * @param {Boolean} isCommentCreated Value to set new.
         */
        setIsCommentCreated(isCommentCreated) {
            this.isCommentCreated = isCommentCreated;
        },
        /**
         * Set new total reply to comment props.
         *
         * @param {Boolean} isReplyCreated Value to set new.
         */
        setIsReplyCreated(isReplyCreated) {
            this.isReplyCreated = isReplyCreated;
        },

        /**
         * Set new comment props.
         *
         * @param {Object} commentProps Value to set new.
         */
        setCommentProps(commentProps) {
            this.commentProps = commentProps;
        },

        getCommentsFromAPI(artworkId) {
            
        },
    },

    
});

export { useArtwork3Store };
