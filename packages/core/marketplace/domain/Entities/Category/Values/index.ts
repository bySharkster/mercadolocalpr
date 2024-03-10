import { Id, ValueObject } from "../../../../../shared/domain/Values";

/**
 * Represents a unique identifier for a category in the domain model, extending the generic Id class.
 *
 * @class CategoryId
 * @typedef {CategoryId}
 * @extends {Id}
 */
export class CategoryId extends Id {
    /**
     * The unique identifier for the category.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly id: string;

    /**
     * Creates an instance of the CategoryId class with a specific unique identifier.
     *
     * @param {string} id - The unique identifier for the category.
     */
    constructor(id: string) {
        super();
        this.id = id;
    }
}


/**
 * Represents the name of a category in the domain model, extending the generic ValueObject class.
 *
 * @class CategoryName
 * @typedef {CategoryName}
 * @extends {ValueObject}
 */
export class CategoryName extends ValueObject {
    /**
     * The name of the category.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly name: string;
    
    /**
     * Creates an instance of CategoryName with a specific name.
     *
     * @constructor
     * @param {string} name - The name of the category.
     */
    constructor(name: string) {
        super();
        this.name = name;
    }
}
