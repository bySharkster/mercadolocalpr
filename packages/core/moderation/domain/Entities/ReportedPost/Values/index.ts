import { Id, ValueObject } from "../../../../../shared/domain/Values";


/**
 * Represents the unique identifier of a reported post, extending a generic Id class
 * to ensure type safety and clarity in the use of reported post IDs throughout the application.
 *
 * @class ReportedPostId
 * @typedef {ReportedPostId}
 * @extends {Id}
 */
export class ReportedPostId extends Id {
    /**
     * The unique identifier for a reported post.
     *
     * @private
     * @type {string}
     */
    private id: string;
    
    /**
     * Creates an instance of ReportedPostId, encapsulating the logic for reported post
     * identification within the system.
     *
     * @constructor
     * @param {string} id The unique identifier string for a reported post.
     */
    constructor(id: string){
        super();
        this.id = id;
    }
}

/**
 * Represents the unique identifier of a content flag, extending a generic Id class
 * to provide clear and type-safe identification of content flags.
 *
 * @class ContentFlagId
 * @typedef {ContentFlagId}
 * @extends {Id}
 */
export class ContentFlagId extends Id {
    /**
     * The unique identifier for a content flag.
     *
     * @private
     * @type {string}
     */
    private id: string;

    /**
     * Creates an instance of ContentFlagId, encapsulating the identifier for a content flag
     * within the application.
     *
     * @constructor
     * @param {string} id The unique identifier string for a content flag.
     */
    constructor(id: string) {
        super();
        this.id = id;
    }
}

/**
 * Represents the unique identifier of a user, extending a generic Id class to ensure
 * type safety and clarity in identifying users within the system.
 *
 * @class UserId
 * @typedef {UserId}
 * @extends {Id}
 */
export class UserId extends Id {
    /**
     * The unique identifier for a user.
     *
     * @private
     * @type {string}
     */
    private id: string;

    /**
     * Creates an instance of UserId, providing a mechanism for uniquely identifying
     * a user in the application.
     *
     * @constructor
     * @param {string} id The unique identifier string for a user.
     */
    constructor(id: string) {
        super();
        this.id = id;
    }
}

/**
 * Represents the reason associated with a content flag, encapsulating it within a value
 * object to emphasize its domain significance and to facilitate value object behaviors such as
 * immutability and equality comparison.
 *
 * @class ContentFlagReason
 * @typedef {ContentFlagReason}
 * @extends {ValueObject}
 */
export class ContentFlagReason extends ValueObject {
    /**
     * The reason for the content flag, representing the rationale behind flagging a piece of content.
     *
     * @private
     * @type {string}
     */
    private reason: string;

    /**
     * Creates an instance of ContentFlagReason, capturing the reason a content was flagged.
     *
     * @constructor
     * @param {string} reason The reason behind the content flag.
     */
    constructor(reason: string) {
        super();
        this.reason = reason;
    }
}

/**
 * Represents the timestamp of when a content flag was created or reported, encapsulated
 * within a value object to highlight its importance in the domain and to leverage value object
 * characteristics.
 *
 * @class ContentFlagTimestamp
 * @typedef {ContentFlagTimestamp}
 * @extends {ValueObject}
 */
export class ContentFlagTimestamp extends ValueObject {
    /**
     * The timestamp marking when the content was flagged.
     *
     * @private
     * @type {string}
     */
    private timestamp: string;

    /**
     * Creates an instance of ContentFlagTimestamp, marking the exact moment a piece of content
     * was flagged.
     *
     * @constructor
     * @param {string} timestamp The timestamp of the content flag event.
     */
    constructor(timestamp: string) {
        super();
        this.timestamp = timestamp;
    }
}