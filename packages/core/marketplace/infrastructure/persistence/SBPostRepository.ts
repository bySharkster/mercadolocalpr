import PostRepository from "../../domain/Repositories/PostRepository";
import Post from "../../domain/Entities/Post/Post";
import * as events from "../../domain/Events";
import DomainEvent from "../../../shared/domain/DomainEvent";
import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";

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

        let { data } = await supabase.from('posts_events')
                                     .select("*")
                                     .eq("post_id", id);
        
        let domainEvents: DomainEvent[] = [];

        data = data ? data : [];

        // TODO: Create an event factory to encapsulate event creation logic.
        for (const row of data) {
            if (row.event_type === events.PostCreatedEvent.name) {
                domainEvents.push(events.PostCreatedEvent.fromJson(row));
            } else if (row.event_type === events.PostDeletedEvent.name) {
                domainEvents.push(events.PostDeletedEvent.fromJson(row));
            } else if(row.event_type === events.PostClosedEvent.name) {
                domainEvents.push(events.PostClosedEvent.fromJson(row))
            } else if(row.event_type === events.PostModeratedEvent.name) {
                domainEvents.push(events.PostModeratedEvent.fromJson(row))
            } else if(row.event_type === events.CommentAddedToPostEvent.name) {
                domainEvents.push(events.CommentAddedToPostEvent.fromJson(row))
            } else if(row.event_type === events.PriceReducedEvent.name) {
                domainEvents.push(events.PriceReducedEvent.fromJson(row))
            } else {
                throw new Error(`Unhandled event '${row.event_type}'`)
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

        const insertions = [];

        for(const e of post.getEvents()) {
            const payload = {
                post_id: post.getId(),
                post_type: post.constructor.name,
                event_type: e.constructor.name,
                timestamp: e.timestamp,
                data: e.toJson()
            };

            insertions.push(supabase.from('posts_events').insert(payload));
        }

        await Promise.all(insertions);
    }
}
