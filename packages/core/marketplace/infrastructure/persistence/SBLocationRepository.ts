import LocationRepository from "../../domain/Repositories/LocationRepository";
import Location from "../../domain/Entities/Location/Location";
import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";

/**
 * Supabase-backed implementation of the LocationRepository interface.
 * Extends the SupabaseClient class for database interaction.
 */
export default class SBLocationRepository extends SupabaseClient implements LocationRepository {
    
    /**
     * [placeholder]
     *
     * @public
     * @param {string} id
     * @returns {Promise<Location>}
     */
    public async get(id: string): Promise<Location|null> {
        const supabase = this.getClient('marketplace');

        const { data } = await supabase.from("locations")
                                       .select("*")
                                       .eq('uuid', id)
                                       .single();

        let location: Location|null = null;

        if(data) 
            location = new Location(data.uuid, data.name)
        
        return location;
    }


    /**
     * Saves a Location entity and its associated events to the Supabase database.
     * @param {Location} location - The Location entity to be saved.
     * @returns {Promise<void>} - A promise that resolves once the save operation is complete.
     */
    public async save(location: Location): Promise<void> {
        const supabase = this.getClient('marketplace');

        await supabase.from('locations').insert({
            uuid: location.getId(),
            name: location.getName()
        });
    }
}
