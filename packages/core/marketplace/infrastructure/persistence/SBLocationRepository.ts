import LocationRepository from "../../domain/Repositories/LocationRepository";
import Location from "../../domain/Entities/Location/Location";
import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";

/**
 * A Supabase-backed implementation of the LocationRepository interface, 
 * extending the SupabaseClient class for database interactions. 
 * It provides methods to interact with location data stored in a Supabase database.
 */
export default class SBLocationRepository extends SupabaseClient implements LocationRepository {
    
    /**
     * Retrieves a Location entity by its unique identifier.
     *
     * @public
     * @param {string} id - The unique identifier of the location to be retrieved.
     * @returns {Promise<Location|null>} A promise that resolves with the Location entity if found, otherwise null.
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
     * Saves a Location entity and its associated details to the Supabase database.
     * This method inserts a new location record into the database.
     *
     * @param {Location} location - The Location entity to be saved.
     * @returns {Promise<void>} A promise that resolves once the save operation is complete, with no return value.
     */
    public async save(location: Location): Promise<void> {
        const supabase = this.getClient('marketplace');

        await supabase.from('locations').insert({
            uuid: location.getId(),
            name: location.getName()
        });
    }
}
