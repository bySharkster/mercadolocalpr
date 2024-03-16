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
import SBCategoryRepository from "./infrastructure/persistence/SBCategoryRepository";
import MarketplaceAPI from "./integration";
import MarketplaceService from "./integration/contracts";


/**
 * Creates and returns an instance of SBPostRepository configured with the Supabase client using provided configuration.
 *
 * @param {*} config The configuration object containing the database connection details.
 * @returns {SBPostRepository} An instance of SBPostRepository configured with Supabase.
 */
function getPostRepository(config: any): SBPostRepository {
    return new SBPostRepository(config.db.supabaseUrl, config.db.supabaseKey)
}


/**
 * Creates and returns an instance of SBPostReadModel configured with the Supabase client using provided configuration.
 *
 * @param {*} config The configuration object containing the database connection details.
 * @returns {SBPostReadModel} An instance of SBPostReadModel configured with Supabase.
 */
function getPostReadStore(config: any): SBPostReadModel {
    return new SBPostReadModel(config.db.supabaseUrl, config.db.supabaseKey)
}


/**
 * Initializes the application by configuring and registering necessary components and services with the message bus.
 * This includes setting up repositories, handlers, and external APIs.
 *
 * @param {AbstractMessageBus} bus The message bus used for orchestrating commands and events across the application.
 * @param {*} config The configuration object for initializing components with specific settings like database access.
 */
export default function initialize(bus: AbstractMessageBus, config: any): void {
    // Infrastructure components setup with Supabase integration
    const postRepository = getPostRepository(config);
    const locationRepository = new SBLocationRepository(config.db.supabaseUrl, config.db.supabaseKey);
    const categoryRepository = new SBCategoryRepository(config.db.supabaseUrl, config.db.supabaseKey);
    const postModels = getPostReadStore(config);
    const moderationApi = new BadWordsModeration(config.moderation.replaceWith);
    const unitOfWork = new UnitOfWork(postRepository);

    // Command registration
    
    bus.registerCommand(CreatePostCommand.name, new CreatePostHandler(
        unitOfWork, 
        moderationApi, 
        locationRepository,
        categoryRepository,
    ));

    bus.registerCommand(DeletePostCommand.name, new DeletePostHandler(unitOfWork));

    // Event registration
    bus.registerEvent(PostCreatedEvent.name, new CreatePostReadModelHandler(postModels));
    bus.registerEvent(PostModeratedEvent.name, new PostModeratedHandler(postModels));
    bus.registerEvent(PostDeletedEvent.name, new DeletePostReadModelHandler(postModels));
}



/**
 * Factory function to create and return an instance of MarketplaceAPI, configured with necessary repositories for operation.
 * This function abstracts the creation and configuration of MarketplaceAPI, providing a ready-to-use service interface.
 *
 * @param {*} config Configuration object containing necessary setup parameters.
 * @returns {MarketplaceService} An instance of MarketplaceAPI ready for use.
 */
export function marketplaceApiFactory(config: any): MarketplaceService {
    const postRepository = getPostRepository(config);
    const postModels = getPostReadStore(config);
    
    return new MarketplaceAPI(postRepository, postModels);
}
