import Category from "../Entities/Category/Category";

/**
 * Interface representing a repository for managing Category entities.
 */
export default interface CategoryRepository {

    /**
     * Acquire a category entity by its unique identifier.
     *
     * @param {string} id
     * @returns {Promise<Category>}
     */
    get(id: string): Promise<Category|null>;
}
