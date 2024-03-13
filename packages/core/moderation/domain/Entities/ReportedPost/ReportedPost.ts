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
     * The unique identifier for the content flag.
     *
     * @private
     * @type {ContentFlagId}
     */
    private id: values.ContentFlagId;

    /**
     * The identifier of the reported post associated with this content flag.
     *
     * @private
     * @type {ReportedPostId}
     */
    private postId: values.ReportedPostId;

    /**
     * The identifier of the user who created the content flag.
     *
     * @private
     * @type {UserId}
     */
    private userId: values.UserId;

    /**
     * The reason provided for the content flag.
     *
     * @private
     * @type {ContentFlagReason}
     */
    private reason: values.ContentFlagReason;

    /**
     * The timestamp marking when the content flag was created.
     *
     * @private
     * @type {ContentFlagTimestamp}
     */
    private timestamp: values.ContentFlagTimestamp;

    /**
     * Creates an instance of ContentFlag, initializing it with the provided
     * ID, user ID, reason for the flag, and timestamp.
     *
     * @constructor
     * @param {string} id The unique identifier for the content flag.
     * @param {ReportedPostId} postId The identifier of the reported post.
     * @param {string} userId The identifier of the user who reported the post.
     * @param {string} reason The reason the post was reported.
     * @param {string} timestamp The timestamp when the flag was created.
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
     * The unique identifier for the reported post.
     *
     * @private
     * @type {ReportedPostId}
     */
    private id: values.ReportedPostId;

    /**
     * A collection of ContentFlag objects representing the reports or flags made
     * against this post.
     *
     * @private
     * @type {ContentFlag[]}
     */
    private flags: ContentFlag[];

    /**
     * Creates an instance of ReportedPost, initializing it with a unique ID and
     * an empty collection of content flags.
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
     * Flags a post with a specified reason by a given user, creating a new ContentFlag
     * instance and adding it to the collection of flags. Additionally, this method
     * triggers a domain event to indicate that a post has been reported.
     *
     * @public
     * @param {string} flagId The unique identifier for the content flag.
     * @param {string} userId The identifier of the user who is reporting the post.
     * @param {string} reason The reason provided for reporting the post.
     */
    public flag(flagId: string, userId: string, reason: string): void {
        const flag = new ContentFlag(flagId, this.id, userId, reason, new Date().toISOString());
        this.flags.push(flag);
        this.addEvent(new PostReported(flag));
    }
}