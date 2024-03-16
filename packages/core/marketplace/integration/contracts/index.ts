/**
 * Specifies the contract for a service that interacts with a marketplace, defining
 * operations that can be performed related to marketplace entities such as posts.
 * This interface ensures that any implementing service can check for the existence
 * of a post in the marketplace and mark a post as unmoderated if necessary. It abstracts
 * the marketplace's specific data handling and provides a consistent interface for
 * interacting with posts in a marketplace context.
 *
 * @interface MarketplaceService
 * @typedef {MarketplaceService}
 */
export default interface MarketplaceService {
    /**
     * Checks if a post with the given identifier exists in the marketplace. This method
     * abstracts the details of the marketplace's data storage and retrieval mechanisms,
     * allowing for asynchronous operation. It is useful for validation and conditional logic
     * in operations involving marketplace posts.
     *
     * @param {string} id The unique identifier of the post to check.
     * @returns {Promise<boolean>} A promise that resolves with `true` if the post exists, otherwise `false`.
     */
    postExists(id: string): Promise<boolean>;

    /**
     * Marks a post identified by the given identifier as unmoderated in the marketplace.
     * This method allows for asynchronous operations and is critical for managing posts that
     * have reached a report threshold or require special attention. It abstracts the underlying
     * process of updating the post's status within the marketplace's data management system.
     *
     * @param {string} id The unique identifier of the post to mark as unmoderated.
     * @returns {Promise<void>} A promise that resolves once the operation to mark the post as unmoderated is completed.
     */
    markPostAsUnmoderated(id: string): Promise<void>;
}
