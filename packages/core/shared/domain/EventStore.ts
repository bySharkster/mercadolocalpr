import DomainEvent from "./DomainEvent";

/**
 * Interface representing an event store for storing and retrieving domain events.
 */
export interface EventStore {
    /**
     * Loads the domain events for the specified entity ID.
     * @param {string} id - The ID of the entity for which to load events.
     * @returns {DomainEvent[]} - The array of domain events associated with the entity.
     */
    loadEvents(id: string): DomainEvent[];

    /**
     * Appends domain events to the event store for the specified entity ID.
     * @param {string} id - The ID of the entity for which to append events.
     * @param {DomainEvent[]} events - The array of domain events to be appended.
     * @param {number} expectedVersion - The expected version of the entity to ensure concurrency control.
     */
    append(id: string, events: DomainEvent[], expectedVersion: number): void;
}
