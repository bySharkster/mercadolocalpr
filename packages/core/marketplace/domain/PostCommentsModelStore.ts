import PostCommentModel from "./Models/PostCommentModel";

/**
 * Defines the interface for a storage mechanism for post comments.
 * This interface ensures that any class implementing it will have the
 * capability to add a post comment to the underlying storage system.
 *
 * @interface PostCommentsModelStore
 */
export default interface PostCommentsModelStore {
    /**
     * Adds a new post comment to the storage. Implementations should ensure
     * that the comment is persisted according to the specific storage mechanism's requirements.
     * 
     * @param {PostCommentModel} postComment - The post comment model to add to the storage.
     * @returns {Promise<void>} A promise that resolves once the add operation is completed.
     */
    add(postComment: PostCommentModel): Promise<void>;
}
