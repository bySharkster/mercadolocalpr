/**
 * Base class representing a value object in the domain.
 * Value objects are immutable and should be used to model attributes of entities.
 */
export class ValueObject {
    // Additional functionality specific to value objects can be added here.
}

/**
 * Class representing an identifier (ID) in the domain.
 * Identifiers are used to uniquely identify entities.
 * It extends the ValueObject class, indicating that it is an immutable object.
 */
export class Id extends ValueObject {
    // Additional functionality specific to identifiers can be added here.
}
