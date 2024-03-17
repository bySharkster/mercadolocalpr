import AbstractMessageBus from "../../../shared/application/AbstractMessageBus";
import CommandHandler from "../../../shared/application/CommandHandler";
import Result from "../../../shared/application/Result";
import Post from "../../domain/Entities/Post/Post";
import PostRepository from "../../domain/Repositories/PostRepository";
import AddCommentCommand from "./AddCommentCommand";

/**
 * Handles the command to add a comment to a post, managing the interaction between the domain layer
 * and application services like event publishing and repository management.
 *
 * @class AddCommentHandler
 * @extends {CommandHandler}
 */
export default class AddCommentHandler extends CommandHandler {
    /**
     * The repository for accessing and manipulating post entities.
     *
     * @private
     * @type {PostRepository}
     */
    private postRepository: PostRepository;

    /**
     * The message bus for publishing events related to operations on posts, such as adding a comment,
     * enabling decoupled communication between different parts of the application.
     *
     * @private
     * @type {AbstractMessageBus}
     */
    private messageBus: AbstractMessageBus;

    /**
     * Constructs an instance of AddCommentHandler, injecting dependencies needed to handle the command.
     *
     * @constructor
     * @param {PostRepository} postRepository - Repository for operations on Post entities.
     * @param {AbstractMessageBus} messageBus - Bus for event communication and publishing.
     */
    constructor(postRepository: PostRepository, messageBus: AbstractMessageBus) {
        super();
        this.postRepository = postRepository;
        this.messageBus = messageBus;
    }

    /**
     * Handles the AddCommentCommand, performing operations to add a comment to a post.
     * Loads the post events from the repository, creates a Post aggregate from these events,
     * applies the comment action, and persists the updated Post aggregate.
     *
     * @public
     * @param {AddCommentCommand} cmd - The command containing information needed to add the comment.
     * @returns {Promise<Result>} - The result of the operation, indicating success or failure.
     */
    public async handle(cmd: AddCommentCommand): Promise<Result> {
        let events = await this.postRepository.loadEvents(cmd.postId);

        if(events.length === 0) return AddCommentErrors.postNotFound(cmd.postId);

        const post = new Post(events);
        
        try {
            post.comment(cmd.commentorId, cmd.commentId, cmd.comment);
        } catch(error: any) {
            return AddCommentErrors.invalidOperation(error.message);
        }

        await this.postRepository.save(post);

        this.messageBus.enqueue(post.popEvents());

        return Result.success();
    }
}

/**
 * Defines static methods for generating specific Result instances related to error conditions
 * encountered while handling the AddCommentCommand, such as not finding the targeted post.
 *
 * @class AddCommentErrors
 */
class AddCommentErrors {
    /**
     * Creates a Result object indicating the failure to find the post specified in the command.
     *
     * @public
     * @static
     * @param {string} postId - The identifier of the post that could not be found.
     * @returns {Result} - A Result instance encapsulating the error condition.
     */
    public static postNotFound(postId: string): Result {
        return Result.failure(`Post with id '${postId}' was not found`);
    }

    public static invalidOperation(message: string): Result {
        return Result.failure(message);
    }
}
