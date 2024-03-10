import CreatePostCommand from "./CreatePostCommand";
import ModerationAPI from "../../domain/ModerationAPI";
import CommandHandler from "../../../shared/application/CommandHandler";
import UnitOfWork from "../../../shared/application/UnitOfWork";
import Post from "../../domain/Entities/Post/Post";
import LocationRepository from "../../domain/Repositories/LocationRepository";
import Result from "../../../shared/application/Result";
import CategoryRepository from "../../domain/Repositories/CategoryRepository";

/**
 * Command handler for processing the CreatePostCommand and creating a new post.
 * It extends the base CommandHandler class.
 */
export default class CreatePostHandler extends CommandHandler {
    /**
     * The unit of work for managing transactions.
     * @private
     * @type {UnitOfWork}
     */
    private unitOfWork: UnitOfWork;

    /**
     * The Moderation API for handling post moderation.
     * @private
     * @type {ModerationAPI}
     */
    private moderationApi: ModerationAPI;

    /**
     * Repository for fetching location entities.
     *
     * @private
     * @type {LocationRepository}
     */
    private locationRepository: LocationRepository;

    /**
     * Repository for fetching category entities.
     *
     * @private
     * @type {CategoryRepository}
     */
    private categoryRepository: CategoryRepository;

    /**
     * Creates an instance of the CreatePostHandler class.
     * @param {UnitOfWork} unitOfWork - The unit of work for managing transactions.
     * @param {ModerationAPI} moderationApi - The Moderation API for handling post moderation.
     * @param {LocationRepository} locationRepository - Repository for fetching location entities.
     * @param {CategoryRepository} categoryRepository - Repository for fetching category entities.
     */
    constructor(
        unitOfWork: UnitOfWork, 
        moderationApi: ModerationAPI,
        locationRepository: LocationRepository,
        categoryRepository: CategoryRepository,
    ) {
        super();
        this.unitOfWork = unitOfWork;
        this.moderationApi = moderationApi;
        this.locationRepository = locationRepository;
        this.categoryRepository = categoryRepository;
    }

    /**
     * Handles the CreatePostCommand by creating a new post entity.
     * If the post with the specified ID already exists, the command is ignored.
     * @param {CreatePostCommand} cmd - The CreatePostCommand to be handled.
     * @returns {Promise<Result>} - A Promise that resolves when the handling is complete.
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

        let existingPostEvents = await this.unitOfWork.repository.loadEvents(postId);

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

        await this.unitOfWork.save(post);
        
        this.unitOfWork.commit();
        
        return Result.success()
    }


    /**
     * Create the post using the fields from the command.
     *
     * @private
     * @param {CreatePostCommand} cmd
     * @returns {Post}
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
 * Provides static methods for generating error results related to post creation failures.
 * This class is used to encapsulate specific error scenarios that can occur during the
 * post creation process, such as location not found or invalid post data.
 *
 * @class CreatePostErrors
 * @typedef {CreatePostErrors}
 */
class CreatePostErrors {
    /**
     * Generates a Result object indicating failure due to the specified location ID not being found.
     * This method is typically called when an attempt to create a post with a non-existent location ID is made.
     *
     * @public
     * @static
     * @param {string} locationId The ID of the location that was not found.
     * @returns {Result} A Result object containing the failure message related to the missing location.
     */
    public static locationNotFound(locationId: string): Result {
        return Result.failure(`Location with id '${locationId}' was not found.`);
    }

    /**
     * Generates a Result object indicating failure due to the specified category ID not being found.
     * This method is typically called when an attempt to create a post with a non-existent category ID is made.
     *
     * @public
     * @static
     * @param {string} categoryId
     * @returns {Result}
     */
    public static categoryNotFound(categoryId: string): Result {
        return Result.failure(`Category with id '${categoryId}' was not found.`);
    }

    /**
     * Generates a Result object indicating failure due to invalid post data.
     * This method is used to encapsulate various validation failures that might occur
     * during the post creation process, allowing for a consistent error handling mechanism.
     *
     * @public
     * @static
     * @param {string} error A descriptive error message detailing why the post data is considered invalid.
     * @returns {Result} A Result object containing the failure message related to the post data validation.
     */
    public static invalidPost(error: string): Result {
        return Result.failure(error);
    }
}