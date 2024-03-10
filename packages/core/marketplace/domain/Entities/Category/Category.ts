import { Entity } from "../../../../shared/domain/Entity";
import { CategoryId, CategoryName } from "./Values";

/**
 * Represents a category within the application.
 *
 * @class Category
 * @extends {Entity}
 */
export default class Category extends Entity {
    /**
     * The unique identifier of the category.
     *
     * @private
     * @type {CategoryId}
     */
    private id: CategoryId;

    /**
     * The name associated with the category.
     *
     * @private
     * @type {CategoryName}
     */
    private name: CategoryName;

    /**
     * Creates an instance of Category.
     *
     * @constructor
     * @param {string} id - The unique identifier of the category.
     * @param {string} name - The name or label associated with the category.
     */
    constructor(id: string, name: string) {
        // Call the constructor of the base class (Entity)
        super();

        // Initialize private properties
        this.id = new CategoryId(id);
        this.name = new CategoryName(name);
    }

    /**
     * Retrieves the unique identifier of the category.
     *
     * @public
     * @returns {string}
     */
    public getId(): string {
        return this.id.id;
    }

    /**
     * Retrieves the name associated with the category.
     *
     * @public
     * @returns {string}
     */
    public getName(): string {
        return this.name.name;
    }
}