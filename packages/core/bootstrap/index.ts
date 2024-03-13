
import initializeMarketplace, { marketplaceApiFactory } from "../marketplace"
import initializeModeration from "../moderation"
import MessageBus from "../shared/infrastructure/MessageBus";
import config from "./config";

/**
 * The message bus instance used for communication within the application.
 *
 * @type {MessageBus}
 */
const messageBus: MessageBus = MessageBus.getInstance(function(bus: MessageBus) {
    const publicApi = {
        marketplace: marketplaceApiFactory(config.marketplace),
    }

    initializeMarketplace(bus, config.marketplace);
    initializeModeration(bus, config.moderation, publicApi.marketplace);
});

export default messageBus;