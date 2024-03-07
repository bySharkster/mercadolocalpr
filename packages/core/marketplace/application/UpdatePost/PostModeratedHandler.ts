import DomainEventHandler from "../../../shared/application/DomainEventHandler";
import { PostModeratedEvent } from "../../domain/Events";
import PostReadModelStore from "../../domain/PostReadModelStore";


export default class PostModeratedHandler extends DomainEventHandler {
    /**
     * Creates an instance of the PostModeratedHandler class.
     * @param {PostReadModelStore} postReadModelStore - The store for the post read model.
     */
    constructor(private postReadModelStore: PostReadModelStore) {
        super();
    }

    /**
     * Handles the PostCreatedEvent by creating a new post read model and adding it to the store.
     * @param {PostCreatedEvent} evt - The PostCreatedEvent to be handled.
     */
    public async handle(evt: PostModeratedEvent): Promise<void> {
        let model = await this.postReadModelStore.get(evt.postId);

        if(model) {
            model.isModerated = true;
            model.title = evt.moderatedTitle;
            model.description = evt.moderatedDescription;
    
            await this.postReadModelStore.update(model);        
        }
        
    }
}
