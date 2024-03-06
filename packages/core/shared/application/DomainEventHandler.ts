import DomainEvent from "../domain/DomainEvent";

/**
 * Abstract class representing a handler for a specific domain event type.
 * Domain event handlers are responsible for reacting to domain events and executing the associated logic.
 */
export default abstract class DomainEventHandler {
    /**
     * Handles the provided domain event by executing the associated logic.
     * @param {DomainEvent} evt - The domain event to be handled.
     */
    public abstract handle(evt: DomainEvent): Promise<void>;
}
