export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment?: string;
  created_at: Date;
  user?: {
    id: string;
    email: string;
  };
  product?: {
    id: string;
    name: string;
  };
}
