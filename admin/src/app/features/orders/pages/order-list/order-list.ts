import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm = '';
  loading = false;
  error: string | null = null;

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    this.orderService
      .getOrders()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (orders) => {
          this.orders = orders;
          this.filteredOrders = orders;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading orders:', err);
          this.error = 'Failed to load orders';
          this.cdr.detectChanges();
        },
      });
  }

  filterOrders(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter((order) => {
        const orderId = order.id.toLowerCase();
        const customerEmail = (order.user?.email || '').toLowerCase();

        return orderId.includes(term) || customerEmail.includes(term);
      });
    }

    this.cdr.detectChanges();
  }
}
