import ReportedPost from "../Entities/ReportedPost/ReportedPost";

/**
 * Defines the interface for a repository that manages operations related to reported posts,
 * such as retrieving and saving them. This interface ensures that any class implementing it
 * will have methods for getting and saving reported posts, abstracting away the details of
 * data storage and retrieval.
 *
 * @interface ReportedPostsRepository
 * @typedef {ReportedPostsRepository}
 */
export default interface ReportedPostsRepository {
    /**
     * Retrieves a reported post by its unique identifier. If the post exists, it is returned;
     * otherwise, null is returned. This method abstracts the details of how reported posts are
     * stored and allows for asynchronous retrieval.
     *
     * @param {string} id The unique identifier of the reported post to retrieve.
     * @returns {Promise<ReportedPost|null>} A promise that resolves with the reported post or null if not found.
     */
    get(id: string): Promise<ReportedPost|null>;

    /**
     * Saves a reported post to the repository. This method abstracts the details of how reported
     * posts are persisted, allowing for asynchronous operation. It is typically used to add a new
     * reported post or update an existing one.
     *
     * @param {ReportedPost} post The reported post to save.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    save(post: ReportedPost): Promise<void>;
}
