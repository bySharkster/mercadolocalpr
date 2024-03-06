import { Entity } from "../domain/Entity";
import Repository from "../domain/Repository";
import ChangeTracker from "./ChangeTracker";

/**
 * UnitOfWork class represents a unit of work for managing changes to entities and their persistence.
 */
export default class UnitOfWork {
    /**
     * The repository used by the unit of work.
     *
     * @private
     * @type {Repository}
     */
    public repository: Repository;

    /**
     * An array of entities that have been changed within the unit of work.
     *
     * @private
     * @type {Entity[]}
     */
    private changedEntities: Entity[];

    /**
     * Creates an instance of the UnitOfWork class.
     *
     * @param {Repository} repository - The repository associated with the unit of work.
     */
    constructor(repository: Repository) {
        this.repository = repository;
        this.changedEntities = [];
    }

    /**
     * Saves the provided entity, processes its events, and adds it to the list of changed entities.
     *
     * @param {Entity} entity - The entity to be saved.
     * @returns {Promise<void>} - A promise indicating the completion of the save operation.
     * @throws {Error} - Throws an error if the doSave method is not implemented by the concrete subclass.
     */
    public async save(entity: Entity): Promise<void> {
        this.repository.save(entity);
        this.changedEntities.push(entity);
    }

    /**
     * Commits the changes in the unit of work by adding changed entities to the ChangeTracker and resetting the list of changed entities.
     *
     * @public
     */
    public commit(): void {
        this.changedEntities.forEach(e => ChangeTracker.add(e));

        this.resetChangedEntities();
    }

    /**
     * Resets the list of changed entities in the unit of work.
     *
     * @private
     */
    private resetChangedEntities(): void {
        this.changedEntities = [];
    }
}
