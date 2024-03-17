import AbstractMessageBus from "../../../shared/application/AbstractMessageBus";
import CommandHandler from "../../../shared/application/CommandHandler"
import Result from "../../../shared/application/Result";
import Post from "../../domain/Entities/Post/Post";
import { SellerId } from "../../domain/Entities/Post/Values";
import PostRepository from "../../domain/Repositories/PostRepository";
import ClosePostCommand from "./ClosePostCommand";

/**
 * Handles the closing of a post, utilizing the ClosePostCommand.
 * This handler is responsible for orchestrating the process of closing a post,
 * including loading the relevant events from the repository, performing the close operation,
 * and persisting the updated state. Extends CommandHandler to leverage common handling logic.
 *
 * @class ClosePostHandler
 * @typedef {ClosePostHandler}
 * @extends {CommandHandler}
 */
export default class ClosePostHandler extends CommandHandler {
    /**
     * Repository for accessing posts. Used to load and save post entities.
     *
     * @private
     * @type {PostRepository}
     */
    private postRepository: PostRepository;

    /**
     * Message bus for publishing events related to post reporting, enabling
     * decoupled communication between components.
     * 
     * @private
     * @type {AbstractMessageBus}
     */
    private messageBus: AbstractMessageBus;

    /**
     * Creates an instance of ClosePostHandler.
     * Injects the PostRepository to facilitate post retrieval and persistence.
     *
     * @constructor
     * @param {PostRepository} postRepository Repository for post operations.
     * @param {AbstractMessageBus} messageBus The message bus for event communication.
     */
    constructor(postRepository: PostRepository, messageBus: AbstractMessageBus) {
        super();
        this.postRepository = postRepository;
        this.messageBus = messageBus;
    }

    /**
     * Handles the ClosePostCommand. It loads the post's events, closes the post, and saves the post entity.
     * If the post cannot be found, it returns an error.
     *
     * @public
     * @param {ClosePostCommand} cmd The command containing data needed to close a post.
     * @returns {Promise<Result>} The result of the operation, indicating success or failure.
     */
    public async handle(cmd: ClosePostCommand): Promise<Result> {
        let events = await this.postRepository.loadEvents(cmd.postId);

        if(events.length === 0) return ClosePostErrors.postNotFound(cmd.postId);
        
        const post = new Post(events);

        post.close(new SellerId(cmd.sellerId));

        await this.postRepository.save(post);

        this.messageBus.enqueue(post.popEvents());

        return Result.success();
    }
}

/**
 * Contains error functions related to the ClosePostHandler.
 * Offers static methods to return Result instances for different error scenarios,
 * such as when a post cannot be found.
 *
 * @class ClosePostErrors
 * @typedef {ClosePostErrors}
 */
class ClosePostErrors {
    /**
     * Returns a Result indicating that the specified post could not be found.
     *
     * @public
     * @static
     * @param {string} postId The ID of the post that was not found.
     * @returns {Result} A failure Result with an appropriate error message.
     */
    public static postNotFound(postId: string): Result {
        return Result.failure(`Post with id '${postId}' was not found`);
    }
}
