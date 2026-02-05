import { User } from './user.model';

export interface Customer extends User {
  phone?: string;
  totalOrders?: number;
  joinDate?: Date;
  name?: string;
}
