export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: string | number;
  stock_quantity: number;
  category_id: string;
  category?: { id: string; name: string; parent_id: string | null };
  created_at?: string;
  updated_at?: string;
}
