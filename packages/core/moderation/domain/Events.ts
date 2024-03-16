import DomainEvent from "../../shared/domain/DomainEvent";

/**
 * Represents the event when a post is reported by a user. This event contains information about the report, such as the identification of the flag, post, user, the reason for reporting, and the timestamp of the report.
 *
 * @class PostReported
 * @extends {DomainEvent}
 */
export class PostReported extends DomainEvent {

    /**
     * Creates an instance of PostReported.
     *
     * @constructor
     * @param {string} flagId The unique identifier for the report flag.
     * @param {string} postId The unique identifier of the reported post.
     * @param {string} userId The unique identifier of the user who reported the post.
     * @param {string} reason The reason why the post was reported.
     * @param {string} reportedAt The timestamp when the report was made.
     */
    constructor(
        public readonly flagId: string, 
        public readonly postId: string, 
        public readonly userId: string, 
        public readonly reason: string, 
        public readonly reportedAt: string
    ) {
        super();
    }
    
    /**
     * Converts the PostReported event details into a JSON string.
     *
     * @public
     * @returns {string} A stringified JSON containing the details of the PostReported event.
     */
    public toJson(): string {
        return JSON.stringify({
            flagId: this.flagId,
            postId: this.postId,
            userId: this.userId,
            reason: this.reason,
            reportedAt: this.reportedAt,
        });
    }

    /**
     * Creates an instance of PostReported from a JSON string.
     *
     * @public
     * @static
     * @param {*} data The JSON data to create an instance from.
     * @returns {PostReported} An instance of PostReported.
     */
    public static fromJson(data: any): PostReported {
        return new PostReported(
            data.flagId,
            data.postId,
            data.userId,
            data.reason,
            data.reportedAt,
        )
    }
}


/**
 * Represents the event when a post reaches a threshold of reports, indicating a significant concern about the content of the post.
 *
 * @class ReportThresholdReached
 * @extends {DomainEvent}
 */
export class ReportThresholdReached extends DomainEvent {

    /**
     * Creates an instance of ReportThresholdReached.
     *
     * @constructor
     * @param {string} postId The unique identifier of the post that has reached the report threshold.
     */
    constructor(public readonly postId: string) {
        super();
    }
    
    /**
     * Converts the ReportThresholdReached event details into a JSON string.
     *
     * @public
     * @returns {string} A stringified JSON containing the details of the ReportThresholdReached event.
     */
    public toJson(): string {
        return JSON.stringify({
            postId: this.postId,
        });
    }

    /**
     * Creates an instance of ReportThresholdReached from a JSON string.
     *
     * @public
     * @static
     * @param {*} data The JSON data to create an instance from.
     * @returns {ReportThresholdReached} An instance of ReportThresholdReached.
     */
    public static fromJson(data: any): ReportThresholdReached {
        return new ReportThresholdReached(
            data.postId
        )
    }

}
