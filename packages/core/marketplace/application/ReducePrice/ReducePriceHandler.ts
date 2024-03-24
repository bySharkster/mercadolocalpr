import AbstractMessageBus from "../../../shared/application/AbstractMessageBus";
import CommandHandler from "../../../shared/application/CommandHandler";
import Result from "../../../shared/application/Result";
import Post from "../../domain/Entities/Post/Post";
import { PostPrice, SellerId } from "../../domain/Entities/Post/Values";
import PostRepository from "../../domain/Repositories/PostRepository";
import ReducePriceCommand from "./ReducePriceCommand";

/**
 * Handles the reduction of a post's price by processing a ReducePriceCommand.
 * Inherits from CommandHandler to implement command handling for price reduction operations.
 *
 * @class ReducePriceHandler
 * @extends {CommandHandler}
 */
export default class ReducePriceHandler extends CommandHandler {
    /**
     * The repository for accessing posts.
     * 
     * @private
     * @type {PostRepository}
     */
    private postRepository: PostRepository;

    /**
     * The message bus for event publishing.
     * 
     * @private
     * @type {AbstractMessageBus}
     */
    private messageBus: AbstractMessageBus;

    /**
     * Initializes a new instance of the ReducePriceHandler class with a post repository and a message bus.
     *
     * @constructor
     * @param {PostRepository} postRepository The repository for accessing posts.
     * @param {AbstractMessageBus} messageBus The message bus for event publishing.
     */
    constructor(postRepository: PostRepository, messageBus: AbstractMessageBus) {
        super();
        this.postRepository = postRepository;
        this.messageBus = messageBus;
    }

    /**
     * Handles the command to reduce the price of a post. It loads events for the post,
     * applies the price reduction, and publishes resulting events.
     *
     * @public
     * @param {ReducePriceCommand} cmd The command to reduce the price of a post.
     * @returns {Promise<Result>} A promise that resolves with the result of the operation.
     */
    public async handle(cmd: ReducePriceCommand): Promise<Result> {
        const events = await this.postRepository.loadEvents(cmd.postId);

        if(events.length == 0) return ReducePriceErrors.postNotFound(cmd.postId);

        const post = new Post(events);

        try {
            post.reducePrice(new PostPrice(cmd.newPrice), new SellerId(cmd.sellerId));
        } catch(error: any) {
            return ReducePriceErrors.invalidOperation(error.message);
        }

        this.postRepository.save(post);

        this.messageBus.enqueue(post.popEvents());

        return Result.success();
    }
}

/**
 * Provides static methods for generating error results specific to price reduction operations.
 *
 * @class ReducePriceErrors
 */
class ReducePriceErrors {

    /**
     * Returns a Result indicating failure due to the specified post not being found.
     *
     * @public
     * @static
     * @param {string} postId The ID of the post that was not found.
     * @returns {Result} A Result object indicating failure with an appropriate message.
     */
    public static postNotFound(postId: string): Result {
        return Result.failure(`Post with id '${postId}' was not found`);
    }

    /**
     * Returns a Result indicating failure due to an invalid operation, with a custom message.
     *
     * @public
     * @static
     * @param {string} message The custom message describing the invalid operation.
     * @returns {Result} A Result object indicating failure with the provided message.
     */
    public static invalidOperation(message: string): Result {
        return Result.failure(message);
    }
}
