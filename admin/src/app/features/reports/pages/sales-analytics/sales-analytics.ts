import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../../core/services/mock-data.service';
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

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    forkJoin({
      orders: this.mockService.getOrders(),
      customers: this.mockService.getCustomers(),
    }).subscribe(({ orders, customers }) => {
      this.totalOrders = orders.length;
      this.totalCustomers = customers.length;
      this.totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
      this.averageOrderValue = this.totalOrders > 0 ? this.totalRevenue / this.totalOrders : 0;
    });
  }
}
