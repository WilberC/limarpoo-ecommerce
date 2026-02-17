export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "STAFF";
}

export interface CustomerProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  parent?: Category;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string | number;
  sku: string;
  stock_quantity: number;
  category_id: string;
  category?: Category;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user?: User;
}

export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  country: string;
  zip_code: string;
  is_default: boolean;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: string | number;
  product?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  shipping_address_id: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  total_amount: string | number;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  shipping_address?: Address;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
