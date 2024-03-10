import PostReadModelStore from "../../domain/PostReadModelStore";
import PostModel from "../../domain/Models/PostModel";
import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";

/**
 * Supabase-backed implementation of the PostReadModelStore interface.
 * Extends the SupabaseClient class for database interaction.
 */
export default class SBPostReadModel extends SupabaseClient implements PostReadModelStore {
    /**
     * The database schema for the Supabase tables.
     * @private
     * @static
     * @type {string}
     */
    private static DB_SCHEMA: string = 'marketplace';
    
    /**
     * Adds a PostModel to the Supabase database.
     * @param {PostModel} post - The PostModel instance to be added.
     * @returns {Promise<void>} - A promise that resolves once the add operation is complete.
     */
    public async add(post: PostModel): Promise<void> {
        const supabase = this.getClient(SBPostReadModel.DB_SCHEMA);

        await supabase.from('posts_projection').insert({
            uuid: post.id,
            created_at: post.createdAt,
            title: post.title,
            description: post.description,
            category_id: post.categoryId,
            price: post.price,
            location_id: post.locationId,
            user_id: post.sellerId,
            photo_url: post.photoUrl,
            is_moderated: post.isModerated,
        });
    }

    /**
     * Deletes a PostModel from the Supabase database based on its unique identifier.
     * @param {string} postId - The unique identifier of the PostModel to be deleted.
     * @returns {Promise<void>} - A promise that resolves once the delete operation is complete.
     */
    public async delete(postId: string): Promise<void> {
        const supabase = this.getClient(SBPostReadModel.DB_SCHEMA);

        await supabase.from('posts_projection')
                      .delete()
                      .eq('uuid', postId);
    }

    /**
     * Retrieves a PostModel from the Supabase database based on its unique identifier.
     * @public
     * @param {string} postId - The unique identifier of the PostModel to be retrieved.
     * @returns {Promise<PostModel|null>} - A promise that resolves to the retrieved PostModel or null if not found.
     */
    public async get(postId: string): Promise<PostModel|null> {
        const supabase = this.getClient(SBPostReadModel.DB_SCHEMA);

        const { data } = await supabase.from('posts_projection').select('*').eq('uuid', postId).single();
                
        let model: PostModel|null = null;

        if(data) {
            model = new PostModel(
                data.uuid,
                data.title,
                data.description,
                data.price,
                data.location_id,
                data.user_id,
                data.category_id,
                data.photoUrl,
                data.is_moderated,
                data.created_at,
            );
        }

        return model;
    }

    /**
     * Updates a PostModel in the Supabase database.
     * @public
     * @param {PostModel} post - The PostModel instance to be updated.
     * @returns {Promise<void>} - A promise that resolves once the update operation is complete.
     */
    public async update(post: PostModel): Promise<void> {
        const supabase = this.getClient(SBPostReadModel.DB_SCHEMA);

        const data = {
            uuid: post.id,
            title: post.title,
            description: post.description,
            price: post.price,
            location_id: post.locationId,
            user_id: post.sellerId,
            category_id: post.categoryId,
            photo_url: post.photoUrl,
            is_moderated: post.isModerated,
            created_at: post.createdAt,
        };

        await supabase.from('posts_projection')
                      .update(data)
                      .eq('uuid', post.id);
    }
}