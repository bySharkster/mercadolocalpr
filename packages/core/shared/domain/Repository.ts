import DomainEvent from "./DomainEvent";
import { Entity } from "./Entity";

/**
 * Repository interface represents a generic repository for entities with basic CRUD operations.
 *
 * @interface Repository
 * @typedef {Repository}
 */
export default interface Repository {
    /**
     * Saves the given entity in the repository.
     *
     * @param {Entity} entity - The entity to be saved.
     * @returns {Promise<void>} - A promise indicating the completion of the save operation.
     */
    save(entity: Entity): Promise<void>;

    /**
     * Loads all domain events associated with the entity identified by the provided ID.
     *
     * @param {string} id - The ID of the entity.
     * @returns {Promise<DomainEvent[]>} - A promise resolving to an array of domain events associated with the entity.
     */
    loadEvents(id: string): Promise<DomainEvent[]>;
}
