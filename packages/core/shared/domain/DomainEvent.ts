/**
 * Abstract class representing a domain event in the application.
 * Domain events capture a state change or an occurrence within the domain.
 */
export default abstract class DomainEvent {
    /**
     * Timestamp of when the domain event occurred, represented as an ISO string.
     */
    public readonly timestamp: string;

    /**
     * Creates an instance of the DomainEvent class.
     * @param {string} [timestamp] - Optional timestamp for the domain event. Defaults to the current date and time.
     */
    constructor(timestamp?: string) {
        this.timestamp = timestamp ? timestamp : new Date().toISOString();
    }

    /**
     * Converts the domain event to its JSON representation.
     * Subclasses must implement this method to provide their specific JSON format.
     * @returns {string} - The JSON representation of the domain event.
     */
    public abstract toJson(): string;
}
