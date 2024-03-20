import DeletePostCommand from "./DeletePostCommand";
import Post from "../../domain/Entities/Post/Post";
import { SellerId } from "../../domain/Entities/Post/Values";
import CommandHandler from "../../../shared/application/CommandHandler";
import Result from "../../../shared/application/Result";
import PostRepository from "../../domain/Repositories/PostRepository";
import AbstractMessageBus from "../../../shared/application/AbstractMessageBus";

/**
 * Handles the deletion of posts in response to DeletePostCommands. Extends the CommandHandler to
 * process specific commands related to post deletion, leveraging the PostRepository for data persistence
 * and an AbstractMessageBus for event handling.
 * @class DeletePostHandler
 * @extends {CommandHandler}
 */
export class DeletePostHandler extends CommandHandler {
    /**
     * Repository for managing persistence operations for posts, used to access and modify post data.
     * @private
     * @type {PostRepository}
     */
    private postRepository: PostRepository

    /**
     * The message bus for handling domain events, facilitating loose coupling between components by using events.
     * @private
     * @type {AbstractMessageBus}
     */
    private messageBus: AbstractMessageBus

    /**
     * Initializes a new instance of the DeletePostHandler with necessary dependencies for post deletion logic.
     * @param {PostRepository} postRepository The repository for post data operations.
     * @param {AbstractMessageBus} messageBus The system's message bus for event handling.
     */
    constructor(postRepository: PostRepository, messageBus: AbstractMessageBus) {
        super();
        this.postRepository = postRepository
        this.messageBus = messageBus
    }

    /**
     * Executes the deletion logic for a post by processing a DeletePostCommand. Validates the existence
     * of the post and marks it as deleted within a transactional boundary, ensuring data integrity.
     * @param {DeletePostCommand} cmd The command object specifying the post to delete and necessary details.
     * @returns {Promise<Result>} A Promise that resolves to a Result object indicating success or failure of the operation.
     * @throws {PostNotFoundError} Thrown when the specified post cannot be found in the repository.
     */
    public async handle(cmd: DeletePostCommand): Promise<Result> {
        let events = await this.postRepository.loadEvents(cmd.postId);

        if (events.length === 0) return DeletePostErrors.postNotFound(cmd.postId);

        let post = new Post(events);

        post.delete(new SellerId(cmd.sellerId));

        await this.postRepository.save(post);

        this.messageBus.enqueue(post.popEvents());

        return Result.success();
    }
}

/**
 * Provides utility methods for generating standardized error responses for the post deletion process.
 * This class encapsulates specific error scenarios that can occur during the deletion of a post, offering
 * a consistent error handling mechanism.
 */
class DeletePostErrors {
    /**
     * Generates an error Result object for scenarios where a post cannot be found by its ID during deletion.
     * @param {string} postId The ID of the post that was not found.
     * @returns {Result} A Result object encapsulating the error with a descriptive message.
     */
    public static postNotFound(postId: string): Result {
        return Result.failure(`Post with id '${postId}' was not found.`);
    }
}
