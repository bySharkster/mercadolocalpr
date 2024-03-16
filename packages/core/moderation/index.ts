import MarketplaceService from "../marketplace/integration/contracts";
import AbstractMessageBus from "../shared/application/AbstractMessageBus";
import NotifyReportThresholdReached from "./application/ReportPost/NotifyReportThresholdReached";
import ReportPostCommand from "./application/ReportPost/ReportPostCommand";
import ReportPostHandler from "./application/ReportPost/ReportPostHandler";
import { ReportThresholdReached } from "./domain/Events";
import SBReportedPostsRepository from "./infrastructure/persistence/SBReportedPostsRepository";

/**
 * Creates and returns an instance of SBReportedPostsRepository based on the given configuration.
 * This function initializes the repository needed to interact with reported posts' storage.
 * 
 * @param {any} config - The configuration object containing database connection settings.
 * @returns {SBReportedPostsRepository} An instance of SBReportedPostsRepository configured with Supabase URL and key.
 */
function getPostRepository(config: any): SBReportedPostsRepository {
    return new SBReportedPostsRepository(config.db.supabaseUrl, config.db.supabaseKey);
}

/**
 * Initializes the application's components related to reporting posts. It sets up the post repository
 * and registers the ReportPostHandler with the provided message bus. This function should be called 
 * during the application's initialization phase to ensure the reporting feature is properly configured.
 * 
 * @param {AbstractMessageBus} bus - The message bus used for command and event handling in the application.
 * @param {any} config - The configuration object containing settings such as database connection information.
 * @param {MarketplaceService} marketplace - The service interface for interacting with the marketplace.
 */
export default function initialize(bus: AbstractMessageBus, config: any, marketplace: MarketplaceService): void {
    const postRepository = getPostRepository(config);
    
    bus.registerCommand(
        ReportPostCommand.name, 
        new ReportPostHandler(
            marketplace, 
            postRepository, 
            bus
        )
    );

    bus.registerEvent(
        ReportThresholdReached.name,
        new NotifyReportThresholdReached(
            marketplace,
        )
    )
}
