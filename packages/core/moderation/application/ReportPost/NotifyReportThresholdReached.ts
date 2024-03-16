import MarketplaceService from "../../../marketplace/integration/contracts";
import DomainEventHandler from "../../../shared/application/DomainEventHandler";
import { ReportThresholdReached } from "../../domain/Events";

/**
 * Handles the event when a report's threshold is reached within the system,
 * marking the associated post as unmoderated in the marketplace service.
 *
 * @class NotifyReportThresholdReached
 * @typedef {NotifyReportThresholdReached}
 * @extends {DomainEventHandler}
 */
export default class NotifyReportThresholdReached extends DomainEventHandler {
    /**
     * Reference to the marketplace service to perform operations like marking a post as unmoderated.
     *
     * @private
     * @type {MarketplaceService}
     */
    private marketplace: MarketplaceService;

    /**
     * Creates an instance of NotifyReportThresholdReached.
     * Initializes the handler with a marketplace service to interact with marketplace-related operations.
     *
     * @constructor
     * @param {MarketplaceService} marketplace The marketplace service instance to use for marketplace operations.
     */
    constructor(marketplace: MarketplaceService) {
        super();
        this.marketplace = marketplace;
    }

    /**
     * Handles the event where a report threshold is reached. It marks the post associated with the event
     * as unmoderated in the marketplace by calling the marketplace service.
     *
     * @public
     * @param {ReportThresholdReached} evt The event that contains the details of the report threshold being reached, including the post ID.
     * @returns {Promise<void>} A promise that resolves once the operation to mark the post as unmoderated is completed.
     */
    public async handle(evt: ReportThresholdReached): Promise<void> {
        await this.marketplace.markPostAsUnmoderated(evt.postId);
    }

}
