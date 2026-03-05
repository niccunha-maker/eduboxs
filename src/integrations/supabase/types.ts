export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          cpf: string | null;
          phone: string | null;
          email: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          cpf?: string | null;
          phone?: string | null;
          email: string;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          cpf?: string | null;
          phone?: string | null;
          email?: string;
          role?: string;
          updated_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string;
          cep: string;
          street: string;
          number: string;
          complement: string | null;
          neighborhood: string;
          city: string;
          state: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          label: string;
          cep: string;
          street: string;
          number: string;
          complement?: string | null;
          neighborhood: string;
          city: string;
          state: string;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          label?: string;
          cep?: string;
          street?: string;
          number?: string;
          complement?: string | null;
          neighborhood?: string;
          city?: string;
          state?: string;
          is_default?: boolean;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          sort_order?: number;
        };
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          school_name: string | null;
          grade: string | null;
          price_cents: number;
          compare_price_cents: number | null;
          stock: number;
          is_active: boolean;
          image_urls: string[];
          items_list: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          school_name?: string | null;
          grade?: string | null;
          price_cents: number;
          compare_price_cents?: number | null;
          stock?: number;
          is_active?: boolean;
          image_urls?: string[];
          items_list?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          school_name?: string | null;
          grade?: string | null;
          price_cents?: number;
          compare_price_cents?: number | null;
          stock?: number;
          is_active?: boolean;
          image_urls?: string[];
          items_list?: Json;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string;
          status: string;
          payment_method: string | null;
          payment_id: string | null;
          payment_status: string | null;
          subtotal_cents: number;
          shipping_cents: number;
          total_cents: number;
          shipping_address: Json;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id: string;
          status?: string;
          payment_method?: string | null;
          payment_id?: string | null;
          payment_status?: string | null;
          subtotal_cents: number;
          shipping_cents?: number;
          total_cents: number;
          shipping_address?: Json;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: string;
          payment_method?: string | null;
          payment_id?: string | null;
          payment_status?: string | null;
          shipping_cents?: number;
          total_cents?: number;
          shipping_address?: Json;
          notes?: string | null;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          unit_price_cents: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity?: number;
          unit_price_cents: number;
          created_at?: string;
        };
        Update: {
          quantity?: number;
        };
      };
      coupons: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: string;
          discount_value: number;
          min_order_cents: number;
          max_uses: number | null;
          used_count: number;
          is_active: boolean;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          description?: string | null;
          discount_type?: string;
          discount_value: number;
          min_order_cents?: number;
          max_uses?: number | null;
          is_active?: boolean;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          code?: string;
          description?: string | null;
          discount_type?: string;
          discount_value?: number;
          min_order_cents?: number;
          max_uses?: number | null;
          used_count?: number;
          is_active?: boolean;
          expires_at?: string | null;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity?: number;
          created_at?: string;
        };
        Update: {
          quantity?: number;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
