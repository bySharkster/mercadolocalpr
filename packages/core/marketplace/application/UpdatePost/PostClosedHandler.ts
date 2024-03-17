import DomainEventHandler from "../../../shared/application/DomainEventHandler";
import { PostClosedEvent } from "../../domain/Events";
import PostReadModelStore from "../../domain/PostReadModelStore";

/**
 * Handles events related to the closure of a post, specifically updating the read model to reflect that a post has been closed.
 * This handler listens for `PostClosedEvent` instances and acts upon them by marking the associated post as closed in the read model.
 *
 * @class PostClosedHandler
 * @typedef {PostClosedHandler}
 * @extends {DomainEventHandler}
 */
export default class PostClosedHandler extends DomainEventHandler {

    /**
     * Creates an instance of PostClosedHandler.
     * Initializes the handler with a reference to the PostReadModelStore, enabling it to update the state of posts upon closure.
     *
     * @constructor
     * @param {PostReadModelStore} postReadModelStore - The store managing read models for posts, allowing for state updates.
     */
    constructor(private postReadModelStore: PostReadModelStore) {
        super();
    }

    /**
     * Handles the closure of a post by updating its read model to indicate that it is closed.
     * This action is triggered upon receiving a `PostClosedEvent`, signaling that a specific post has been moderated and closed.
     *
     * @public
     * @async
     * @param {PostClosedEvent} evt - The event indicating that a post has been closed.
     * @returns {Promise<void>} A promise that resolves once the post's read model has been updated to reflect its closed status.
     */
    public async handle(evt: PostClosedEvent): Promise<void> {
        let model = await this.postReadModelStore.get(evt.postId);

        if(model) {
            model.isClosed = true;
    
            await this.postReadModelStore.update(model);        
        }        
    }
}
