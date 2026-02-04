import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MockDataService, Order } from '../../../../core/services/mock-data.service';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderListComponent implements OnInit {
  orders$!: Observable<Order[]>;

  constructor(private mockService: MockDataService) {}

  ngOnInit(): void {
    this.orders$ = this.mockService.getOrders();
  }
}
