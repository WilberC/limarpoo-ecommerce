import { Component, OnInit, NgZone } from '@angular/core';
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
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    public route: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private customerProfileService: CustomerProfileService,
    private addressService: AddressService,
    private toastService: ToastService,
    private ngZone: NgZone,
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

    console.log('Loading customer data for ID:', id);

    forkJoin({
      user: this.userService.getUserById(id).pipe(
        catchError((err) => {
          console.error('Failed to load user:', err);
          throw err; // User is required, so we throw
        }),
      ),
      orders: this.orderService.getOrdersByUserId(id).pipe(
        catchError((err) => {
          console.error('Failed to load orders:', err);
          return of([]); // Orders are optional, return empty array
        }),
      ),
      profile: this.customerProfileService.getProfileByUserId(id).pipe(
        catchError((err) => {
          console.warn('Failed to load profile (this might be expected):', err);
          return of(null); // Profile is optional, return null
        }),
      ),
      addresses: this.addressService.getUserAddresses(id).pipe(
        catchError((err) => {
          console.warn('Failed to load addresses:', err);
          return of([]); // Addresses are optional, return empty array
        }),
      ),
    }).subscribe({
      next: ({ user, orders, profile, addresses }) => {
        console.log('Data loaded successfully:', { user, orders, profile, addresses });
        this.ngZone.run(() => {
          this.customer = {
            ...user,
            name: user.email,
            phone: profile?.phone || 'N/A',
            totalOrders: orders.length,
            joinDate: new Date(),
          };
          this.profile = profile || undefined;
          this.orders = orders;
          this.addresses = addresses;
          this.loading = false;
          console.log('Loading complete, loading flag set to false');
        });
      },
      error: (err) => {
        console.error('Critical error loading customer data:', err);
        this.ngZone.run(() => {
          this.error = 'Failed to load customer profile';
          this.loading = false;
          this.toastService.error('Failed to load customer profile');
        });
      },
    });
  }
}
