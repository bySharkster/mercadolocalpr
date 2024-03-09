import * as values from "./Values";
import * as events from "../../Events";

import ModerationAPI from "../../ModerationAPI";
import DomainEvent from "../../../../shared/domain/DomainEvent";
import { AggregateRoot } from "../../../../shared/domain/Entity";
import { LocationId } from "../Location/Values";

/**
 * Represents the state of a Post aggregate within the domain, encapsulating all properties and state transitions through domain events.
 */
class PostState {
    /**
     * Indicates whether the post has been deleted.
     *
     * @public
     * @type {boolean}
     */
    public isDeleted: boolean;
    
    /**
     * Indicates whether the post has undergone moderation.
     *
     * @public
     * @type {boolean}
     */
    public isModerated: boolean;

    /**
     * The location ID associated with the post, if any.
     *
     * @public
     * @type {?LocationId}
     */
    public locationId?: LocationId;

    /**
     * Initializes a new instance of the PostState class with optional initial property values.
     * 
     * @param {values.PostId} id - The unique identifier of the post.
     * @param {values.PostInfo} postInfo - Composite information about the post, including title, photo URL, location ID, and description.
     * @param {values.PostPrice} price - The price of the post.
     * @param {values.SellerId} sellerId - The identifier of the seller who created the post.
     * @param {values.PostCategoryId} categoryId - The identifier of the post's category.
     */
    public constructor(
        public id?: values.PostId,
        public postInfo?: values.PostInfo,
        public price?: values.PostPrice,
        public sellerId?: values.SellerId,
        public categoryId?: values.PostCategoryId,
    ) {
        this.isDeleted = false;
        this.isModerated = false;
    }

    /**
     * Applies a given domain event to mutate the state of the Post accordingly.
     * 
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
            throw new Error(`Unhandled event '${event.constructor.name}'`);
    }

    /**
     * Updates the state based on the PostCreatedEvent, initializing it with event data.
     * 
     * @param {events.PostCreatedEvent} event - The event to apply.
     */
    private applyPostCreatedEvent(event: events.PostCreatedEvent) {
        this.id = new values.PostId(event.id);
        this.postInfo = new values.PostInfo(event.title, event.photoUrl, event.locationId, event.description);
        this.price = new values.PostPrice(event.price);
        this.sellerId = new values.SellerId(event.sellerId);
        this.categoryId = new values.PostCategoryId(event.categoryId);
        this.locationId = new LocationId(event.locationId);
        this.isModerated = false;
        this.isDeleted = false;
    }

    /**
     * Marks the post as deleted in response to a PostDeletedEvent.
     * 
     * @param {events.PostDeletedEvent} event - The event to apply.
     */
    private applyPostDeletedEvent(event: events.PostDeletedEvent): void {
        this.isDeleted = true;
    }

    /**
     * Applies moderation changes to the post in response to a PostModeratedEvent.
     * 
     * @param {events.PostModeratedEvent} event - The moderation event to apply.
     */
    private applyPostModeratedEvent(event: events.PostModeratedEvent): void {
        this.postInfo = new values.PostInfo(
            event.moderatedTitle,
            this.postInfo!.photoUrl,
            this.postInfo!.location,
            event.moderatedDescription
        );
        this.isModerated = true;
    }

    /**
     * Retrieves the title of the post.
     * 
     * @public
     * @returns {string} - The post's title.
     */
    public getPostTitle(): string {
        return this.postInfo!.title;
    }

    /**
     * Retrieves the description of the post.
     * 
     * @public
     * @returns {string} - The post's description.
     */
    public getPostDescription(): string {
        return this.postInfo!.description;
    }
}

/**
 * The Post aggregate root, encapsulating the state and behaviors of a Post entity.
 */
export default class Post extends AggregateRoot {
    /**
     * The encapsulated state of the Post.
     * 
     * @private
     * @type {PostState}
     */
    private state: PostState;

    /**
     * Initializes a new instance of the Post aggregate, optionally applying an array of domain events.
     * 
     * @param {DomainEvent[]} events - An optional array of domain events to apply to the state.
     */
    public constructor(events?: DomainEvent[]) {
        super();
        this.state = new PostState();

        if (events) events.forEach(e => this.apply(e));
    }

    /**
     * Gets the unique identifier of the post.
     * 
     * @returns {string | undefined} - The ID of the post, if available.
     */
    public getId(): string | undefined {
        return this.state.id?.id;
    }

    /**
     * Indicates whether the post has been marked as deleted.
     * 
     * @returns {boolean} - True if the post is deleted, otherwise false.
     */
    public get isDeleted(): boolean {
        return this.state.isDeleted;
    }

    /**
     * Determines if the post is owned by a specified user.
     * 
     * @param {values.SellerId} sellerId - The identifier of the seller to compare against.
     * @returns {boolean} - True if the post is owned by the given seller, otherwise false.
     */
    public isOwnedBy(sellerId: values.SellerId): boolean {
        return this.state.sellerId?.equals(sellerId) || false;
    }

    /**
     * Applies a domain event to the Post, modifying its state accordingly.
     * 
     * @param {DomainEvent} event - The domain event to apply.
     */
    protected apply(event: DomainEvent): void {
        this.state.apply(event);
    }

    /**
     * Factory method for creating a new Post instance with the provided parameters and emitting a PostCreatedEvent.
     * 
     * @param {string} id - The post's unique identifier.
     * @param {string} title - The post's title.
     * @param {string} description - The post's description.
     * @param {string} price - The post's price.
     * @param {string} location - The post's location.
     * @param {string} sellerId - The seller's unique identifier.
     * @param {string} category - The post's category.
     * @param {string} photoUrl - The URL of the post's photo.
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
     * Marks the post as deleted if the provided seller ID matches the post's owner.
     * 
     * @param {values.SellerId} sellerId - The identifier of the seller initiating the deletion.
     */
    public delete(sellerId: values.SellerId): void {
        if (this.state.id && !this.isDeleted && this.isOwnedBy(sellerId)) {
            this.addEvent(new events.PostDeletedEvent(this.state.id.id));
        }
    }

    /**
     * Moderates the post using the provided moderation API, applying changes if necessary.
     * 
     * @param {ModerationAPI} moderationApi - The moderation API to use for content review.
     */
    public moderate(moderationApi: ModerationAPI): void {
        const currentTitle = this.state.getPostTitle();
        const currentDescription = this.state.getPostDescription();

        const moderatedTitle = moderationApi.clean(currentTitle);
        const moderatedDescription = moderationApi.clean(currentDescription);

        const requiredModeration = moderatedTitle !== currentTitle || moderatedDescription !== currentDescription;

        if (requiredModeration) {
            this.addEvent(new events.PostModeratedEvent(
                this.state.id!.id,
                moderatedTitle,
                moderatedDescription,
                requiredModeration
            ));
        }
    }
}
