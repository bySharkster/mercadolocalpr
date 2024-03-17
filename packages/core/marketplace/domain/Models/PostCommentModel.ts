/**
 * Represents the model for a post comment, encapsulating properties that detail
 * the comment itself, its association with a post and the user who made the comment,
 * as well as metadata like creation time.
 *
 * @class PostCommentModel
 */
export default class PostCommentModel {
    /**
     * Initializes a new instance of the PostCommentModel class with specified details about a post comment.
     * This model is used throughout the application to handle and transfer post comment data.
     *
     * @constructor
     * @param {string} commentId - Unique identifier for the comment.
     * @param {string} postId - Identifier of the post to which this comment belongs.
     * @param {string} commentorId - Identifier of the user who made the comment.
     * @param {boolean} isSeller - Flag indicating whether the commenter is the seller of the post item.
     * @param {string} comment - The actual comment text.
     * @param {string} createdAt - The timestamp when the comment was created.
     */
    constructor(
        public commentId: string,
        public postId: string,
        public commentorId: string,
        public isSeller: boolean,
        public comment: string,
        public createdAt: string,
    ) {
    }
}