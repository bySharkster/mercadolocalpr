import Command from "../../../shared/application/Command";

/**
 * Defines a command for reporting a post, encapsulating the user ID of the reporter,
 * the ID of the post being reported, and the reason for the report.
 * 
 * @class ReportPostCommand
 * @typedef {ReportPostCommand}
 * @extends {Command}
 */
export default class ReportPostCommand extends Command {
    /**
     * Creates an instance of ReportPostCommand, initializing it with the necessary information
     * for reporting a post.
     *
     * @constructor
     * @param {string} userId The ID of the user reporting the post.
     * @param {string} postId The ID of the post being reported.
     * @param {string} flagId The ID of the content flag.
     * @param {string} reason The reason provided by the user for reporting the post.
     */
    constructor(
        public readonly userId: string,
        public readonly postId: string,
        public readonly flagId: string,
        public readonly reason: string,
    ) {
        super();
    }
}
