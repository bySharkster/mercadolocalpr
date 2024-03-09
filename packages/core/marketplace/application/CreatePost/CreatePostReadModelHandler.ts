import { PostCreatedEvent } from "../../domain/Events";
import PostReadModelStore from "../../domain/PostReadModelStore";
import PostModel from "../../domain/Models/PostModel";
import DomainEventHandler from "../../../shared/application/DomainEventHandler";

/**
 * Domain event handler for processing the PostCreatedEvent and updating the post read model.
 * It extends the base DomainEventHandler class.
 */
export default class CreatePostReadModelHandler extends DomainEventHandler {
    /**
     * Creates an instance of the CreatePostReadModelHandler class.
     * @param {PostReadModelStore} postReadModelStore - The store for the post read model.
     */
    constructor(private postReadModelStore: PostReadModelStore) {
        super();
    }

    /**
     * Handles the PostCreatedEvent by creating a new post read model and adding it to the store.
     * @param {PostCreatedEvent} evt - The PostCreatedEvent to be handled.
     */
    public async handle(evt: PostCreatedEvent): Promise<void> {
        // Create a new post read model using the data from the event
        
        let model = new PostModel(
            evt.id,
            evt.title,
            evt.description,
            Number(evt.price),
            evt.locationId,
            evt.sellerId,
            evt.categoryId,
            evt.photoUrl,
            false,  // not moderated
            evt.timestamp
        );

        // Add the new post read model to the store
        await this.postReadModelStore.add(model);
    }
}
