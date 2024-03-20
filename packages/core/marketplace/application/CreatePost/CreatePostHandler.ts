import CreatePostCommand from "./CreatePostCommand";
import ModerationAPI from "../../domain/ModerationAPI";
import CommandHandler from "../../../shared/application/CommandHandler";
import Post from "../../domain/Entities/Post/Post";
import LocationRepository from "../../domain/Repositories/LocationRepository";
import Result from "../../../shared/application/Result";
import CategoryRepository from "../../domain/Repositories/CategoryRepository";
import PostRepository from "../../domain/Repositories/PostRepository";
import AbstractMessageBus from "../../../shared/application/AbstractMessageBus";

/**
 * Handles the creation of new posts in response to CreatePostCommands.
 * Extends CommandHandler to process specific commands related to post creation,
 * leveraging various repositories and APIs for data access and business logic execution.
 * @extends {CommandHandler}
 */
export default class CreatePostHandler extends CommandHandler {
    /**
     * Repository for managing persistence operations for posts.
     * @private
     * @type {PostRepository}
     */
    private postRepository: PostRepository;

    /**
     * The Moderation API for handling post moderation, ensuring that posts meet community and platform standards.
     * @private
     * @type {ModerationAPI}
     */
    private moderationApi: ModerationAPI;

    /**
     * Repository for fetching location entities, used to validate and associate posts with specific locations.
     * @private
     * @type {LocationRepository}
     */
    private locationRepository: LocationRepository;

    /**
     * Repository for fetching category entities, used to categorize posts for easier discovery and organization.
     * @private
     * @type {CategoryRepository}
     */
    private categoryRepository: CategoryRepository;

    /**
     * The message bus for handling domain events, facilitating loose coupling between components by using events.
     * @private
     * @type {AbstractMessageBus}
     */
    private messageBus: AbstractMessageBus;

    /**
     * Initializes a new instance of the CreatePostHandler with necessary repositories and APIs.
     * @param {PostRepository} postRepository The repository for post data operations.
     * @param {ModerationAPI} moderationApi The API for post moderation.
     * @param {LocationRepository} locationRepository The repository for location data operations.
     * @param {CategoryRepository} categoryRepository The repository for category data operations.
     * @param {AbstractMessageBus} messageBus The system's message bus for event handling.
     */
    constructor(
        postRepository: PostRepository, 
        moderationApi: ModerationAPI,
        locationRepository: LocationRepository,
        categoryRepository: CategoryRepository,
        messageBus: AbstractMessageBus,
    ) {
        super();
        this.postRepository = postRepository;
        this.moderationApi = moderationApi;
        this.locationRepository = locationRepository;
        this.categoryRepository = categoryRepository;
        this.messageBus = messageBus
    }

    /**
     * Processes the CreatePostCommand to create and persist a new post, subject to validation and moderation.
     * Ensures uniqueness of the post ID, and validates location and category before creating the post.
     * @param {CreatePostCommand} cmd The command containing data for creating a new post.
     * @returns {Promise<Result>} A Promise resolving to a Result indicating success or failure of post creation.
     */
    public async handle(cmd: CreatePostCommand): Promise<Result> {
        let locId = cmd.locationId;
        let catId = cmd.categoryId;
        let postId = cmd.postId;

        let [location, category] = await Promise.all([
            this.locationRepository.get(locId),
            this.categoryRepository.get(catId),
        ]);
        
        if(!location) {
            return CreatePostErrors.locationNotFound(locId);
        }

        if(!category) {
            return CreatePostErrors.categoryNotFound(catId);
        }

        let existingPostEvents = await this.postRepository.loadEvents(postId);

        if (existingPostEvents.length != 0) {
            return CreatePostErrors.invalidPost(`Post with id '${postId}' already exists.`)
        }

        let post;

        try {
            post = this.createPost(cmd);
        } catch(error: any) {
            return CreatePostErrors.invalidPost(error.message)
        }

        post.moderate(this.moderationApi);

        await this.postRepository.save(post);
        
        this.messageBus.enqueue(post.popEvents());

        return Result.success()
    }

    /**
     * Constructs a Post entity from the provided CreatePostCommand, encapsulating the logic for post creation.
     * @private
     * @param {CreatePostCommand} cmd The command containing the necessary data to create a post.
     * @returns {Post} The newly created Post entity.
     */
    private createPost(cmd: CreatePostCommand): Post {
        return Post.create(
            cmd.postId,
            cmd.title,
            cmd.description,
            cmd.price,
            cmd.locationId,
            cmd.sellerId,
            cmd.categoryId,
            cmd.photoUrl,
        );
    }
}

/**
 * Dedicated error class for encapsulating and managing specific post creation error scenarios.
 */
class CreatePostErrors {
    /**
     * Error when the specified location ID does not exist in the system.
     * @param {string} locationId The ID of the missing location.
     * @returns {Result} A Result object indicating the error with a descriptive message.
     */
    public static locationNotFound(locationId: string): Result {
        return Result.failure(`Location with id '${locationId}' was not found.`);
    }

    /**
     * Error when the specified category ID does not exist in the system.
     * @param {string} categoryId The ID of the missing category.
     * @returns {Result} A Result object indicating the error with a descriptive message.
     */
    public static categoryNotFound(categoryId: string): Result {
        return Result.failure(`Category with id '${categoryId}' was not found.`);
    }

    /**
     * Error when post data is invalid, covering various validation failures.
     * @param {string} error Descriptive message detailing the invalid post data issue.
     * @returns {Result} A Result object indicating the error with the provided message.
     */
    public static invalidPost(error: string): Result {
        return Result.failure(error);
    }
}
