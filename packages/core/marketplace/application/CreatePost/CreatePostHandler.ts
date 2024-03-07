import CreatePostCommand from "./CreatePostCommand";
import ModerationAPI from "../../domain/ModerationAPI";
import CommandHandler from "../../../shared/application/CommandHandler";
import UnitOfWork from "../../../shared/application/UnitOfWork";
import Post from "../../domain/Entities/Post";

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
     * Creates an instance of the CreatePostHandler class.
     * @param {UnitOfWork} unitOfWork - The unit of work for managing transactions.
     * @param {ModerationAPI} moderationApi - The Moderation API for handling post moderation.
     */
    constructor(unitOfWork: UnitOfWork, moderationApi: ModerationAPI) {
        super();
        this.unitOfWork = unitOfWork;
        this.moderationApi = moderationApi;
    }

    /**
     * Handles the CreatePostCommand by creating a new post entity.
     * If the post with the specified ID already exists, the command is ignored.
     * @param {CreatePostCommand} cmd - The CreatePostCommand to be handled.
     * @returns {Promise<void>} - A Promise that resolves when the handling is complete.
     */
    public async handle(cmd: CreatePostCommand): Promise<void> {
        // Check if a post with the specified ID already exists
        let existingPostEvents = await this.unitOfWork.repository.loadEvents(cmd.postId);

        if (existingPostEvents.length === 0) {
            // Create a new post entity using the provided data
            let post = Post.create(
                cmd.postId,
                cmd.title,
                cmd.description,
                cmd.price,
                cmd.location,
                cmd.sellerId,
                cmd.category,
                cmd.photoUrl,
            );

            // Send the post for moderation using the Moderation API
            post.moderate(this.moderationApi);

            // Save the new post entity using the unit of work
            await this.unitOfWork.save(post);
            
            // Commit changes
            this.unitOfWork.commit();
        }
    }
}