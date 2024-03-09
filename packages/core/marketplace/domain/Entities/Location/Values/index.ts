import { Id, ValueObject } from "../../../../../shared/domain/Values";

/**
 * Represents a unique identifier for a location in the domain model, extending the generic Id class.
 *
 * @class LocationId
 * @typedef {LocationId}
 * @extends {Id}
 */
export class LocationId extends Id {
    /**
     * The unique identifier for the location.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly id: string;

    /**
     * Creates an instance of the LocationId class with a specific unique identifier.
     *
     * @param {string} id - The unique identifier for the location.
     */
    constructor(id: string) {
        super();
        this.id = id;
    }
}


/**
 * Represents the name of a location in the domain model, extending the generic ValueObject class.
 *
 * @class LocationName
 * @typedef {LocationName}
 * @extends {ValueObject}
 */
export class LocationName extends ValueObject {
    /**
     * The name of the location.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly name: string;
    
    /**
     * Creates an instance of LocationName with a specific name.
     *
     * @constructor
     * @param {string} name - The name of the location.
     */
    constructor(name: string) {
        super();
        this.name = name;
    }
}
