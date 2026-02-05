export interface Product {
  id: string; // Changed from number to string to match UUID
  name: string;
  description: string;
  sku: string;
  price: number;
  stock_quantity: number; // Mapped from stock (backend uses stock_quantity)
  category_id: string; // Mapped from category (backend uses category_id)
  // status: 'Active' | 'Inactive'; // Backend doesn't seem to have status yet, maybe derived?
}
