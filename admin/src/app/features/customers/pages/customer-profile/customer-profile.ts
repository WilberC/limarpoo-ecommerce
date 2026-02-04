import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockDataService, Customer, Order } from '../../../../core/services/mock-data.service';
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
  orders: Order[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private mockService: MockDataService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      forkJoin({
        customers: this.mockService.getCustomers(),
        orders: this.mockService.getOrders(),
      }).subscribe(({ customers, orders }) => {
        this.customer = customers.find((c) => c.id === +id);
        if (this.customer) {
          // Filter orders by name roughly matching for mock data
          this.orders = orders.filter((o) => o.customerName === this.customer?.name);
        }
        this.loading = false;
      });
    }
  }
}
