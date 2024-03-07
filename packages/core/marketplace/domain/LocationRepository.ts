import Location from "./Entities/Location/Location";

/**
 * Interface representing a repository for managing Location entities.
 */
export default interface LocationRepository {

    /**
     * Acquire a location entity by its unique identifier.
     *
     * @param {string} id
     * @returns {Promise<Location>}
     */
    get(id: string): Promise<Location|null>;
}
