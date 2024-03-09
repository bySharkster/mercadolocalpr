import DeletePostCommand from "./DeletePostCommand";
import Post from "../../domain/Entities/Post/Post";
import { SellerId } from "../../domain/Entities/Post/Values";
import CommandHandler from "../../../shared/application/CommandHandler";
import UnitOfWork from "../../../shared/application/UnitOfWork";
import Result from "../../../shared/application/Result";

/**
 * Handles the execution of a `DeletePostCommand`, facilitating the deletion of a post in the system.
 * Inherits from the `CommandHandler` abstract class and utilizes the UnitOfWork pattern for transaction management.
 */
export class DeletePostHandler extends CommandHandler {
    /**
     * Represents a unit of work instance for managing database transactions,
     * particularly for operations related to the deletion of a post.
     *
     * @private
     * @type {UnitOfWork}
     */
    private unitOfWork: UnitOfWork

    /**
     * Constructs an instance of `DeletePostHandler` with a specific unit of work.
     * This unit of work is used throughout the deletion process to ensure transactional integrity.
     *
     * @param {UnitOfWork} unitOfWork - The unit of work for managing transactions.
     */
    constructor(unitOfWork: UnitOfWork) {
        super();
        this.unitOfWork = unitOfWork
    }

    /**
     * Executes the post deletion process by handling the provided `DeletePostCommand`.
     * It involves loading the post's events, recreating the post entity, marking it as deleted,
     * and persisting the changes within a transactional context.
     *
     * @param {DeletePostCommand} cmd - The command object containing the details necessary for post deletion.
     * @throws {PostNotFoundError} - This exception is thrown if the post specified in the command is not found.
     * @returns {Promise<Result>} - The result of the delete operation, encapsulating success or failure.
     */
    public async handle(cmd: DeletePostCommand): Promise<Result> {
        let events = await this.unitOfWork.repository.loadEvents(cmd.postId);

        if (events.length === 0) {
            return DeletePostErrors.postNotFound(cmd.postId);
        }

        let post = new Post(events);
        post.delete(new SellerId(cmd.sellerId));
        this.unitOfWork.save(post);
        this.unitOfWork.commit();

        return Result.success();
    }
}

/**
 * Encapsulates error handling strategies for post deletion operations, offering a centralized
 * mechanism for generating and returning error results specific to post deletion contexts.
 */
class DeletePostErrors {
    /**
     * Generates a `Result` object indicating a failure to find the post with the specified ID.
     * This method facilitates a uniform approach to handling the scenario where a deletion operation
     * cannot proceed due to the target post not being found in the database.
     *
     * @public
     * @static
     * @param {string} postId - The identifier of the post that was not found.
     * @returns {Result} - A failure result encapsulating the error message.
     */
    public static postNotFound(postId: string): Result {
        return Result.failure(`Post with id '${postId}' was not found.`);
    }
}
