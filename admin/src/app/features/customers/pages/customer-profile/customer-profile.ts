import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public customer: Customer | undefined;
  public profile: CustomerProfile | undefined;
  public addresses: Address[] = [];
  public orders: Order[] = [];
  public loading = true;
  public error: string | null = null;

  constructor(
    public route: ActivatedRoute,
    private userService: UserService,
    private orderService: OrderService,
    private customerProfileService: CustomerProfileService,
    private addressService: AddressService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
  ) {
    console.log('CustomerProfileComponent constructor called');
  }

  ngOnInit(): void {
    console.log('CustomerProfileComponent ngOnInit called');
    console.log('Route snapshot:', this.route.snapshot);
    console.log('Route params:', this.route.snapshot.paramMap);

    const id = this.route.snapshot.paramMap.get('id');
    console.log('Customer ID from route:', id);

    if (id) {
      console.log('ID exists, calling loadCustomerData');
      this.loadCustomerData(id);
    } else {
      console.error('No customer ID found in route!');
      this.loading = false;
      this.error = 'No customer ID provided';
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
        this.cdr.detectChanges();
        console.log('Change detection triggered manually');
      },
      error: (err) => {
        console.error('Critical error loading customer data:', err);
        this.error = 'Failed to load customer profile';
        this.loading = false;
        this.toastService.error('Failed to load customer profile');
        this.cdr.detectChanges();
      },
    });
  }
}
