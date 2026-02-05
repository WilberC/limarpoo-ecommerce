import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { OrderService } from '../../../../core/services/order.service';
import { CustomerProfileService } from '../../../../core/services/customer-profile.service';
import { AddressService } from '../../../../core/services/address.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Customer } from '../../../../core/models/customer.model';
import { Order } from '../../../../core/models/order.model';
import { CustomerProfile } from '../../../../core/models/customer-profile.model';
import { Address } from '../../../../core/models/address.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.scss',
})
export class CustomerProfileComponent implements OnInit {
  customer: Customer | undefined;
  profile: CustomerProfile | undefined;
  addresses: Address[] = [];
  orders: Order[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private customerProfileService: CustomerProfileService,
    private addressService: AddressService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomerData(id);
    }
  }

  loadCustomerData(id: string): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      user: this.userService.getUserById(id),
      orders: this.orderService.getOrdersByUserId(id),
      profile: this.customerProfileService.getProfileByUserId(id),
      addresses: this.addressService.getUserAddresses(id),
    }).subscribe({
      next: ({ user, orders, profile, addresses }) => {
        this.customer = {
          ...user,
          name: user.email,
          phone: profile?.phone || 'N/A',
          totalOrders: orders.length,
          joinDate: new Date(),
        };
        this.profile = profile;
        this.orders = orders;
        this.addresses = addresses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load customer profile';
        this.loading = false;
      },
    });
  }
}
