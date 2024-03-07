export default {
    // Administration Configuration
    marketplace: {
        db: {
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
            supabaseKey: process.env.NEXT_SUPABASE_KEY!,
        },
        moderation: {
            replaceWith: "*"
        }
    }
}