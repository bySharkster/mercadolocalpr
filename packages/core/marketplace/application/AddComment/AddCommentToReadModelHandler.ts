import DomainEventHandler from "../../../shared/application/DomainEventHandler";
import { CommentAddedToPostEvent } from "../../domain/Events";
import PostCommentModel from "../../domain/Models/PostCommentModel";
import PostCommentsModelStore from "../../domain/PostCommentsModelStore";

/**
 * Handles the addition of comments to a read model, specifically designed to update
 * the view model store with new comments as they are added to posts. This class extends
 * the DomainEventHandler, allowing it to react to specific domain events, in this case,
 * the CommentAddedToPostEvent.
 *
 * @class AddCommentToReadModelHandler
 * @extends {DomainEventHandler}
 */
export default class AddCommentToReadModelHandler extends DomainEventHandler {

    /**
     * The store where post comments are saved. This allows the handler to add new comments
     * to the persistence layer, effectively updating the read model when a comment is added.
     *
     * @private
     * @type {PostCommentsModelStore}
     */
    private postCommentStore: PostCommentsModelStore;

    /**
     * Initializes a new instance of the AddCommentToReadModelHandler class,
     * setting up the necessary storage mechanism for handling the addition of comments.
     *
     * @constructor
     * @param {PostCommentsModelStore} postCommentStore - The store that will be used to save new comments.
     */
    constructor(postCommentStore: PostCommentsModelStore) {
        super();
        this.postCommentStore = postCommentStore;
    }
    
    /**
     * Responds to the CommentAddedToPostEvent by creating a new PostCommentModel from the event data
     * and adding it to the post comments store. This method ensures that the read model is updated
     * with the latest comment, maintaining consistency with the domain model.
     *
     * @public
     * @param {CommentAddedToPostEvent} evt - The event that triggers the addition of a new comment to the read model.
     * @returns {Promise<void>} A promise that resolves once the comment has been successfully added to the store.
     */
    public async handle(evt: CommentAddedToPostEvent): Promise<void> {

        const model = new PostCommentModel(
            evt.commentId,
            evt.postId,
            evt.commentorId,
            evt.isSeller,
            evt.comment,
            evt.timestamp,
        )

        await this.postCommentStore.add(model);
    }

}