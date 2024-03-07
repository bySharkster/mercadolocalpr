import DomainEvent from "../../shared/domain/DomainEvent";

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
     * Creates an instance of the PostCreatedEvent.
     * @param {string} id - The unique identifier of the created post.
     * @param {string} title - The title of the post.
     * @param {string} description - The description of the post.
     * @param {string} price - The price of the post.
     * @param {string} locationId - The location id of the post.
     * @param {string} sellerId - The unique identifier of the user who created the post.
     * @param {string} categoryId - The category id of the post.
     * @param {string} photoUrl - The URL of the photo associated with the post.
     * @param {string} timestamp - The timestamp of the event.
     */
    constructor(id: string, title: string, description: string, price: string, locationId: string, sellerId: string, categoryId: string, photoUrl: string, timestamp?: string) {
        super(timestamp);
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.locationId = locationId;
        this.sellerId = sellerId;
        this.categoryId = categoryId;
        this.photoUrl = photoUrl;
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
        return new PostModeratedEvent(
            obj.postId,
            obj.moderatedTitle,
            obj.moderatedDescription,
            obj.requiredModeration,
            obj.timestamp
        );
    }
}