import Post from "./Entities/Post";
import DomainEvent from "@/core/shared/domain/DomainEvent";

/**
 * Interface representing a repository for managing Post entities.
 */
export default interface PostRepository {
    /**
     * Loads the events associated with a specific Post using its unique identifier.
     * @param {string} id - The unique identifier of the Post.
     * @returns {Promise<DomainEvent[]>} - A promise that resolves to an array of DomainEvent instances.
     */
    loadEvents(id: string): Promise<DomainEvent[]>;

    /**
     * Saves a Post entity to the repository.
     * @param {Post} post - The Post entity to be saved.
     * @returns {Promise<void>} - A promise that resolves once the save operation is complete.
     */
    save(post: Post): Promise<void>;
}
