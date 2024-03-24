import DomainEventHandler from "../../../shared/application/DomainEventHandler";
import { PriceReducedEvent } from "../../domain/Events";
import PostReadModelStore from "../../domain/PostReadModelStore";

/**
 * Handles the price reduction event by updating the associated read model.
 *
 * This handler listens for `PriceReducedEvent` events and updates the corresponding post read model
 * with the new price information. It is part of the application's event handling mechanism, 
 * ensuring that the read models reflect the current state of the domain.
 *
 * @class PriceReducedHandler
 * @typedef {PriceReducedHandler}
 * @extends {DomainEventHandler}
 */
export default class PriceReducedHandler extends DomainEventHandler {

    /**
     * Creates an instance of PriceReducedHandler.
     *
     * @constructor
     * @param {PostReadModelStore} postReadModelStore The storage mechanism for post read models,
     * allowing for retrieval and update of post information based on domain events.
     */
    constructor(private postReadModelStore: PostReadModelStore) {
        super();
    }

    /**
     * Handles the `PriceReducedEvent` by fetching the corresponding post read model,
     * updating its price to the new reduced price, and then persisting the updated model.
     *
     * @public
     * @async
     * @param {PriceReducedEvent} evt The event carrying information about the price reduction,
     * including the ID of the post and the new price.
     * @returns {Promise<void>} A promise that resolves once the handling process is complete,
     * indicating that the post read model has been successfully updated or that no action was required.
     */
    public async handle(evt: PriceReducedEvent): Promise<void> {
        let model = await this.postReadModelStore.get(evt.postId.id);

        if(model) {
            model.previousPrice = model.price;
            model.price = evt.newPrice.price;    
            await this.postReadModelStore.update(model);        
        }
    }
}
