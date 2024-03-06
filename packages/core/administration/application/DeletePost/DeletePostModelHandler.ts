import DomainEventHandler from "../../../shared/application/DomainEventHandler";
import { PostDeletedEvent } from "../../domain/Events";
import PostReadModelStore from "../../domain/PostReadModelStore";

/**
 * Domain event handler for processing the PostDeletedEvent and updating the post read model.
 * It extends the base DomainEventHandler class.
 */
export default class DeletePostReadModelHandler extends DomainEventHandler {
    /**
     * Creates an instance of the DeletePostReadModelHandler class.
     * @param {PostReadModelStore} postReadModelStore - The store for the post read model.
     */
    constructor(private postReadModelStore: PostReadModelStore) {
        super();
    }

    /**
     * Handles the PostDeletedEvent by deleting the corresponding post read model from the store.
     * @param {PostDeletedEvent} evt - The PostDeletedEvent to be handled.
     */
    public async handle(evt: PostDeletedEvent): Promise<void> {
        // Delete the post read model from the store using the post ID from the event
        await this.postReadModelStore.delete(evt.postId);
    }
}