import { Entity } from "../../../../shared/domain/Entity";
import { Comment, CommentId, CommentorId } from "./Values";

/**
 * Represents a comment made on a post, encapsulating its unique identifiers and content.
 * Inherits from Entity to provide common behaviors for entities within the domain.
 *
 * @class PostComment
 * @extends {Entity}
 */
export default class PostComment extends Entity {

    /**
     * The unique identifier of the comment within the post.
     *
     * @private
     * @type {CommentId}
     */
    private id: CommentId;

    /**
     * The unique identifier of the commenter.
     *
     * @private
     * @type {CommentorId}
     */
    private commentorId: CommentorId;

    /**
     * The content of the comment.
     *
     * @private
     * @type {Comment}
     */
    private comment: Comment;

    /**
     * Creates an instance of PostComment, initializing the unique identifiers and content of the comment.
     *
     * @constructor
     * @param {string} id - The unique identifier for this comment on a post.
     * @param {string} commentorId - The unique identifier of the commenter.
     * @param {string} comment - The textual content of the comment.
     */
    constructor(
        id: string,
        commentorId: string,
        comment: string
    ) {
        super();

        this.id = new CommentId(id);
        this.commentorId = new CommentorId(commentorId);
        this.comment = new Comment(comment);
    }

    /**
     * Retrieves the unique identifier of this comment.
     *
     * @public
     * @returns {string} The unique identifier of the comment.
     */
    public getId(): string {
        return this.id.id;
    }
}
