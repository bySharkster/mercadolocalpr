import { Id, ValueObject } from "../../../../../shared/domain/Values";


/**
 * [placeholder]
 *
 * @class LocationId
 * @typedef {LocationId}
 * @extends {Id}
 */
export class LocationId extends Id {
    /**
     * [placeholder]
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly id: string;
    /**
     * Creates an instance of the LocationId class.
     * @param {string} id - The unique identifier for the User.
     */
    constructor(id: string) {
        super();
        this.id = id;
    }
}


/**
 * [placeholder]
 *
 * @class LocationName
 * @typedef {LocationName}
 * @extends {ValueObject}
 */
export class LocationName extends ValueObject {
    /**
     * [placeholder]
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly name: string;
    
    /**
     * Creates an instance of LocationName.
     *
     * @constructor
     * @param {string} name
     */
    constructor(name: string) {
        super();
        this.name = name;
    }
}