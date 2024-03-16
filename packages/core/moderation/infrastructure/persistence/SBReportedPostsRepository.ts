import DomainEvent from "../../../shared/domain/DomainEvent";
import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";
import ReportedPost from "../../domain/Entities/ReportedPost/ReportedPost";
import ReportedPostsRepository from "../../domain/Repositories/ReportedPostsRepository";
import * as events from "../../domain/Events";

/**
 * A repository class for managing reported posts. It extends SupabaseClient to leverage its database connection functionalities and implements the ReportedPostsRepository interface to provide concrete methods for retrieving and storing reported posts in the database. This class encapsulates the domain-specific operations required for managing reported post events, offering methods to load events associated with a specific post and to save new reported posts into the database.
 *
 * @class SBReportedPostsRepository
 * @extends {SupabaseClient}
 * @implements {ReportedPostsRepository}
 */
export default class SBReportedPostsRepository extends SupabaseClient implements ReportedPostsRepository {
    /**
     * Loads all events related to a specific reported post from the database. It queries the 'reported_posts_events' table for all events matching the given post ID, constructs the appropriate DomainEvent instances based on the event type, and returns an array of these instances.
     *
     * @public
     * @param {string} id The unique identifier of the reported post for which events are to be loaded.
     * @returns {Promise<DomainEvent[]>} A promise that resolves with an array of DomainEvent instances corresponding to the events associated with the reported post.
     */
    public async loadEvents(id: string): Promise<DomainEvent[]> {
        const supabase = this.getClient('moderation');

        const { data } = await supabase.from('reported_posts_events')
                                   .select('*')
                                   .eq('post_id', id)
        
        let domainEvents: DomainEvent[] = [];

        if(data) {
            for(const evt of data) {
                const type = evt.event_type;
                const event_data = JSON.parse(evt.data);

                if(type == events.PostReported.name) {
                    domainEvents.push(events.PostReported.fromJson(event_data))
                } else if(type == events.ReportThresholdReached.name) {
                    domainEvents.push(events.ReportThresholdReached.fromJson(event_data))
                } else {
                    throw new Error(`Unhandled event type ${type}`)
                }
            }
        }
        
        return domainEvents;
    }

    /**
     * Saves a reported post and its associated events into the database. This method serializes the reported post into a series of event records and inserts them into the 'reported_posts_events' table. It ensures all insert operations are performed asynchronously and waits for all of them to complete before resolving.
     *
     * @public
     * @param {ReportedPost} post The reported post entity to save, which contains details of the post and associated reports.
     * @returns {Promise<void>} A promise that resolves once all events associated with the reported post have been successfully inserted into the database.
     */
    public async save(post: ReportedPost): Promise<void> {
        const supabase = this.getClient('moderation');
        
        let inserts = [];

        for(const evt of post.getEvents()) {
            inserts.push(supabase.from('reported_posts_events').insert({
                event_type: evt.constructor.name,
                post_id: post.getId(),
                created_at: evt.timestamp,
                data: evt.toJson()
            }));
        }

        await Promise.all(inserts);
    }
}
