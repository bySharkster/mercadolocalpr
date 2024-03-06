import PostRepository from "../../domain/PostRepository";
import Post from "../../domain/Entities/Post";
import DomainEvent from "@/core/shared/domain/DomainEvent";
import { SupabaseClient } from "@/core/shared/infrastructure/persistence/supabase";
import * as events from "../../domain/Events";

/**
 * Supabase-backed implementation of the PostRepository interface.
 * Extends the SupabaseClient class for database interaction.
 */
export default class SBPostRepository extends SupabaseClient implements PostRepository {

    /**
     * Loads events associated with a specific Post based on its unique identifier.
     * @param {string} id - The unique identifier of the Post.
     * @returns {Promise<DomainEvent[]>} - A promise that resolves to an array of DomainEvent instances.
     */
    public async loadEvents(id: string): Promise<DomainEvent[]> {
        const supabase = this.getClient("marketplace");

        let { data } = await supabase.from('post_events')
                                     .select("postId, eventType, timestamp, data")
                                     .eq("postId", id);
        
        let domainEvents: DomainEvent[] = [];

        data = data ? data : [];

        for (const row of data) {
            if (row.eventType === events.PostCreatedEvent.name) {
                domainEvents.push(events.PostCreatedEvent.fromJson(row));
            } else if (row.eventType === events.PostDeletedEvent.name) {
                domainEvents.push(events.PostDeletedEvent.fromJson(row));
            }
        }

        return Promise.resolve(domainEvents);
    }

    /**
     * Saves a Post entity and its associated events to the Supabase database.
     * @param {Post} post - The Post entity to be saved.
     * @returns {Promise<void>} - A promise that resolves once the save operation is complete.
     */
    public async save(post: Post): Promise<void> {
        const supabase = this.getClient('marketplace');

        for(const e of post.getEvents()) {
            const payload = {
                postId: post.getId(),
                postType: post.constructor.name,
                eventType: e.constructor.name,
                timestamp: e.timestamp,
                data: e.toJson()
            };

            await supabase.from('post_events').insert(payload);
        }
    }
}
