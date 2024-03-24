import DomainEvent from "../../shared/domain/DomainEvent";
import { PostEffectiveRange, PostId, PostPrice } from "./Entities/Post/Values";

/**
 * Domain event representing the creation of a new post.
 * It extends the base DomainEvent class.
 */
export class PostCreatedEvent extends DomainEvent {
    /**
     * @type {string} - The unique identifier of the created post.
     */
    public readonly id: string;

    /**
     * @type {string} - The title of the post.
     */
    public readonly title: string;

    /**
     * @type {string} - The description of the post.
     */
    public readonly description: string;

    /**
     * @type {string} - The price of the post.
     */
    public readonly price: string;

    /**
     * @type {string} - The location id of the post.
     */
    public readonly locationId: string;

    /**
     * @type {string} - The unique identifier of the user who created the post.
     */
    public readonly sellerId: string;

    /**
     * @type {string} - The category id of the post.
     */
    public readonly categoryId: string;

    /**
     * @type {string} - The URL of the photo associated with the post.
     */
    public readonly photoUrl: string;

    /**
     * @type {PostEffectiveRange} - The date range the post is in effect.
     */
    public readonly effectiveRange: PostEffectiveRange;

    /**
     * Creates an instance of the PostCreatedEvent.
     * @param {string} id - The unique identifier of the created post.
     * @param {string} title - The title of the post.
     * @param {string} description - The description of the post.
     * @param {string} price - The price of the post.
     * @param {string} locationId - The location id of the post.
     * @param {string} sellerId - The unique identifier of the user who created the post.
     * @param {string} categoryId - The category id of the post.
     * @param {string} photoUrl - The URL of the photo associated with the post.
     * @param {PostEffectiveRange} effectiveRange - The date range the post is in effect.
     * @param {string} timestamp - The timestamp of the event.
     */
    constructor(
        id: string, 
        title: string, 
        description: string, 
        price: string, 
        locationId: string, 
        sellerId: string,
        categoryId: string,
        photoUrl: string,
        effectiveRange: PostEffectiveRange,
        timestamp?: string,
    ) {
        super(timestamp);
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.locationId = locationId;
        this.sellerId = sellerId;
        this.categoryId = categoryId;
        this.photoUrl = photoUrl;
        this.effectiveRange = effectiveRange;
    }

    /**
     * Converts the event to a JSON-formatted string.
     * @returns {string} - The JSON-formatted string representing the event.
     */
    public toJson(): string {
        return JSON.stringify({
            id: this.id,
            title: this.title,
            description: this.description,
            price: this.price,
            locationId: this.locationId,
            sellerId: this.sellerId,
            categoryId: this.categoryId,
            photoUrl: this.photoUrl,
            effective: this.effectiveRange.effectiveDate.toISOString(),
            expiration: this.effectiveRange.expirationDate.toISOString(),
        });
    }

    /**
     * Creates a PostCreatedEvent instance from a JSON object.
     * @param {any} obj - The JSON object containing event data.
     * @returns {PostCreatedEvent} - The created PostCreatedEvent instance.
     */
    public static fromJson(obj: any): PostCreatedEvent {
        const data = JSON.parse(obj.data);
        
        return new PostCreatedEvent(
            data.id,
            data.title,
            data.description,
            data.price,
            data.locationId,
            data.sellerId,
            data.categoryId,
            data.photoUrl,
            PostEffectiveRange.fromString(data.effective, data.expiration),
            obj.timestamp,
        );
    }
}

/**
 * Domain event representing the deletion of a post.
 * It extends the base DomainEvent class.
 */
export class PostDeletedEvent extends DomainEvent {
    /**
     * @type {string} - The unique identifier of the post to be deleted.
     */
    public readonly postId: string;

    /**
     * Creates an instance of the PostDeletedEvent.
     * @param {string} postId - The unique identifier of the post to be deleted.
     * @param {string} timestamp - The timestamp of the event.
     */
    constructor(postId: string, timestamp?: string) {
        super(timestamp);
        this.postId = postId;
    }

    /**
     * Converts the event to a JSON-formatted string.
     * @returns {string} - The JSON-formatted string representing the event.
     */
    public toJson(): string {
        return JSON.stringify({ postId: this.postId });
    }

    /**
     * Creates a PostDeletedEvent instance from a JSON object.
     * @param {any} obj - The JSON object containing event data.
     * @returns {PostDeletedEvent} - The created PostDeletedEvent instance.
     */
    public static fromJson(obj: any): PostDeletedEvent {
        return new PostDeletedEvent(obj.postId, obj.timestamp);
    }
}


/**
 * Represents an event indicating that a post has been marked as moderated.
 * Extends the base DomainEvent class.
 */
export class PostModeratedEvent extends DomainEvent {
    /** The unique identifier of the post. */
    public readonly postId: string;

    /** The moderated title of the post. */
    public readonly moderatedTitle: string;

    /** The moderated description of the post. */
    public readonly moderatedDescription: string;

    /** The moderated description of the post. */
    public readonly requiredModeration: boolean;

    /**
     * Creates an instance of the PostModeratedEvent.
     * @param {string} postId - The unique identifier of the post.
     * @param {string} moderatedTitle - The moderated title of the post.
     * @param {string} moderatedDescription - The moderated description of the post.
     * @param {boolean} requiredModeration - Flag indicateing if the post required moderation.
     * @param {string} timestamp - The timestamp of the event.
     */
    constructor(
        postId: string,
        moderatedTitle: string,
        moderatedDescription: string,
        requiredModeration: boolean,
        timestamp?: string
    ) {
        super(timestamp);
        this.postId = postId;
        this.moderatedTitle = moderatedTitle;
        this.moderatedDescription = moderatedDescription;
        this.requiredModeration = requiredModeration;
    }

    /**
     * Converts the event to a JSON-formatted string.
     * @returns {string} - The JSON-formatted string representing the event.
     */
    public toJson(): string {
        return JSON.stringify({
            postId: this.postId,
            moderatedTitle: this.moderatedTitle,
            moderatedDescription: this.moderatedDescription,
            requiredModeration: this.requiredModeration,
        });
    }

    /**
     * Creates a PostModeratedEvent instance from a JSON object.
     * @param {any} obj - The JSON object containing event data.
     * @returns {PostModeratedEvent} - The created PostModeratedEvent instance.
     */
    public static fromJson(obj: any): PostModeratedEvent {
        const data = JSON.parse(obj.data);

        return new PostModeratedEvent(
            data.postId,
            data.moderatedTitle,
            data.moderatedDescription,
            data.requiredModeration,
            obj.timestamp
        );
    }
}


/**
 * Event indicating that a post has been closed.
 * Extends the DomainEvent class, adding specific information about the post closure,
 * including the time the closure occurred. Can be serialized to and from JSON.
 *
 * @class PostClosedEvent
 * @typedef {PostClosedEvent}
 * @extends {DomainEvent}
 */
export class PostClosedEvent extends DomainEvent {
    
    /**
     * Creates an instance of PostClosedEvent.
     * Initializes the event with the closure timestamp.
     *
     * @constructor
     * @param {string} postId The if of the post that was closed.
     * @param {string} closedAt The timestamp when the post was closed.
     */
    constructor(
        public readonly postId: string,
        public readonly closedAt: string,
        timestamp?: string,
    ) {
        super(timestamp);
    }

    /**
     * Serializes the PostClosedEvent instance to a JSON string.
     * Useful for logging or sending the event over a network.
     *
     * @public
     * @returns {string} JSON string representation of the PostClosedEvent instance.
     */
    public toJson(): string {
        return JSON.stringify({
            postId: this.postId,
            closedAt: this.closedAt,
        });
    }

    /**
     * Deserializes a JSON object to a PostClosedEvent instance.
     * Useful for creating an event instance from data received over a network or from logs.
     *
     * @public
     * @param {*} obj JSON object containing the 'closedAt' field.
     * @returns {PostClosedEvent} An instance of PostClosedEvent with the data from the JSON object.
     */
    public static fromJson(obj: any): PostClosedEvent {
        const data = JSON.parse(obj.data);

        return new PostClosedEvent(
            data.postId,
            data.closedAt,
            obj.timestamp
        )
    }
}


/**
 * Represents an event where a comment is added to a post, extending the DomainEvent class.
 * This event captures all necessary information about the comment and its association with a specific post.
 *
 * @class CommentAddedToPostEvent
 * @typedef {CommentAddedToPostEvent}
 * @extends {DomainEvent}
 */
export class CommentAddedToPostEvent extends DomainEvent {
    /**
     * Initializes a new instance of the CommentAddedToPostEvent class with details about the comment added to the post.
     *
     * @constructor
     * @param {string} postId The unique identifier of the post to which the comment is added.
     * @param {string} commentorId The unique identifier of the user who added the comment.
     * @param {string} commentId The unique identifier of the comment.
     * @param {string} comment The content of the comment.
     * @param {boolean} isSeller Indicates whether the commenter is the seller.
     * @param {?string} [timestamp] The timestamp when the comment was added. Optional.
     */
    constructor(
        public readonly postId: string,
        public readonly commentorId: string,
        public readonly commentId: string,
        public readonly comment: string,
        public readonly isSeller: boolean,
        timestamp?: string
    ) {
        super(timestamp);
    }
    
    /**
     * Converts the event data to a JSON string.
     * Useful for serialization or logging purposes.
     *
     * @public
     * @returns {string} A JSON string representation of the event data.
     */
    public toJson(): string {
        return JSON.stringify({
            postId: this.postId,
            commentorId: this.commentorId,
            commentId: this.commentId,
            comment: this.comment,
            isSeller: this.isSeller,
        });
    }

    /**
     * Constructs a CommentAddedToPostEvent instance from a JSON object.
     * This method is used to deserialize the event data from a JSON representation.
     *
     * @public
     * @static
     * @param {*} obj A JSON object containing event data, including a data string and optionally a timestamp.
     * @returns {CommentAddedToPostEvent} An instance of CommentAddedToPostEvent constructed from the provided JSON data.
     */
    public static fromJson(obj: any): CommentAddedToPostEvent {
        const data = JSON.parse(obj.data);

        return new CommentAddedToPostEvent(
            data.postId,
            data.commentorId,
            data.commentId,
            data.comment,
            data.isSeller,
            obj.timestamp,
        );
    }
}


/**
 * Represents an event indicating that the price of a post has been reduced.
 * Inherits from DomainEvent to provide base event functionalities.
 *
 * @class PriceReducedEvent
 * @extends {DomainEvent}
 */
export class PriceReducedEvent extends DomainEvent {
    /**
     * Initializes a new instance of the PriceReducedEvent class.
     *
     * @constructor
     * @param {PostId} postId The ID of the post whose price has been reduced.
     * @param {PostPrice} newPrice The new price of the post.
     * @param {?string} [timestamp] The timestamp of when the event occurred, optional.
     */
    constructor(
        public readonly postId: PostId,
        public readonly newPrice: PostPrice, 
        timestamp?: string,
    ) {
        super(timestamp);
    }

    /**
     * Converts the PriceReducedEvent to a JSON string representation.
     *
     * @public
     * @returns {string} The JSON string representation of the event.
     */
    public toJson(): string {
        return JSON.stringify({
            postId: this.postId.id,
            newPrice: this.newPrice.price,
        });
    }

    /**
     * Constructs a PriceReducedEvent instance from a JSON string.
     *
     * @public
     * @static
     * @param {*} obj The JSON object containing event data.
     * @returns {PriceReducedEvent} The reconstructed PriceReducedEvent instance.
     */
    public static fromJson(obj: any): PriceReducedEvent {
        const data = JSON.parse(obj.data);

        return new PriceReducedEvent(
            new PostId(data.postId),
            new PostPrice(data.newPrice),
            obj.timestamp,
        );
    }
}