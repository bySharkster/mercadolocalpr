import Command from "../../../shared/application/Command";

/**
 * Command to close a post. This operation is typically performed by the seller
 * to indicate that the post is no longer active, for instance, when an item has been sold.
 * Inherits behaviors and properties from the Command base class.
 *
 * @class ClosePostCommand
 * @typedef {ClosePostCommand}
 * @extends {Command}
 */
export default class ClosePostCommand extends Command {
    /**
     * Creates an instance of ClosePostCommand.
     * Initializes the command with the post and seller identifiers.
     *
     * @constructor
     * @param {string} postId The unique identifier of the post to be closed.
     * @param {string} sellerId The unique identifier of the seller initiating the close operation.
     */
    constructor(
        public readonly postId: string,
        public readonly sellerId: string,
    ) {
        super();
    }
}
