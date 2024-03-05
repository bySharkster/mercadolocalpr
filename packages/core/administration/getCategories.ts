import config from "../../bootstrap/config";
export default class getCategory {
    category_name: string;
    category_id: number;
    constructor(category_name: string, category_id: number) {
        this.category_name = category_name;
        this.category_id = category_id;
    }
    async getCat() {
        const supabase = config.getSupabase(); // Assuming `getSupabase()` is a method in the `config` module that returns the Supabase client instance
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('category_id', this.category_id)
            .single();

        if (error) {
            throw new Error('Failed to fetch category');
        }

        return data;
    
    }
}