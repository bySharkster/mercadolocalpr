import BadWordsModeration from "./infrastructure/BadWordsModeration";
import CreatePostCommand from "./application/CreatePost/CreatePostCommand";
import DeletePostCommand from "./application/DeletePost/DeletePostCommand";
import CreatePostHandler from "./application/CreatePost/CreatePostHandler";
import { DeletePostHandler } from "./application/DeletePost/DeletePostHandler";
import { CommentAddedToPostEvent, PostClosedEvent, PostCreatedEvent, PostDeletedEvent, PostModeratedEvent, PriceReducedEvent } from "./domain/Events";
import CreatePostReadModelHandler from "./application/CreatePost/CreatePostReadModelHandler";
import PostModeratedHandler from "./application/UpdatePost/PostModeratedHandler";
import DeletePostReadModelHandler from "./application/DeletePost/DeletePostReadModelHandler";
import AbstractMessageBus from "../shared/application/AbstractMessageBus";
import SBPostRepository from "./infrastructure/persistence/SBPostRepository";
import SBPostReadModel from "./infrastructure/persistence/SBPostReadModelStore";
import SBLocationRepository from "./infrastructure/persistence/SBLocationRepository";
import SBCategoryRepository from "./infrastructure/persistence/SBCategoryRepository";
import MarketplaceAPI from "./integration";
import MarketplaceService from "./integration/contracts";
import ClosePostCommand from "./application/ClosePost/ClosePostCommand";
import ClosePostHandler from "./application/ClosePost/ClosePostHandler";
import PostClosedHandler from "./application/UpdatePost/PostClosedHandler";
import AddCommentCommand from "./application/AddComment/AddCommentCommand";
import AddCommentHandler from "./application/AddComment/AddCommentHandler";
import AddCommentToReadModelHandler from "./application/AddComment/AddCommentToReadModelHandler";
import SBPostCommentsModelStore from "./infrastructure/persistence/SBPostCommentsModelStore";
import ReducePriceCommand from "./application/ReducePrice/ReducePriceCommand";
import ReducePriceHandler from "./application/ReducePrice/ReducePriceHandler";
import PriceReducedHandler from "./application/UpdatePost/PriceReducedHandler";


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
    const postComments = new SBPostCommentsModelStore(config.db.supabaseUrl, config.db.supabaseKey);

    // Command registration
    
    bus.registerCommand(CreatePostCommand.name, new CreatePostHandler(
        postRepository, 
        moderationApi, 
        locationRepository,
        categoryRepository,
        bus,
    ));

    bus.registerCommand(DeletePostCommand.name, new DeletePostHandler(postRepository, bus));
    bus.registerCommand(ClosePostCommand.name, new ClosePostHandler(postRepository, bus));
    bus.registerCommand(AddCommentCommand.name, new AddCommentHandler(postRepository, bus));
    bus.registerCommand(ReducePriceCommand.name, new ReducePriceHandler(postRepository, bus));

    // Event registration
    bus.registerEvent(PostCreatedEvent.name, new CreatePostReadModelHandler(postModels));
    bus.registerEvent(PostModeratedEvent.name, new PostModeratedHandler(postModels));
    bus.registerEvent(PostDeletedEvent.name, new DeletePostReadModelHandler(postModels));
    bus.registerEvent(PostClosedEvent.name, new PostClosedHandler(postModels));
    bus.registerEvent(CommentAddedToPostEvent.name, new AddCommentToReadModelHandler(postComments))
    bus.registerEvent(PriceReducedEvent.name, new PriceReducedHandler(postModels))
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
