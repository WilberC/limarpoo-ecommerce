import { API_URL, AUTH_URL } from "./constants";
import type {
  Product,
  Category,
  Order,
  Review,
  Address,
  CustomerProfile,
  AuthResponse,
  RegisterResponse,
} from "@/types";

async function fetchAPI<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}

// Products
export const getProducts = () => fetchAPI<Product[]>(`${API_URL}/products`);
export const getProduct = (id: string) =>
  fetchAPI<Product>(`${API_URL}/products/${id}`);

// Categories
export const getCategories = () =>
  fetchAPI<Category[]>(`${API_URL}/categories`);
export const getCategory = (id: string) =>
  fetchAPI<Category>(`${API_URL}/categories/${id}`);

// Reviews
export const getProductReviews = (productId: string) =>
  fetchAPI<Review[]>(`${API_URL}/reviews/product/${productId}`);
export const createReview = (
  data: { product_id: string; rating: number; comment?: string },
  token: string
) =>
  fetchAPI<Review>(`${API_URL}/reviews`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

// Orders
export const getUserOrders = (userId: string, token: string) =>
  fetchAPI<Order[]>(`${API_URL}/orders/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getOrder = (id: string, token: string) =>
  fetchAPI<Order>(`${API_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createOrder = (
  data: {
    user_id: string;
    shipping_address_id: string;
    items: { product_id: string; quantity: number; price_at_purchase: number }[];
    total_amount: number;
  },
  token: string
) =>
  fetchAPI<Order>(`${API_URL}/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

// Addresses
export const getAddresses = (token: string) =>
  fetchAPI<Address[]>(`${API_URL}/addresses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createAddress = (
  data: Omit<Address, "id">,
  token: string
) =>
  fetchAPI<Address>(`${API_URL}/addresses`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
export const updateAddress = (
  id: string,
  data: Partial<Address>,
  token: string
) =>
  fetchAPI<Address>(`${API_URL}/addresses/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
export const deleteAddress = (id: string, token: string) =>
  fetchAPI<void>(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

// Customer Profile
export const getCustomerProfile = (userId: string, token: string) =>
  fetchAPI<CustomerProfile>(`${API_URL}/customer-profiles/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateCustomerProfile = (
  id: string,
  data: Partial<CustomerProfile>,
  token: string
) =>
  fetchAPI<CustomerProfile>(`${API_URL}/customer-profiles/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

// Auth
export const login = (email: string, password: string) =>
  fetchAPI<AuthResponse>(`${AUTH_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
export const register = (email: string, password: string) =>
  fetchAPI<RegisterResponse>(`${AUTH_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
