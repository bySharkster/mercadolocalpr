import * as values from "./Values";
import * as events from "../../Events";

import ModerationAPI from "../../ModerationAPI";
import DomainEvent from "../../../../shared/domain/DomainEvent";
import { AggregateRoot } from "../../../../shared/domain/Entity";
import { LocationId } from "../Location/Values";
import PostComment from "../PostComment/PostComment";
import { PostEffectiveRange } from "./Values";


/**
 * Represents the possible states a post can have.
 *
 * @class PostStatus
 * @typedef {PostStatus}
 */
class PostStatus {
    /**
     * Indicates that the post is open and visible to users.
     *
     * @static
     * @type {string}
     */
    static OPEN: string = 'open';

    /**
     * Indicates that the post is closed, possibly still visible but not active for new interactions.
     *
     * @static
     * @type {string}
     */
    static CLOSED: string = 'closed';

    /**
     * Indicates that the post has been deleted and is likely not visible to users anymore.
     *
     * @static
     * @type {string}
     */
    static DELETED: string = 'deleted';
}


/**
 * Represents the state of a Post aggregate within the domain, encapsulating all properties and state transitions through domain events.
 */
class PostState {
    /**
     * Represents the possible states a post can have.
     *
     * @public
     * @type {string}
     */
    public status: string;
    
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
     * A list of comments associated with the post.
     *
     * @public
     * @type {PostComment[]}
     */
    public comments: PostComment[];

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
        public effectiveRange?: PostEffectiveRange,

    ) {
        this.status = PostStatus.OPEN;
        this.isModerated = false;
        this.comments = [];
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
        else if (event instanceof events.PostClosedEvent)
            this.applyPostClosedEvent(event);
        else if (event instanceof events.CommentAddedToPostEvent)
            this.applyCommentAddedToPostEvent(event);
        else if (event instanceof events.PriceReducedEvent)
            this.applyPriceReducedEvent(event);
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
        this.effectiveRange = event.effectiveRange;
        this.isModerated = false;
    }

    /**
     * Marks the post as deleted in response to a PostDeletedEvent.
     * 
     * @param {events.PostDeletedEvent} event - The event to apply.
     */
    private applyPostDeletedEvent(event: events.PostDeletedEvent): void {
        this.status = PostStatus.DELETED;
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
     * Marks the post as closed in response to a PostClosedEvent.
     *
     * @param {events.PostClosedEvent} event - The event to apply.
     */
    private applyPostClosedEvent(event: events.PostClosedEvent) {
        this.status = PostStatus.CLOSED;
    }

    /**
     * Adds a new comment to the post in response to a CommentAddedToPostEvent.
     *
     * @private
     * @param {events.CommentAddedToPostEvent} event - The event indicating a new comment has been added.
     */
    private applyCommentAddedToPostEvent(event: events.CommentAddedToPostEvent) {
        this.comments.push(new PostComment(
            event.commentId,
            event.commentorId,
            event.comment,
        ));
    }

    /**
     * Assign a new price in response to a PriceReducedEvent.
     *
     * @private
     * @param {events.PriceReducedEvent} event - The event indicating that the price of a post was reduced.
     */
    private applyPriceReducedEvent(event: events.PriceReducedEvent) {
        this.price = event.newPrice;
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

        this.clearEvents();
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
        return this.state.status == PostStatus.DELETED;
    }

    /**
     * Indicates whether the post has been closed.
     * 
     * @returns {boolean} - True if the post is deleted, otherwise false.
     */
    public get isClosed(): boolean {
        return this.state.status == PostStatus.CLOSED;
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
     * @param {string} categoryId - The post's category id.
     * @param {string} photoUrl - The URL of the post's photo.
     * @returns {Post} - The newly created Post instance.
     */
    public static create(
        id: string,
        title: string,
        description: string,
        price: string,
        location: string,
        sellerId: string,
        categoryId: string,
        photoUrl: string
    ): Post {
        let post = new Post();

        const effectiveRange = PostEffectiveRange.expiresIn(30);
        
        let event = new events.PostCreatedEvent(
            id,
            title,
            description,
            price,
            location,
            sellerId,
            categoryId,
            photoUrl,
            effectiveRange,
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
     * Closes the post if it is owned by the specified seller and not already deleted.
     * This method is intended to be used for ending the lifecycle of a post in a manner different from deletion,
     * such as finalizing a sale or otherwise removing it from active listings without marking it as deleted.
     *
     * @public
     * @param {values.SellerId} sellerId The identifier of the seller initiating the close action.
     */
    public close(sellerId: values.SellerId): void {
        if(this.state.id && !this.isDeleted && !this.isClosed && this.isOwnedBy(sellerId)) {
            const closedAt = new Date().toISOString();
            this.addEvent(new events.PostClosedEvent(this.state.id.id, closedAt))
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

    /**
     * Adds a comment to the post, assuming the post is not closed or deleted.
     * Throws an error if the post is closed or deleted. Otherwise, it triggers an event
     * to add the comment, ensuring the comment does not already exist.
     *
     * @public
     * @param {string} commentorId - The ID of the commenter.
     * @param {string} commentId - The unique identifier for the new comment.
     * @param {string} comment - The content of the comment.
     * @throws {Error} If the post is closed or deleted.
     */
    public comment(commentorId: string, commentId: string, comment: string): void {
        
        if(this.isClosed || this.isDeleted) {
            throw new Error("Cannot add a comment to a closed/deleted post.")
        }

        const postId = this.state.id!.id;
        const isSeller = this.isOwnedBy(new values.SellerId(commentorId));

        const commentExists = this.state.comments.filter(c => c.getId() == commentId).length > 0;
        
        if(!commentExists) {
            this.addEvent(new events.CommentAddedToPostEvent(
                postId,
                commentorId,
                commentId,
                comment,
                isSeller
            ));
        }
    }
    
    /**
     * Reduce the price of the post.
     *
     * @public
     * @param {values.PostPrice} newPrice - The new price of the post.
     * @param {values.SellerId} sellerId - The identifier of the seller initiating the reduce action.
     */
    public reducePrice(newPrice: values.PostPrice, sellerId: values.SellerId): void {
        if(this.isClosed || this.isDeleted) {
            throw new Error("Cannot reduce the price of a closed/deleted post.");
        }

        if(!this.isOwnedBy(sellerId)) {
            throw new Error(`Post with id '${this.getId()}' is not owned by '${sellerId.id}'`);
        }

        if(!newPrice.isReducedFrom(this.state.price!)) {
            const _new = newPrice.price;
            const _old = this.state.price!.price;

            throw new Error(`New Price (${_new}) is not a reduction from current price (${_old}).`);
        }

        this.addEvent(new events.PriceReducedEvent(this.state.id!, newPrice));
    }
}
