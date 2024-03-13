import DomainEvent from "../../shared/domain/DomainEvent";
import { ContentFlag } from "./Entities/ReportedPost/ReportedPost";

/**
 * Represents an event that is triggered when a post is reported. This class extends
 * DomainEvent, providing specific data and behavior related to the reporting of a post,
 * including the content flag associated with the report. It facilitates the propagation
 * of information about the reported post across the system.
 *
 * @class PostReported
 * @typedef {PostReported}
 * @extends {DomainEvent}
 */
export default class PostReported extends DomainEvent {
    /**
     * The content flag associated with the reported post. This flag indicates the nature
     * of the report, such as inappropriate content, spam, etc.
     *
     * @private
     * @type {ContentFlag}
     */
    private flag: ContentFlag;

    /**
     * Creates an instance of PostReported, initializing it with a content flag that
     * indicates the reason for the report.
     *
     * @constructor
     * @param {ContentFlag} flag The content flag associated with the report.
     */
    constructor(flag: ContentFlag) {
        super();
        this.flag = flag;
    }
    
    /**
     * Serializes the event data to a JSON string. This can be useful for logging,
     * messaging, or storing the event data in a format that is easily transferrable
     * and interpretable.
     *
     * @public
     * @returns {string} A JSON string representing the event data.
     */
    public toJson(): string {
        // TODO: Fill in information when this data is needed somewhere in the system.
        return JSON.stringify({});
    }
}
