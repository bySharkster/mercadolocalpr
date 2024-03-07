import BadWordsModeration from "./infrastructure/BadWordsModeration";
import CreatePostCommand from "./application/CreatePost/CreatePostCommand";
import DeletePostCommand from "./application/DeletePost/DeletePostCommand";
import CreatePostHandler from "./application/CreatePost/CreatePostHandler";
import { DeletePostHandler } from "./application/DeletePost/DeletePostHandler";
import { PostCreatedEvent, PostDeletedEvent, PostModeratedEvent } from "./domain/Events";
import CreatePostReadModelHandler from "./application/CreatePost/CreatePostReadModelHandler";
import PostModeratedHandler from "./application/UpdatePost/PostModeratedHandler";
import DeletePostReadModelHandler from "./application/DeletePost/DeletePostReadModelHandler";
import AbstractMessageBus from "../shared/application/AbstractMessageBus";
import UnitOfWork from "../shared/application/UnitOfWork";
import SBPostRepository from "./infrastructure/persistence/SBPostRepository";
import SBPostReadModel from "./infrastructure/persistence/SBPostReadModelStore";
import SBLocationRepository from "./infrastructure/persistence/SBLocationRepository";

/**
 * Initializes the application by configuring and registering necessary components.
 *
 * @param {AbstractMessageBus} bus - The message bus used for communication between different parts of the application.
 * @param {*} config - The configuration object for initializing components.
 */
export default function initialize(bus: AbstractMessageBus, config: any): void {
    // Initialize infrastructure components with Supabase integration
    const postRepository = new SBPostRepository(config.db.supabaseUrl, config.db.supabaseKey);
    const locationRepository = new SBLocationRepository(config.db.supabaseUrl, config.db.supabaseKey);
    const postModels = new SBPostReadModel(config.db.supabaseUrl, config.db.supabaseKey);
    const moderationApi = new BadWordsModeration(config.moderation.replaceWith);
    const unitOfWork = new UnitOfWork(postRepository);

    // Register commands
    bus.registerCommand(CreatePostCommand.name, new CreatePostHandler(unitOfWork, moderationApi, locationRepository));
    bus.registerCommand(DeletePostCommand.name, new DeletePostHandler(unitOfWork));

    // Register events
    bus.registerEvent(PostCreatedEvent.name, new CreatePostReadModelHandler(postModels));
    bus.registerEvent(PostModeratedEvent.name, new PostModeratedHandler(postModels));
    bus.registerEvent(PostDeletedEvent.name, new DeletePostReadModelHandler(postModels));
}
