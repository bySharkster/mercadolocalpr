import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";
import PostCommentModel from "../../domain/Models/PostCommentModel";
import PostCommentsModelStore from "../../domain/PostCommentsModelStore";

/**
 * Provides storage capabilities for post comments within a Supabase database.
 * Extends the generic Supabase client to interact specifically with post comments data,
 * implementing the `PostCommentsModelStore` interface for defined operations.
 *
 * @class SBPostCommentsModelStore
 * @extends {SupabaseClient}
 * @implements {PostCommentsModelStore}
 */
export default class SBPostCommentsModelStore extends SupabaseClient implements PostCommentsModelStore {
    /**
     * The database schema name where the `post_comments_projection` table is located.
     * @private
     * @static
     * @type {string}
     */
    private static DB_SCHEMA: string = 'marketplace';

    /**
     * Initializes a new instance of the SBPostCommentsModelStore class with the given Supabase URL and key.
     * Utilizes these to create a Supabase client specific for accessing and manipulating post comments data.
     *
     * @constructor
     * @param {string} supabaseUrl - The Supabase service URL.
     * @param {string} supabaseKey - The Supabase service key for authentication.
     */
    constructor(supabaseUrl: string, supabaseKey: string) {
        super(supabaseUrl, supabaseKey);
    }

    /**
     * Asynchronously adds a new post comment to the `post_comments_projection` table within the Supabase database.
     * Maps the `PostCommentModel` object to the corresponding database fields and performs an upsert operation,
     * either inserting a new record or updating an existing one based on the primary key constraint.
     *
     * @public
     * @async
     * @param {PostCommentModel} postComment - The post comment model to be added to the database.
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    public async add(postComment: PostCommentModel): Promise<void> {
        const supabase = this.getClient(SBPostCommentsModelStore.DB_SCHEMA);

        await supabase.from('post_comments_projection').upsert({
            comment_id: postComment.commentId,
            post_id: postComment.postId,
            commentor_id: postComment.commentorId,
            is_seller: postComment.isSeller,
            comment: postComment.comment,
            created_at: postComment.createdAt,
        });
    }
}