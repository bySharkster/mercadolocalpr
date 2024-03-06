import DomainEvent from "../domain/DomainEvent";
import { Entity } from "../domain/Entity";

/**
 * ChangeTracker class manages tracking changes to entities and provides access to new domain events.
 *
 * @class ChangeTracker
 * @typedef {ChangeTracker}
 */
export default class ChangeTracker {
    /**
     * The singleton instance of the ChangeTracker class.
     *
     * @private
     * @static
     * @type {ChangeTracker}
     */
    private static instance: ChangeTracker;

    /**
     * An array of entities that have been changed.
     *
     * @private
     * @type {Entity[]}
     */
    private changed: Entity[];

    /**
     * Creates an instance of ChangeTracker.
     *
     * @constructor
     * @private
     */
    private constructor() {
        this.changed = [];
    }

    /**
     * Gets the singleton instance of the ChangeTracker.
     *
     * @public
     * @static
     * @returns {ChangeTracker} - The singleton instance of the ChangeTracker class.
     */
    public static getInstance(): ChangeTracker {
        if (!ChangeTracker.instance) {
            ChangeTracker.instance = new ChangeTracker();
        }

        return ChangeTracker.instance;
    }

    /**
     * Adds the provided entity to the list of changed entities.
     *
     * @public
     * @static
     * @param {Entity} entity - The entity to be added.
     */
    public static add(entity: Entity): void {
        const instance = ChangeTracker.getInstance();
        instance.add(entity);
    }

    /**
     * Adds the provided entity to the list of changed entities.
     *
     * @private
     * @param {Entity} entity - The entity to be added.
     */
    private add(entity: Entity): void {
        this.changed.push(entity);
    }

    /**
     * Clears the list of changed entities.
     *
     * @private
     */
    private clear(): void {
        this.changed = [];
    }

    /**
     * Gets the array of changed entities.
     *
     * @public
     * @readonly
     * @type {Entity[]} - The array of changed entities.
     */
    public get entities(): Entity[] {
        return this.changed;
    }

    /**
     * Gets new domain events associated with changed entities, clears the events, and resets the list of changed entities.
     *
     * @public
     * @static
     * @returns {DomainEvent[]} - An array of new domain events.
     */
    public static getNewEvents(): DomainEvent[] {
        const instance = ChangeTracker.getInstance();

        let events: DomainEvent[] = [];

        for (const entity of instance.changed) {
            events = events.concat(entity.getEvents());
            entity.clearEvents();
        }

        instance.clear();

        return events;
    }
}