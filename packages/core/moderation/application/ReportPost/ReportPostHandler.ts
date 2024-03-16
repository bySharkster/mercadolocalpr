import MarketplaceService from "../../../marketplace/integration/contracts";
import AbstractMessageBus from "../../../shared/application/AbstractMessageBus";
import CommandHandler from "../../../shared/application/CommandHandler";
import Result from "../../../shared/application/Result";
import ReportedPost from "../../domain/Entities/ReportedPost/ReportedPost";
import ReportedPostsRepository from "../../domain/Repositories/ReportedPostsRepository";
import ReportPostCommand from "./ReportPostCommand";

/**
 * Handles the reporting of posts by interfacing with the necessary services
 * to verify the existence of a post, report it, and communicate the reporting
 * through the system.
 * 
 * @class ReportPostHandler
 * @typedef {ReportPostHandler}
 * @extends {CommandHandler}
 */
export default class ReportPostHandler extends CommandHandler {
    /**
     * Service for interacting with the marketplace data, specifically for checking
     * if a post exists.
     * 
     * @private
     * @type {MarketplaceService}
     */
    private marketplace: MarketplaceService;

    /**
     * Repository for managing reported posts, including saving and retrieving reports.
     * 
     * @private
     * @type {ReportedPostsRepository}
     */
    private reportedPosts: ReportedPostsRepository;

    /**
     * Message bus for publishing events related to post reporting, enabling
     * decoupled communication between components.
     * 
     * @private
     * @type {AbstractMessageBus}
     */
    private messageBus: AbstractMessageBus;

    /**
     * Creates an instance of ReportPostHandler with the necessary services and repositories.
     *
     * @constructor
     * @param {MarketplaceService} marketplace The service for marketplace operations.
     * @param {ReportedPostsRepository} reportedPosts The repository for managing reported posts.
     * @param {AbstractMessageBus} messageBus The message bus for event communication.
     */
    constructor(
        marketplace: MarketplaceService, 
        reportedPosts: ReportedPostsRepository,
        messageBus: AbstractMessageBus,
    ) {
        super();
        this.marketplace = marketplace;
        this.reportedPosts = reportedPosts;
        this.messageBus = messageBus;
    }

    /**
     * Handles a report post command by verifying the post's existence, reporting it,
     * and then communicating the report through events. Returns a Result indicating
     * the operation's success or failure.
     *
     * @public
     * @param {ReportPostCommand} cmd The command to report a post.
     * @returns {Promise<Result>} The result of the operation, indicating success or failure.
     */
    public async handle(cmd: ReportPostCommand): Promise<Result> {
        let post = await this.getPost(cmd.postId);

        if(!post) return ReportPostErrors.postNotFound(cmd.postId);
        
        post.flag(cmd.flagId, cmd.userId, cmd.reason);

        await this.reportedPosts.save(post);

        this.messageBus.enqueue(post.popEvents());

        return Result.success();
    }

    /**
     * Retrieves a reported post by its ID. If the post doesn't exist in the repository
     * but exists in the marketplace, a new ReportedPost instance is created.
     *
     * @private
     * @param {string} id The ID of the post to retrieve.
     * @returns {Promise<ReportedPost|null>} The reported post or null if it doesn't exist.
     */
    private async getPost(id: string): Promise<ReportedPost|null> {
        let post: ReportedPost|null = null;
        let events = await this.reportedPosts.loadEvents(id);

        if(events.length > 0) {
            post = new ReportedPost(events);
        } else if(await this.marketplace.postExists(id)) {
            post = ReportedPost.create(id);
        }

        return post;
    }

}

/**
 * Provides static methods for common report post errors, such as when a post is not found.
 *
 * @class ReportPostErrors
 * @typedef {ReportPostErrors}
 */
class ReportPostErrors {
    /**
     * Returns a failure Result when a post is not found by its ID.
     *
     * @public
     * @static
     * @param {string} id The ID of the post that was not found.
     * @returns {*}
     */
    public static postNotFound(id: string): Result {
        return Result.failure(`Post with id ${id} was not found.`);
    }
}
