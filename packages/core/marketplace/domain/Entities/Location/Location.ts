import { Entity } from "../../../../shared/domain/Entity";
import { LocationId, LocationName } from "./Values/LocationId";

/**
 * Represents a location within the application.
 *
 * @class Location
 * @extends {Entity}
 */
export default class Location extends Entity {
    /**
     * The unique identifier of the location.
     *
     * @private
     * @type {LocationId}
     */
    private id: LocationId;

    /**
     * The name associated with the location.
     *
     * @private
     * @type {LocationName}
     */
    private name: LocationName;

    /**
     * Creates an instance of Location.
     *
     * @constructor
     * @param {string} id - The unique identifier of the location.
     * @param {string} name - The name or label associated with the location.
     */
    constructor(id: string, name: string) {
        // Call the constructor of the base class (Entity)
        super();

        // Initialize private properties
        this.id = new LocationId(id);
        this.name = new LocationName(name);
    }

    /**
     * Retrieves the unique identifier of the location.
     *
     * @public
     * @returns {string}
     */
    public getId(): string {
        return this.id.id;
    }

    /**
     * Retrieves the name associated with the location.
     *
     * @public
     * @returns {string}
     */
    public getName(): string {
        return this.name.name;
    }
}