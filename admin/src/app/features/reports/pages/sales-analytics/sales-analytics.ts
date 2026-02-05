import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../core/services/order.service';
import { UserService } from '../../../../core/services/user.service';
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

  constructor(
    private orderService: OrderService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    forkJoin({
      orders: this.orderService.getOrders(),
      users: this.userService.getUsers(),
    }).subscribe({
      next: ({ orders, users }) => {
        this.totalOrders = orders.length;
        this.totalCustomers = users.length;
        // Order total_amount is likely number.
        this.totalRevenue = orders.reduce((acc, order) => acc + Number(order.total_amount), 0);
        this.averageOrderValue = this.totalOrders > 0 ? this.totalRevenue / this.totalOrders : 0;
      },
      error: (err) => console.error('Error loading analytics', err),
    });
  }
}
