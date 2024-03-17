import Command from "../../../shared/application/Command";

/**
 * Command for adding a comment to a post. It encapsulates all the necessary information
 * required to perform the action of adding a comment.
 * 
 * Inherits from the Command base class, providing a structure for executing commands
 * within the application.
 */
export default class AddCommentCommand extends Command {
    /**
     * Constructs an instance of the AddCommentCommand with the provided details.
     * 
     * @param {string} postId The unique identifier of the post to which the comment is to be added.
     * @param {string} commentorId The unique identifier of the user adding the comment.
     * @param {string} commentId The unique identifier of the comment being added.
     * @param {string} comment The content of the comment being added.
     */
    constructor(
        public readonly postId: string,
        public readonly commentorId: string,
        public readonly commentId: string,
        public readonly comment: string,
    ) {
        super();
    }
}
