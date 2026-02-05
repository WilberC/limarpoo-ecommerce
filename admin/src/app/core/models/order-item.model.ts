export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  product?: {
    id: string;
    name: string;
    sku: string;
    description?: string;
  };
}
