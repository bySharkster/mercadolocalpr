import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";
import ReportedPost from "../../domain/Entities/ReportedPost/ReportedPost";
import ReportedPostsRepository from "../../domain/Repositories/ReportedPostsRepository";

/**
 * A repository for managing reported posts, extending the functionality of SupabaseClient
 * and implementing the ReportedPostsRepository interface for domain-specific operations.
 * This class provides concrete methods to retrieve and store reported posts in the database.
 *
 * @class SBReportedPostsRepository
 * @extends {SupabaseClient}
 * @implements {ReportedPostsRepository}
 */
export default class SBReportedPostsRepository extends SupabaseClient implements ReportedPostsRepository {
    /**
     * Retrieves a reported post by its ID. If found, it constructs a ReportedPost domain object
     * populated with the report details. If no data is found, it returns null.
     *
     * @public
     * @param {string} id - The unique identifier of the post to retrieve.
     * @returns {Promise<ReportedPost | null>} A promise that resolves to a ReportedPost object or null if not found.
     */
    public async get(id: string): Promise<ReportedPost | null> {
        const supabase = this.getClient('moderation');

        let { data } = await supabase.from("reports")
                                       .select("*")
                                       .eq('post_id', id)
        
        if(!data) return null;

        let post = new ReportedPost(id)

        for(const report of data) {
            post.flag(
                report.uuid,
                report.user_id,
                report.reason,
                report.created_at
            )
        }
            
        return post;
    }
    
    /**
     * Saves a reported post to the database. It iterates through each report associated with
     * the post and performs an insert operation for each report. This method handles batch
     * insertions asynchronously and waits for all insert operations to complete.
     *
     * @public
     * @param {ReportedPost} post - The reported post to save, containing one or more reports.
     * @returns {Promise<void>} A promise that resolves when all insert operations are completed.
     */
    public async save(post: ReportedPost): Promise<void> {
        const supabase = this.getClient('moderation');
        
        let inserts = [];

        for(const report of post.getReports()) {
            inserts.push(supabase.from('reports').upsert({
                post_id: post.getId(),
                uuid: report.getId(),
                user_id: report.getUserId(),
                reason: report.getReason(),
                created_at: report.getTimeStamp()
            }));
        }

        await Promise.all(inserts);
    }
}