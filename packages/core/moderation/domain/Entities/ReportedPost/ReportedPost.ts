import { AggregateRoot, Entity } from "../../../../shared/domain/Entity";
import PostReported from "../../Events";
import * as values from "./Values";


/**
 * Represents a flag or report made against a post's content, encapsulating the
 * details such as the identity of the reporter, the reason for the report, and
 * the timestamp of the report. It extends Entity to include domain-specific
 * behaviors and properties.
 *
 * @class ContentFlag
 * @typedef {ContentFlag}
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
     * @param {string} id - The unique identifier for the content flag.
     * @param {values.ReportedPostId} postId - The identifier of the reported post.
     * @param {string} userId - The identifier of the user who reported the post.
     * @param {string} reason - The reason the post was reported.
     * @param {string} timestamp - The timestamp when the flag was created.
     */
    constructor(
        id: string, 
        postId: values.ReportedPostId,
        userId: string, 
        reason: string, 
        timestamp: string
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
 * Represents a post that has been reported, extending AggregateRoot to include
 * domain-driven design concepts such as domain events. This class manages the
 * collection of content flags associated with the reported post.
 *
 * @class ReportedPost
 * @typedef {ReportedPost}
 * @extends {AggregateRoot}
 */
export default class ReportedPost extends AggregateRoot {
    /**
     * The unique identifier of the reported post, encapsulated within a value object
     * to ensure identity consistency and integrity throughout the domain.
     *
     * @private
     * @type {values.ReportedPostId}
     */
    private id: values.ReportedPostId;

    /**
     * A collection of ContentFlag instances, each representing a specific report
     * or flag made against this post's content. This collection manages the
     * aggregation of all reports associated with the post.
     *
     * @private
     * @type {ContentFlag[]}
     */
    private flags: ContentFlag[];

    /**
     * Initializes a new instance of ReportedPost with a unique identifier and sets up
     * an initially empty collection of content flags, preparing the entity for subsequent
     * report aggregation and domain event generation.
     *
     * @constructor
     * @param {string} id The unique identifier for the reported post.
     */
    constructor(id: string) {
        super();
        this.id = new values.ReportedPostId(id);
        this.flags = [];
    }

    /**
     * Adds a new report (content flag) to this post, instantiated with provided details
     * including the flag's unique identifier, reporting user's identifier, report reason,
     * and timestamp. This method encapsulates the creation of a ContentFlag, its addition
     * to the post's reports collection, and the triggering of a domain event to signify
     * the report action.
     *
     * @public
     * @param {string} flagId The unique identifier for the content flag.
     * @param {string} userId The identifier of the user reporting the post.
     * @param {string} reason The reason provided for reporting the post.
     * @param {string} [timestamp] The timestamp when the report was made, defaulting to current time if not provided.
     */
    public flag(flagId: string, userId: string, reason: string, timestamp?: string): void {
        const effectiveTimestamp = timestamp || new Date().toISOString();
        const flag = new ContentFlag(flagId, this.id, userId, reason, effectiveTimestamp);
        this.flags.push(flag);
        this.addEvent(new PostReported(flag));
    }

    /**
     * Retrieves the unique identifier of this reported post, ensuring external access
     * to the post's identity through its encapsulated value object.
     *
     * @public
     * @returns {string} The unique identifier of the reported post.
     */
    public getId(): string {
        return this.id.id;
    }

    /**
     * Provides access to the collection of content flags (reports) associated with this post,
     * allowing external processes to query the post's reports for further processing or analysis.
     *
     * @public
     * @returns {ContentFlag[]} An array of ContentFlag instances associated with the post.
     */
    public getReports(): ContentFlag[] {
        return this.flags;
    }
}