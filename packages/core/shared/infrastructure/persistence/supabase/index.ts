import { createClient } from "@supabase/supabase-js";

/**
 * Wrapper class for interacting with the Supabase client.
 * It provides a convenient way to create and configure a Supabase client instance.
 */
export class SupabaseClient {
    /**
     * Creates an instance of the SupabaseClient class.
     * @param {string} supabaseUrl - The URL of the Supabase project.
     * @param {string} supabaseKey - The API key for accessing the Supabase project.
     */
    constructor(private readonly supabaseUrl: string, private readonly supabaseKey: string) {}

    /**
     * Gets a Supabase client instance configured with the specified schema.
     * @param {string} schema - The name of the database schema to use.
     * @returns {SupabaseJSClient} - The configured Supabase client instance.
     */
    protected getClient(schema: string) {
        return createClient(this.supabaseUrl, this.supabaseKey, {
            db: {
                schema: schema,
            },
        });
    }
}
