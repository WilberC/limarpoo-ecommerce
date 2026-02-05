import { OrderItem } from './order-item.model';
import { Address } from './address.model';
import { Payment } from './payment.model';

export interface Order {
  id: string;
  user_id: string;
  shipping_address_id: string;
  total_amount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  created_at?: Date;
  updated_at?: Date;
  items?: OrderItem[];
  shipping_address?: Address;
  payment?: Payment;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}
