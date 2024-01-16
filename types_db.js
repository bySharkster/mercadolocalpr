// Define the Database object structure
var Database = {
  public: {
    Tables: {
      customers: {
        Row: {},
        Insert: {},
        Update: {},
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey",
            columns: ["id"],
            referencedRelation: "users",
            referencedColumns: ["id"],
          },
        ],
      },
      prices: {
        Row: {},
        Insert: {},
        Update: {},
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey",
            columns: ["product_id"],
            referencedRelation: "products",
            referencedColumns: ["id"],
          },
        ],
      },
      products: {
        Row: {},
        Insert: {},
        Update: {},
        Relationships: [],
      },
      subscriptions: {
        Row: {},
        Insert: {},
        Update: {},
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey",
            columns: ["price_id"],
            referencedRelation: "prices",
            referencedColumns: ["id"],
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey",
            columns: ["user_id"],
            referencedRelation: "users",
            referencedColumns: ["id"],
          },
        ],
      },
      users: {
        Row: {},
        Insert: {},
        Update: {},
        Relationships: [
          {
            foreignKeyName: "users_id_fkey",
            columns: ["id"],
            referencedRelation: "users",
            referencedColumns: ["id"],
          },
        ],
      },
    },
    Views: {},
    Functions: {},
    Enums: {
      pricing_plan_interval: ["day", "week", "month", "year"],
      pricing_type: ["one_time", "recurring"],
      subscription_status: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
        "paused",
      ],
    },
    CompositeTypes: {},
  },
};

module.exports = Database;
