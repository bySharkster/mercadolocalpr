import * as values from "../Values";
import * as events from "../Events";

import ModerationAPI from "../ModerationAPI";
import DomainEvent from "../../../shared/domain/DomainEvent";
import { AggregateRoot } from "../../../shared/domain/Entity";

/**
 * State class representing the current state of a Post aggregate.
 * It contains properties related to the Post entity and methods to apply domain events.
 */
class PostState {
    /**
     * [placeholder]
     *
     * @public
     * @type {boolean}
     */
    public isDeleted: boolean;
    /**
     * [placeholder]
     *
     * @public
     * @type {boolean}
     */
    public isModerated: boolean;

    /**
     * Creates an instance of the PostState class.
     * @param {values.PostId} id - The unique identifier of the post.
     * @param {values.PostInfo} postInfo - Information about the post (title, photoUrl, location, description).
     * @param {values.PostPrice} price - The price of the post.
     * @param {values.SellerId} sellerId - The unique identifier of the user who created the post.
     * @param {values.PostCategoryId} category - The category of the post.
     */
    public constructor(
        public id?: values.PostId,
        public postInfo?: values.PostInfo,
        public price?: values.PostPrice,
        public sellerId?: values.SellerId,
        public category?: values.PostCategoryId,
    ) {
        this.isDeleted = false;
        this.isModerated = false;
    }

    /**
     * Applies a domain event to update the state of the Post.
     * @param {DomainEvent} event - The domain event to be applied.
     */
    public apply(event: DomainEvent) {
        if (event instanceof events.PostCreatedEvent) 
            this.applyPostCreatedEvent(event);
        else if (event instanceof events.PostDeletedEvent)
            this.applyPostDeletedEvent(event);
        else if (event instanceof events.PostModeratedEvent)
            this.applyPostModeratedEvent(event);
        else
            throw new Error(`Unhandled event '${event.constructor.name}'`)
    }

    /**
     * Applies the PostCreatedEvent to update the state with the event data.
     * @param {events.PostCreatedEvent} event - The PostCreatedEvent to be applied.
     */
    private applyPostCreatedEvent(event: events.PostCreatedEvent) {
        this.id = new values.PostId(event.id);
        this.postInfo = new values.PostInfo(event.title, event.photoUrl, event.location, event.description);
        this.price = new values.PostPrice(event.price);
        this.sellerId = new values.SellerId(event.sellerId);
        this.category = new values.PostCategoryId(event.category);
        this.isModerated = false;
        this.isDeleted = false;
    }

    /**
     * Applies the PostDeletedEvent to mark the post as deleted.
     * @param {events.PostDeletedEvent} event - The PostDeletedEvent to be applied.
     */
    private applyPostDeletedEvent(event: events.PostDeletedEvent): void {
        this.isDeleted = true;
    }

    /**
     * [placeholder]
     *
     * @private
     * @param {events.PostModeratedEvent} event
     */
    private applyPostModeratedEvent(event: events.PostModeratedEvent): void {
        this.postInfo = new values.PostInfo(
            event.moderatedTitle,
            this.postInfo!.photoUrl,
            this.postInfo!.location,
            event.moderatedDescription
        );
    }

    /**
     * [placeholder]
     *
     * @public
     * @returns {string}
     */
    public getPostTitle(): string {
        return this.postInfo!.title;
    }

    /**
     * [placeholder]
     *
     * @public
     * @returns {string}
     */
    public getPostDescription(): string {
        return this.postInfo!.description;
    }
}

/**
 * Aggregate root representing a Post entity.
 * It extends the base AggregateRoot class and manages the state of the Post.
 */
export default class Post extends AggregateRoot {
    /**
     * The current state of the Post.
     *
     * @private
     * @type {PostState}
     */
    private state: PostState;

    /**
     * Creates an instance of the Post aggregate.
     * @param {DomainEvent[]} events - Array of domain events to apply during construction.
     */
    public constructor(events?: DomainEvent[]) {
        super();
        this.state = new PostState();

        if (events) events.forEach(e => this.apply(e));
    }

    /**
     * Gets the unique identifier of the post.
     * @returns {string | undefined} - The ID of the post.
     */
    public getId(): string | undefined {
        return this.state.id?.id;
    }

    /**
     * Gets a value indicating whether the post is deleted.
     * @returns {boolean} - True if the post is deleted, otherwise false.
     */
    public get isDeleted(): boolean {
        return this.state.isDeleted;
    }

    /**
     * Checks if the post is owned by the specified user.
     * @param {values.SellerId} sellerId - The ID of the user to check against.
     * @returns {boolean} - True if the post is owned by the specified user, otherwise false.
     */
    public isOwnedBy(sellerId: values.SellerId): boolean {
        if(this.state.sellerId) {
            return this.state.sellerId?.equals(sellerId);
        }

        return false;
    }

    /**
     * Applies a domain event to update the state of the Post.
     * @param {DomainEvent} event - The domain event to be applied.
     */
    protected apply(event: DomainEvent): void {
        this.state.apply(event);
    }

    /**
     * Creates a new Post instance using the provided data and emits a PostCreatedEvent.
     * @param {string} id - The unique identifier for the post.
     * @param {string} title - The title of the post.
     * @param {string} description - The description of the post.
     * @param {string} price - The price of the post.
     * @param {string} location - The location of the post.
     * @param {string} sellerId - The unique identifier of the user creating the post.
     * @param {string} category - The category of the post.
     * @param {string} photoUrl - The URL of the photo associated with the post.
     * @returns {Post} - The newly created Post instance.
     */
    public static create(id: string, title: string, description: string, price: string, location: string, sellerId: string, category: string, photoUrl: string): Post {
        let post = new Post();
        
        let event = new events.PostCreatedEvent(
            id,
            title,
            description,
            price,
            location,
            sellerId,
            category,
            photoUrl
        );

        post.addEvent(event);

        return post;
    }

    /**
     * Marks the post as deleted if the provided user ID matches the owner's ID.
     * @param {values.SellerId} sellerId - The ID of the user initiating the deletion.
     */
    public delete(sellerId: values.SellerId): void {
        let postId = this.state.id;

        if (postId && !this.isDeleted && this.isOwnedBy(sellerId)) {
            this.addEvent(new events.PostDeletedEvent(postId.id));
        }
    }

    /**
     * Moderate the contents of a post.
     *
     * @public
     * @param {ModerationAPI} moderationApi
     */
    public moderate(moderationApi: ModerationAPI): void {
        const currentTitle = this.state.getPostTitle();
        const currentDescription = this.state.getPostDescription();

        const moderatedTitle = moderationApi.clean(currentTitle);
        const moderatedDescription = moderationApi.clean(currentDescription);

        const requiredModeration = (moderatedTitle != currentTitle) || (moderatedDescription != currentDescription);

        this.addEvent(new events.PostModeratedEvent(
            this.state.id!.id,
            moderatedTitle,
            moderatedDescription,
            requiredModeration
        ))
    }
}
