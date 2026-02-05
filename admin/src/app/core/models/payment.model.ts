export interface Payment {
  id: string;
  order_id: string;
  provider: 'STRIPE' | 'PAYPAL';
  transaction_id: string;
  status: string;
  amount: number;
  created_at: Date;
}
