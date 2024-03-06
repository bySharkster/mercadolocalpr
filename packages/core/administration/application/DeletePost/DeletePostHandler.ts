import CommandHandler from "@/core/shared/application/CommandHandler";
import DeletePostCommand from "./DeletePostCommand";
import Post from "../../domain/Entities/Post";
import PostNotFoundError from "../../domain/Exceptions/PostNotFoundError";
import UnitOfWork from "../UnitOfWork";
import { SellerId } from "../../domain/Values";

/**
 * Command handler for processing the DeletePostCommand and deleting a post.
 * It extends the base CommandHandler class.
 */
export class DeletePostHandler extends CommandHandler {
    /**
     * Creates an instance of the DeletePostHandler class.
     * @param {UnitOfWork} unitOfWork - The unit of work for managing transactions.
     */
    constructor(private unitOfWork: UnitOfWork) {
        super();
    }

    /**
     * Handles the DeletePostCommand by loading the post events, creating a post entity,
     * marking it as deleted, and saving the changes.
     * @param {DeletePostCommand} cmd - The DeletePostCommand to be handled.
     * @throws {PostNotFoundError} - Throws an error if the post with the specified ID is not found.
     */
    public async handle(cmd: DeletePostCommand): Promise<void> {
        // Load events for the specified post ID
        let events = await this.unitOfWork.posts.loadEvents(cmd.postId);

        // If no events are found, the post does not exist
        if (events.length === 0) throw new PostNotFoundError();

        // Create a new post entity using the loaded events
        let post = new Post(events);

        // Mark the post as deleted using the user ID initiating the deletion
        post.delete(new SellerId(cmd.sellerId));

        // Save the modified post entity using the unit of work
        this.unitOfWork.save(post);
    }
}