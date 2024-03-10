import CategoryRepository from "../../domain/Repositories/CategoryRepository";
import Category from "../../domain/Entities/Category/Category";
import { SupabaseClient } from "../../../shared/infrastructure/persistence/supabase";

/**
 * A Supabase-backed implementation of the CategoryRepository interface, 
 * extending the SupabaseClient class for database interactions. 
 * It provides methods to interact with category data stored in a Supabase database.
 */
export default class SBCategoryRepository extends SupabaseClient implements CategoryRepository {
    
    /**
     * Retrieves a Category entity by its unique identifier.
     *
     * @public
     * @param {string} id - The unique identifier of the category to be retrieved.
     * @returns {Promise<Category|null>} A promise that resolves with the Category entity if found, otherwise null.
     */
    public async get(id: string): Promise<Category|null> {
        const supabase = this.getClient('marketplace');

        const { data } = await supabase.from("categories")
                                       .select("*")
                                       .eq('uuid', id)
                                       .single();

        let category: Category|null = null;

        if(data) 
            category = new Category(data.uuid, data.name)
        
        return category;
    }

    /**
     * Saves a Category entity and its associated details to the Supabase database.
     * This method inserts a new category record into the database.
     *
     * @param {Category} category - The Category entity to be saved.
     * @returns {Promise<void>} A promise that resolves once the save operation is complete, with no return value.
     */
    public async save(category: Category): Promise<void> {
        const supabase = this.getClient('marketplace');

        await supabase.from('categories').insert({
            uuid: category.getId(),
            name: category.getName()
        });
    }
}
