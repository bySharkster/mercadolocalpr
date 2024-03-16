import DomainEvent from "../../../shared/domain/DomainEvent";
import ReportedPost from "../Entities/ReportedPost/ReportedPost";

/**
 * Interface defining the contract for repositories managing reported posts. Implementations of this interface
 * are responsible for handling the persistence and retrieval of reported posts and their associated domain events.
 * This allows for a decoupling of the application's core logic from the details of how reported posts are stored and accessed.
 *
 * @interface ReportedPostsRepository
 */
export default interface ReportedPostsRepository {

    /**
     * Retrieves an array of domain events associated with a specific reported post, identified by its unique ID.
     * This method abstracts the details of how events are stored and allows for asynchronous retrieval.
     * 
     * Implementations should ensure that the returned promise resolves to an array of `DomainEvent` instances,
     * potentially empty if no events are found for the specified post ID.
     *
     * @param {string} id The unique identifier of the reported post whose events are to be loaded.
     * @returns {Promise<DomainEvent[]>} A promise that resolves to an array of domain events associated with the reported post.
     */
    loadEvents(id: string): Promise<DomainEvent[]>;

    /**
     * Persists a reported post and its associated events to the repository. This method allows for the asynchronous
     * saving of a reported post, abstracting away the specifics of the storage mechanism. It may involve inserting
     * a new reported post record, updating an existing one, or both.
     *
     * Implementations should ensure that all domain events associated with the reported post are also persisted,
     * handling any necessary serialization and storage logic as required.
     *
     * @param {ReportedPost} post The reported post to be saved, along with its associated events.
     * @returns {Promise<void>} A promise that resolves when the save operation is complete, with no value.
     */
    save(post: ReportedPost): Promise<void>;
}