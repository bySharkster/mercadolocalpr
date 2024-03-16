import DomainEvent from "../../../../shared/domain/DomainEvent";
import { AggregateRoot, Entity } from "../../../../shared/domain/Entity";
import { PostReported, ReportThresholdReached } from "../../Events";
import * as values from "./Values";


/**
 * Represents a flag or report made against a post's content, encapsulating the
 * details such as the identity of the reporter, the reason for the report, and
 * the timestamp of the report. It extends Entity to include domain-specific
 * behaviors and properties.
 *
 * @class ContentFlag
 * @extends {Entity}
 */
export class ContentFlag extends Entity {
    /**
     * The unique identifier for the content flag, encapsulated within a domain-specific value object
     * to enforce identity integrity and consistency throughout the application.
     * 
     * @private
     * @type {values.ContentFlagId}
     */
    private id: values.ContentFlagId;

    /**
     * The identifier of the reported post associated with this content flag, allowing for a direct
     * relationship between the report and the content in question. This is crucial for tracking and managing
     * reports in the context of their associated posts.
     * 
     * @private
     * @type {values.ReportedPostId}
     */
    private postId: values.ReportedPostId;

    /**
     * The identifier of the user who created the content flag, represented as a value object to ensure
     * the identity's validity and to facilitate tracking user activity and accountability within the system.
     * 
     * @private
     * @type {values.UserId}
     */
    private userId: values.UserId;

    /**
     * The reason provided for the content flag, encapsulated within a value object to validate and standardize
     * the reasons reported by users, ensuring they are actionable and understandable within the domain context.
     * 
     * @private
     * @type {values.ContentFlagReason}
     */
    private reason: values.ContentFlagReason;

    /**
     * The timestamp marking when the content flag was created, encapsulated within a value object to ensure
     * consistency and validity of temporal data across the application, aiding in report management and auditing.
     * 
     * @private
     * @type {values.ContentFlagTimestamp}
     */
    private timestamp: values.ContentFlagTimestamp;

    /**
     * Instantiates a ContentFlag entity with provided identifiers, reason, and timestamp, ensuring all
     * properties are initialized with proper domain-specific value objects for integrity and consistency.
     *
     * @param {string} id The unique identifier for the content flag.
     * @param {values.ReportedPostId} postId The identifier of the reported post.
     * @param {string} userId The identifier of the user who reported the post.
     * @param {string} reason The reason the post was reported.
     * @param {string} timestamp The timestamp when the flag was created.
     */
    constructor(
        id: string, 
        postId: values.ReportedPostId,
        userId: string, 
        reason: string, 
        timestamp: string,
    ){
        super();
        this.id = new values.ContentFlagId(id);
        this.postId = postId;
        this.userId = new values.UserId(userId);
        this.reason = new values.ContentFlagReason(reason);
        this.timestamp = new values.ContentFlagTimestamp(timestamp);
    }

    /**
     * Retrieves the unique identifier of the content flag.
     *
     * @returns {string} The content flag's unique identifier.
     */
    public getId(): string {
        return this.id.id;
    }

    /**
     * Retrieves the identifier of the user who created the content flag.
     *
     * @returns {string} The user's unique identifier.
     */
    public getUserId(): string {
        return this.userId.id;
    }

    /**
     * Retrieves the reason provided for the content flag.
     *
     * @returns {string} The reason for the content flag.
     */
    public getReason(): string {
        return this.reason.reason;
    }

    /**
     * Retrieves the timestamp when the content flag was created.
     *
     * @returns {string} The creation timestamp of the content flag.
     */
    public getTimeStamp(): string {
        return this.timestamp.timestamp;
    }
}

/**
 * Represents a post that has been reported by users. It extends AggregateRoot to leverage
 * domain-driven design principles, handling the aggregation of reports and the determination
 * of when a post reaches a report threshold requiring moderation.
 */
export default class ReportedPost extends AggregateRoot {
    /**
     * The minimum number of reports required for a post to reach the report threshold.
     *
     * @private
     * @static
     * @type {number}
     */
    private static MIN_REPORT_THRESHOLD = 3;

    /**
     * The unique identifier of the reported post. Encapsulated within a value object
     * to ensure consistency and integrity of the post's identity throughout the domain.
     *
     * @private
     * @type {values.ReportedPostId}
     */
    private id: values.ReportedPostId|null;

    /**
     * A collection of ContentFlag instances, each representing a specific report or flag
     * against the post's content. This collection facilitates the aggregation of all reports
     * associated with the post.
     *
     * @private
     * @type {ContentFlag[]}
     */
    private flags: ContentFlag[];

    /**
     * Indicates whether the post has been marked for moderation based on the reports it has received.
     *
     * @private
     * @type {boolean}
     */
    private markedForModeration: boolean;

    /**
     * Initializes a new instance of ReportedPost with an initially empty collection of content flags
     * and sets the post as not marked for moderation. Optionally processes a list of domain events.
     *
     * @param {DomainEvent[]} [events] Optional array of domain events to process during instantiation.
     */
    constructor(events?: DomainEvent[]) {
        super();
        this.id = null;
        this.flags = [];
        this.markedForModeration = false;

        events = events ? events : [];

        for(const evt of events) this.apply(evt);

        this.clearEvents();
    }

    /**
     * Applies a domain event to the ReportedPost entity, altering its state according to the event's type.
     * Supports `PostReported` and `ReportThresholdReached` events.
     *
     * @protected
     * @param {DomainEvent} event The domain event to apply.
     * @throws If the event type is unhandled.
     */
    protected apply(event: DomainEvent): void {
        if(event instanceof PostReported) {
            this.applyPostReportedEvent(event);
        } else if(event instanceof ReportThresholdReached) {
            this.applyReportThresholdReached(event);
        } else {
            throw new Error(`Unhandled event '${event.constructor.name}'`);
        }
    }

    /**
     * Static factory method to create a new ReportedPost instance with a given identifier.
     *
     * @public
     * @static
     * @param {string} id The unique identifier for the reported post.
     * @returns {ReportedPost} A new ReportedPost instance with the specified id.
     */
    public static create(id: string): ReportedPost {
        const post = new ReportedPost()
        post.id = new values.ReportedPostId(id);
        return post;
    }

    /**
     * Reports a post for a given reason by a user. This method constructs a `PostReported`
     * event and triggers further actions based on this report.
     *
     * @public
     * @param {string} flagId The unique identifier for the flag.
     * @param {string} userId The identifier of the user reporting the post.
     * @param {string} reason The reason for the report.
     * @param {?string} [timestamp] Optional timestamp of the report; uses current time if not provided.
     */
    public flag(
        flagId: string, 
        userId: string, 
        reason: string, 
        timestamp?: string
    ): void {
        timestamp = timestamp || new Date().toISOString();

        const postId = this.getId();
        
        this.addEvent(new PostReported(
            flagId, 
            postId, 
            userId,
            reason,
            timestamp
        ));
    }

    /**
     * Applies the PostReported event to this entity, adding a new content flag to the flags collection.
     * If the report threshold is reached and the post is not already marked for moderation, it triggers
     * the ReportThresholdReached event.
     *
     * @public
     * @param {PostReported} event The PostReported event to apply.
     */
    public applyPostReportedEvent(event: PostReported): void {
        if(!this.id) {
            this.id = new values.ReportedPostId(event.postId);
        }

        this.flags.push(new ContentFlag(
            event.flagId, 
            this.id, 
            event.userId, 
            event.reason, 
            event.reportedAt
        ));

        if(this.thresholdReached() && !this.markedForModeration) {
            this.addEvent(new ReportThresholdReached(this.getId()));
        }
    }

    /**
     * Handles the ReportThresholdReached event by marking the post for moderation.
     *
     * @public
     * @param {ReportThresholdReached} event The ReportThresholdReached event to handle.
     */
    public applyReportThresholdReached(event: ReportThresholdReached): void {
        this.markedForModeration = true;
    }

    /**
     * Checks if the number of reports has reached the minimum report threshold, indicating
     * the post requires further action or moderation.
     *
     * @returns {boolean} True if the report threshold is reached; false otherwise.
     */
    public thresholdReached(): boolean {
        return this.flags.length >= ReportedPost.MIN_REPORT_THRESHOLD;
    }

    /**
     * Retrieves the unique identifier of the reported post.
     *
     * @returns {string} The unique identifier of the reported post.
     */
    public getId(): string {
        return this.id!.id;
    }

    /**
     * Provides access to the collection of content flags associated with the post,
     * allowing for analysis or processing of the reports.
     *
     * @returns {ContentFlag[]} An array of ContentFlag instances associated with the post.
     */
    public getReports(): ContentFlag[] {
        return this.flags;
    }
}
