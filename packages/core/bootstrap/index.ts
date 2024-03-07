
import initializeMarketplace from "../marketplace"
import MessageBus from "../shared/infrastructure/MessageBus";
import config from "./config";

/**
 * The message bus instance used for communication within the application.
 *
 * @type {MessageBus}
 */
const messageBus: MessageBus = MessageBus.getInstance(function(bus: MessageBus){
    // Initialize the marketplace module and configure it with the message bus and marketplace configuration.
    initializeMarketplace(bus, config.marketplace);
});

export default messageBus;