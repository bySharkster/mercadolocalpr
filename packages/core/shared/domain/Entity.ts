import DomainEvent from "./DomainEvent";

/**
 * Abstract class representing an entity in the domain.
 * Entities are objects with a distinct identity that runs through time and different states.
 */
export abstract class Entity {
    private domainEvents: DomainEvent[];

    /**
     * Creates an instance of the Entity class.
     */
    constructor() {
        this.domainEvents = [];
    }

    /**
     * Adds a domain event to the entity, applies the event, and stores it in the list of domain events.
     * @param {DomainEvent} event - The domain event to be added.
     */
    public addEvent(event: DomainEvent): void {
        this.domainEvents.push(event);
        this.apply(event);
    }

    /**
     * Gets the list of domain events associated with the entity.
     * @returns {DomainEvent[]} - The list of domain events.
     */
    public getEvents(): DomainEvent[] {
        return this.domainEvents;
    }

    /**
     * Clears the list of domain events associated with the entity.
     */
    public clearEvents(): void {
        this.domainEvents = [];
    }

    /**
     * Abstract method to be implemented by subclasses to apply domain events.
     * @param {DomainEvent} event - The domain event to be applied.
     */
    protected abstract apply(event: DomainEvent): void;
}

/**
 * Abstract class representing an aggregate root in the domain.
 * Aggregate roots are special entities that define the boundaries of a consistency boundary.
 */
export abstract class AggregateRoot extends Entity {
    // Additional functionality specific to aggregate roots can be added here.
}
