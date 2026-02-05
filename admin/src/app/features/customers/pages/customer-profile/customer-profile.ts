import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { OrderService } from '../../../../core/services/order.service';
import { Customer } from '../../../../core/models/customer.model';
import { Order } from '../../../../core/models/order.model';
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
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      forkJoin({
        user: this.userService.getUserById(id),
        orders: this.orderService.getOrdersByUserId(id),
      }).subscribe({
        next: ({ user, orders }) => {
          this.customer = {
            ...user,
            name: `${user.firstName} ${user.lastName}`,
            phone: 'N/A',
            totalOrders: orders.length,
            joinDate: new Date(),
          };
          this.orders = orders;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
