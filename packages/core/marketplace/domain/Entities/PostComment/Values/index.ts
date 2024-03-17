import { Id, ValueObject } from "../../../../../shared/domain/Values";

/**
 * Represents a unique identifier for a comment.
 * Inherits the functionality of a generic Id class, specializing in handling comment IDs.
 *
 * @class CommentId
 * @extends {Id}
 */
export class CommentId extends Id {
    /**
     * Creates an instance of CommentId.
     *
     * @constructor
     * @param {string} id - The unique identifier for a comment.
     */
    constructor(public readonly id: string) {
        super();
    }
}

/**
 * Represents a unique identifier for a commenter.
 * Inherits the functionality of a generic Id class, specializing in handling commenter IDs.
 *
 * @class CommentorId
 * @extends {Id}
 */
export class CommentorId extends Id {
    /**
     * Creates an instance of CommentorId.
     *
     * @constructor
     * @param {string} id - The unique identifier for a commenter.
     */
    constructor(public readonly id: string) {
        super();
    }
}

/**
 * Defines the properties and behaviors of a comment within the system.
 * Inherits from ValueObject to provide common behaviors for value object types.
 * Includes a static property to enforce a minimum comment length.
 *
 * @class Comment
 * @extends {ValueObject}
 */
export class Comment extends ValueObject {
    /**
     * The minimum length a comment must have to be considered valid.
     * 
     * @public
     * @static
     * @type {number}
     */
    public static MIN_COMMENT_LENGTH = 5;

    /**
     * Creates an instance of Comment.
     *
     * @constructor
     * @param {string} comment - The text content of the comment.
     * @throws {Error} - Throws an error if the comment text is less than the minimum length.
     */
    constructor(public readonly comment: string) {
        super();

        if (comment.length < Comment.MIN_COMMENT_LENGTH) {
            throw new Error("A comment must have at least 5 characters.")
        }
    }
}
