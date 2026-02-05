import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sales-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-analytics.html',
  styleUrl: './sales-analytics.scss',
})
export class SalesAnalyticsComponent implements OnInit {
  totalRevenue = 0;
  totalOrders = 0;
  totalCustomers = 0;
  averageOrderValue = 0;
  pendingOrders = 0;

  loading = false;
  error: string | null = null;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private toastService: ToastService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      orders: this.orderService.getOrders(),
      users: this.userService.getUsers(),
    }).subscribe({
      next: ({ orders, users }) => {
        this.ngZone.run(() => {
          this.totalOrders = orders.length;
          this.totalCustomers = users.length;
          this.totalRevenue = orders.reduce((acc, order) => acc + Number(order.total_amount), 0);
          this.averageOrderValue = this.totalOrders > 0 ? this.totalRevenue / this.totalOrders : 0;
          this.pendingOrders = orders.filter((o) => o.status === 'PENDING').length;
          this.loading = false;
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.error = 'Failed to load analytics';
          this.loading = false;
        });
      },
    });
  }
}
