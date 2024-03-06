import Command from "@/core/shared/application/Command";

/**
 * Command class representing the intention to delete a post in the application.
 * This command carries the necessary data for deleting a post, such as the post ID and user ID.
 * It extends the base Command class.
 */
export default class DeletePostCommand extends Command {
    /**
     * The unique identifier of the post to be deleted.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly postId: string;

    /**
     * The unique identifier of the seller who owns the post to be deleted.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly sellerId: string;

    /**
     * Creates an instance of DeletePostCommand.
     *
     * @constructor
     * @param {string} postId - The unique identifier of the post to be deleted.
     * @param {string} sellerId - The unique identifier of the seller who owns the post to be deleted.
     */
    constructor(postId: string, sellerId: string) {
        super();
        this.postId = postId;
        this.sellerId = sellerId;
    }
}
