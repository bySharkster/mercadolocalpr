/**
 * Specifies the contract for a service that interacts with a marketplace, defining
 * operations that can be performed related to marketplace entities such as posts.
 * This interface ensures that any implementing service can check for the existence
 * of a post in the marketplace.
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
}
